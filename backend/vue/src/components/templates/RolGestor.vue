<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto" min-width="1000" min-height="330">
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
          <v-col
            v-for="(campo, index) in camposArray"
            :key="index"
            class="ms-2 mt-n9"
          >
            <v-row>
              <v-icon style="cursor: move">
                mdi mdi-drag-horizontal-variant
              </v-icon>
              <v-col cols="12" md="3">
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
              <v-col cols="12" md="4">
                <v-text-field
                  label="Regex"
                  v-model="campo.regex"
                  :disabled="!shows[index]"
                ></v-text-field>
              </v-col>
              <v-btn @click="toggleEditable(index)" class="ms-n2 mt-8" icon>
                <v-icon color="green">
                  {{ shows[index] ? "mdi-check-circle" : "mdi-pencil-circle" }}
                </v-icon>
              </v-btn>
              <v-btn class="ms-n2 mt-8" icon>
                <v-icon color="red" @click="eliminarCampo(index)">
                  mdi mdi-close-circle
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-form>
        <v-spacer></v-spacer>
      </v-card-text>
      <v-divider class="mt-auto"></v-divider>

      <v-card-actions>
        <v-btn color="green" @click="nuevoCampo" icon>
          <v-icon>mdi mdi-plus-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      shows: [],
      /*component: {
        title: "",
        type: "",
        value: "",
        regex: "",
      },
      componentsNuevos: [],*/
      camposArray: [
        {
          title: "Nombre de Usuario",
          type: "String",
          value: "-",
          regex: "-",
        },
        {
          title: "Carnet de Identidad",
          type: "String",
          value: "-",
          regex: "-",
        },
        {
          title: "Telefono",
          type: "String",
          value: "-",
          regex: "-",
        },
        {
          title: "Hola",
          type: "String",
          value: "Estoy",
          regex: "Probando",
        },
      ],
    };
  },
  methods: {
    nuevoCampo() {
      const campoNuevo = {
        title: "",
        type: "",
        value: "",
        regex: "",
      };
      this.camposArray.push(campoNuevo);
      const index = this.camposArray.indexOf(campoNuevo);
      this.shows[index] = !this.shows[index];
      this.component = {
        title: "",
        type: "",
        value: "",
        regex: "",
      };
    },
    eliminarCampo(index) {
      this.camposArray.splice(index, 1);
    },
    toggleEditable(index) {
      this.$set(this.shows, index, !this.shows[index]);
    },
    guardarCambios() {},
  },
};
</script>
