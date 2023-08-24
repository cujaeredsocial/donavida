<!-- eslint-disable no-unused-vars -->
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
        <v-btn color="red" text @click="guardarCambios">
          Guardar Cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import draggable from "vuedraggable";
// eslint-disable-next-line no-unused-vars
import FormulariosView from "@/views/FormulariosView.vue";
export default {
  name: "MetaTemplate",
  components: {
    draggable,
  },
  data() {
    return {
      rolActual: "",
      shows: [],
      /*component: {
        title: "",
        type: "",
        value: "",
        regex: "",
      },
      componentsNuevos: [],*/
      camposArray: [],
      dragOptions: {
        handle: ".drag-handle",
        animation: 200,
        group: "description",
        disabled: false,
      },
    };
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
    /*onDragEnd(event) {
      const draggedIndex = event.oldIndex;
      const newIndex = event.newIndex;
      if (this.shows[draggedIndex] === true) {
        this.shows[newIndex] = true;
        this.shows[draggedIndex] = false;
      }
      console.log(this.shows[draggedIndex]);
      console.log(this.shows[newIndex + 1]);
      //console.log();
      console.log(draggedIndex);
      console.log(newIndex);
    },*/
    // eslint-disable-next-line no-unused-vars
    obtenerDatos(ruta) {
      console.log(ruta);
      const URL = "http://127.0.0.1:27000/meta/plantilla/" + ruta;
      console.log(URL);
      fetch(`${URL}`)
        .then((response) => response.json())
        .then((meta) => {
          this.camposArray = meta.components;
          this.rolActual = ruta;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    guardarCambios() {
      console.log(this.rolActual);
      const URL = "http://127.0.0.1:27000/meta/update/gestor"; //+ this.rolActual;
      console.log(URL);
      fetch(`${URL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          components: [...this.camposArray],
        }),
      }).catch((error) => {
        console.error("Ha ocurrido un error:", error);
      });
    },
  },
};
</script>
