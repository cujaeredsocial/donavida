<template>
  <v-container class="text-center">
    <v-card class="mx-auto my-12" width="400" height="450">
      <v-col class="mx-auto" cols="12" md="10">
        <!--Logo de DonaVida-->
        <v-img
          :src="require('../assets/DonaVida-removebg.png')"
          class="my-3"
          contain
          height="90"
        />
        <!--Usuario-->
        <v-text-field
          v-model="user.username"
          :rules="rules.name"
          label="Usuario"
          placeholder="Introduzca su Usuario"
          required
        ></v-text-field>
        <!--Correo-->
        <v-text-field
          v-model="user.email"
          :rules="rules.name"
          label="Correo"
          placeholder="Introduzca su Correo"
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
        <!--Boton de Inicio-->
        <v-btn class="ma-2 white--text" color="red">
          <v-icon>mdi mdi-account-plus-outline</v-icon>
          <span>Registrar</span>
        </v-btn>
      </v-col>
      <v-col class="mx-auto" cols="12" md="10">
        <span>¿Ya tienes una cuenta? </span>
        <router-link to="/login" style="cursor: pointer">
          Inicia Sesion
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
        email: "",
      },
      rules: {
        name: [(val) => (val || "").length > 0 || "No ha llenado este campo"],
      },
    };
  },
};
</script>
