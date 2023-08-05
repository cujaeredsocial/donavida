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
        <v-form
           ref="form"
           v-model="valid"
           lazy-validation
          >
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
          :rules="rules.emailRules"
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
        <v-btn 
        class="ma-2 white--text" 
        color="red"
        @click="validar">
          <v-icon>mdi mdi-account-plus-outline</v-icon>
          <span>Registrar</span>
        </v-btn>
        </v-form>
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
      enableButton: true,
      show: false,
      valid: false,
      user: {
        username: "",
        password: "",
        email: "",
      },
      rules: {
        emailRules: [
          v => !!v || 'No se ha llenado este campo',
          v => /.+@.+\..+/.test(v) || 'Correo no válido',
        ],
        name: [(val) => (val || "").length > 0 || "No ha llenado este campo"],
      },
    };
  },
  methods:{
    //Aqui en lugar del metodo para validar, junto a el deberia ir el metodo para registrarse
    validar () {
        this.$refs.form.validate()
      },
  }
};
</script>
