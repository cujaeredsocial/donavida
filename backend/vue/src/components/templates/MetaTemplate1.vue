<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto" width="5000" min-height="330">
      <!--logo de donavida-->
      <v-img
        :src="require('../../assets/DonaVida-removebg.png')"
        class="my-3"
        contain
        height="60"
      />
      <v-card-text>
        <v-form>
          <!--Los campos ya guardados en la base datos-->
          <draggable v-model="camposArray" :options="dragOptions">
            <v-col
              v-for="(campo, index) in camposArray"
              :key="index"
              class="ms-2 mt-n9"
            >
              <v-row>
                <v-icon style="cursor: pointer" class="drag-handle">
                  mdi mdi-drag-horizontal-variant
                </v-icon>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="Titulo"
                    v-model="campo.title"
                    :disabled="!shows[index]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-combobox
                    :items="['String', 'Select']"
                    label="Tipo"
                    v-model="campo.type"
                    :disabled="!shows[index]"
                  ></v-combobox>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="Valor"
                    v-model="campo.value"
                    :disabled="!shows[index]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="Regex"
                    v-model="campo.regex"
                    :disabled="!shows[index]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="Mensaje de Error"
                    v-model="campo.mensaje"
                    :disabled="!shows[index]"
                  ></v-text-field>
                </v-col>
                <v-btn @click="toggleEditable(index)" class="ms-n2 mt-8" icon>
                  <v-icon color="green">
                    {{
                      shows[index] ? "mdi-check-circle" : "mdi-pencil-circle"
                    }}
                  </v-icon>
                </v-btn>
                <v-btn class="ms-n2 mt-8" icon>
                  <v-icon color="red" @click="eliminarCampo(index)">
                    mdi mdi-close-circle
                  </v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </draggable>
        </v-form>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-divider class="mt-auto"></v-divider>

      <v-card-actions>
        <v-btn color="green" @click="nuevoCampo" icon>
          <v-icon>mdi mdi-plus-circle</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red" text> Guardar Cambios </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
// eslint-disable-next-line no-undef
export default {
  name: "MetaTemplate1",
  components: {
    draggable,
  },
  data() {
    return {
      shows: [],
      camposArray: [],
      dragOptions: {
        handle: ".drag-handle",
        animation: 200,
        group: "description",
        disabled: false,
      },
    };
  },
  props: {
    rolActual: String,
  },
  methods: {
    nuevoCampo() {
      const campoNuevo = {
        title: "",
        type: "",
        value: "",
        regex: "",
        mensaje: "",
      };
      this.camposArray.push(campoNuevo);
      const index = this.camposArray.indexOf(campoNuevo);
      this.shows[index] = !this.shows[index];
    },
    eliminarCampo(index) {
      this.camposArray.splice(index, 1);
    },
    toggleEditable(index) {
      this.$set(this.shows, index, !this.shows[index]);
    },
  },
  created() {
    console.log(this.rolActual);
    this.$http
      .get(`http://127.0.0.1:27000/meta/plantilla/${this.rolActual}`)
      .then((response) => {
        console.log(response);
        this.camposArray = response.data.components;
        console.log(response.data.components);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
