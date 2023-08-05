<template>
  <v-container>
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
          en este apartado usted sera el encargado de gestionar este proceso
        </p>
        <v-btn class="ma-2 white--text" color="red" @click="toInicio">
          <v-icon>mdi mdi-login-variant</v-icon>
          <span>Iniciar Sesion</span>
        </v-btn>
        <v-btn class="ma-2 white--text" color="red" @click="toRegister">
          <v-icon>mdi mdi-account-plus-outline</v-icon>
          <span>Registrar Sesion</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    toInicio() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
