<template>
    <v-card class="mx-auto my-12" width="400" height="420">
      <v-col class="mx-auto" cols="12" md="10">
        <!--logo de donavida-->
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
        <!--Usuario---->
        <v-text-field
          label="Usuario"
          placeholder="Introduzca su Usuario"
          required
        ></v-text-field>
        <!--Contraseña-->
        <v-text-field
          label="Contraseña"
          placeholder="Introduzca su contraseña"
          @click:append="show = !show"
          required
        ></v-text-field>  
        </v-form>
      </v-col>
      <v-col class="mx-auto" cols="12" md="10">
        <!--Boton Registro-->
        <v-btn 
        class="ma-2 white--text" 
        color="red"
        @click="validar">
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
</template>
<script>
export default {
  data() {
    return {
      gestor: {
        username: "",
        password: "",
      },
    };
  },
  methods:{
    
  }
};
</script>
