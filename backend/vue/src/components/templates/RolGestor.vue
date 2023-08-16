<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto" width="900" min-height="330">
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
              <v-col cols="12" md="3">
                <v-text-field
                  label="Titulo"
                  v-model="camposArray[index].title"
                  :disabled="esCampoDesabilitado(index)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-combobox
                  :items="['String', 'Select']"
                  label="Tipo"
                  v-model="camposArray[index].type"
                  :disabled="esCampoDesabilitado(index)"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="Valor"
                  v-model="camposArray[index].value"
                  :disabled="esCampoDesabilitado(index)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Regex"
                  v-model="camposArray[index].regex"
                  :disabled="esCampoDesabilitado(index)"
                ></v-text-field>
              </v-col>
              <v-btn
                v-if="!isTituloValido(index)"
                @click="toggleModoEdicion(index)"
                class="mt-8"
                icon
              >
                <v-icon color="green">
                  {{
                    edit === index ? "mdi-check-circle" : "mdi-pencil-circle"
                  }}
                </v-icon>
              </v-btn>
              <v-btn v-if="!isTituloValido(index)" class="ms-n2 mt-8" icon>
                <v-icon color="red" @click="eliminarCampoViejo(index)">
                  mdi mdi-close-circle
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <!--Los campos nuevos que va a introducir el usuario-->
          <v-col
            v-for="(campo, n) in componentsNuevos"
            :key="n"
            class="ms-2 mt-n9"
          >
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Titulo"
                  v-model="campo.title"
                  :disabled="shows[n]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-combobox
                  :items="['String', 'Select']"
                  label="Tipo"
                  v-model="campo.type"
                  :disabled="shows[n]"
                ></v-combobox>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="Valor"
                  v-model="campo.value"
                  :disabled="shows[n]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Regex"
                  v-model="campo.regex"
                  :disabled="shows[n]"
                ></v-text-field>
              </v-col>
              <v-btn class="mt-8" icon @click="toggleEditable(n)">
                <v-icon color="green">
                  {{ shows[n] ? "mdi-pencil-circle" : "mdi-check-circle" }}
                </v-icon>
              </v-btn>
              <v-btn class="ms-n2 mt-8" icon>
                <v-icon color="red" @click="eliminarCampo(n)">
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
      edit: -1,
      shows: [],
      component: {
        title: "",
        type: "",
        value: "",
        regex: "",
      },
      componentsNuevos: [],
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
    isTituloValido(index) {
      return (
        this.camposArray[index].title.includes("Telefono") ||
        this.camposArray[index].title.includes("Carnet de Identidad") ||
        this.camposArray[index].title.includes("Nombre de Usuario")
      );
    },
    nuevoCampo() {
      const campoNuevo = {
        title: "",
        type: "",
        value: "",
        regex: "",
      };
      this.componentsNuevos.push(campoNuevo);
      this.component = {
        title: "",
        type: "",
        value: "",
        regex: "",
      };
    },
    eliminarCampo(index) {
      this.componentsNuevos.splice(index, 1);
    },
    eliminarCampoViejo(index) {
      this.camposArray.splice(index, 1);
    },
    toggleEditable(index) {
      this.$set(this.shows, index, !this.shows[index]);
    },
    toggleModoEdicion(index) {
      if (this.edit === index) {
        this.edit = -1;
      } else {
        this.edit = index;
      }
    },
    guardarModificados(index) {
      const campoModificado = this.camposArray[index];
      const campoExistente = this.componentsNuevos.find(
        (campo) => campo.title === campoModificado.title
      );
      const haSidoModificado = this.camposArray.some(
        (campo, i) =>
          i !== index &&
          campo.title === campoModificado.title &&
          (campo.type !== campoModificado.type ||
            campo.value !== campoModificado.value ||
            campo.regex !== campoModificado.regex)
      );
      if (!campoExistente && !haSidoModificado) {
        this.componentsNuevos.push(campoModificado);
      }
    },
    guardarCambios() {},
  },
  computed: {
    esCampoDesabilitado() {
      return (index) => {
        return this.edit !== index;
      };
    },
  },
};
</script>
