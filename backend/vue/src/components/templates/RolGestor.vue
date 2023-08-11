<template>
  <v-container class="spacing-playground pa-12" fluid>
    <v-card class="mx-auto my-auto" width="800" height="450">
      <!--logo de donavida-->
      <v-img
        :src="require('../../assets/DonaVida-removebg.png')"
        class="my-3"
        contain
        height="60"
      />
      <v-form>
        <!--Los campos ya guardados en la base datos-->
        <v-col v-for="(campo, index) in camposArray" :key="index" class="ms-8">
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
        <v-col v-for="(campo, index) in n" :key="index" class="ms-8">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                label="Titulo"
                v-model="component.title"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                label="Tipo"
                v-model="component.type"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                label="Valor"
                v-model="component.value"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                label="Regex"
                v-model="component.regex"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-card-actions>
          <v-col class="ms-6" cols="12" md="10">
            <v-btn color="red" @click="nuevoCampo" text>
              <v-icon> MAS</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
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
      this.n += 1;
    },
    guardarCambios() {
      this.componentsNuevos[this.n - 1] = this.component;
    },
  },
};
</script>
