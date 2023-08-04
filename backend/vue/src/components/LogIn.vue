<template>
  <v-container class="text-center">
    <v-card class="mx-auto my-16" width="400" height="420">
      <v-col class="mx-auto" cols="12" md="10">
        <!--logo de donavida-->
        <v-img
          :src="require('../assets/DonaVida-removebg.png')"
          class="my-3"
          contain
          height="90"
        />
        <!--Usuario---->
        <v-text-field
          v-model="user.username"
          :rules="rules.name"
          label="Usuario"
          placeholder="Introduzca su Usuario"
          required
        ></v-text-field>
        <!--Contraseña-->
        <v-text-field
          v-model="user.password"
          :rules="rules.name"
          :append-icon="!show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          label="Contraseña"
          placeholder="Introduzca su contraseña"
          @click:append="show = !show"
          required
        ></v-text-field>
      </v-col>
      <v-col class="mx-auto" cols="12" md="10">
        <v-btn class="ma-2 white--text" color="red">
          <!--Boton Inicio-->
          <v-icon>mdi mdi-login-variant</v-icon>
          <span>Inicia Sesion</span>
        </v-btn>
      </v-col>
      <v-col class="mx-auto" cols="12" md="10">
        <span>¿No tienes una cuenta? </span>
        <router-link to="/register" style="cursor: pointer">
          Registrate
        </router-link>
      </v-col>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      valid: false,
      user: {
        username: "",
        password: "",
      },
      rules: {
        name: [(val) => (val || "").length > 0 || "No ha llenado este campo"],
      },
    };
  },
};
</script>
