<template>
    <v-app>
    <v-container fluid class="background-container fill-container">
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/DonaVida-removebg.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>
  
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">Bienvenido a Dona Vida</h1>
  
          <p class="subheading font-weight-regular">
            Este proyecto se dedica al mejoramiento del sistema de donaciones de
            sangre <br />
          </p>
          <v-btn class="ma-2 white--text" color="red" @click="toLogin">
            <v-icon>mdi mdi-login-variant</v-icon>
            <span>Iniciar Sesion</span>
          </v-btn>
          <v-btn class="ma-2 white--text" color="red" @click="toRegister">
            <v-icon>mdi mdi-account-plus-outline</v-icon>
            <span>Registrarse</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    methods: {
      toLogin() {
        this.$router.push("/about");
      },
      toRegister() {
        this.$router.push("/home");
      },
    },
  };
  </script>
  
  <style scoped>
  .background-container {
    margin-bottom: -20px;
    background-image: url('../assets/back1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .fill-container {
    height: 100%;
    min-height: calc(100vh - 64px); /* Ajusta la altura según tus necesidades */
  }
</style>