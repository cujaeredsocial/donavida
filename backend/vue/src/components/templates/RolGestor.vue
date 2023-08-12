<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto" width="900" min-height="450">
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
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="Tipo"
                  v-model="camposArray[index].type"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="Valor"
                  v-model="camposArray[index].value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Regex"
                  v-model="camposArray[index].regex"
                ></v-text-field>
              </v-col>
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
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field label="Tipo" v-model="campo.type"></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="Valor"
                  v-model="campo.value"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Regex"
                  v-model="campo.regex"
                ></v-text-field>
              </v-col>
              <v-btn class="mt-8" icon>
                <v-icon color="green"> mdi mdi-check-circle </v-icon>
              </v-btn>
              <v-btn class="ms-n2 mt-8" icon>
                <v-icon
                  id="iconoEliminar"
                  class="circle-shadow"
                  color="red"
                  @click="eliminarCampo(n)"
                >
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
      n: 0,
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
      ],
    };
  },
  methods: {
    nuevoCampo() {
      this.componentsNuevos.push(this.component);
      this.component = {
        title: "",
        type: "",
        value: "",
        regex: "",
      };
      console.console.log("Se hizo");
    },
    eliminarCampo(index) {
      this.componentsNuevos.splice(index, 1);
    },
  },
};
</script>
