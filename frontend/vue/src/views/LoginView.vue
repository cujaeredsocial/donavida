<template>
  <v-app>
   <v-container fill-height>
    <v-row align="center" justify="center">
       <v-col cols="12" sm="6">
        <v-card class="elevation-10" color="primary" dark>
          <v-card-title>Welcome to DonaVida Project</v-card-title>
          <v-card-text>
          <v-form @submit.prevent="singIN">
          <v-text-field
          :rules="[campoNoVacioRule]"
           v-model="user.username"
           label="Username"
           ></v-text-field>
           <v-text-field
           :rules="[campoNoVacioRule]"
           v-model="user.password"
           :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
           :type="showPassword ? 'text' : 'password'"
           @click:append="showPassword = !showPassword"
           label="Password"
          ></v-text-field>
          <v-btn 
          :disabled="!todosCamposLlenos" 
          type="submit" 
          block 
          class="mt-2" 
          color="button"
          light
          >Submit</v-btn>
          </v-form>
          <p></p>
          {{ errorMessage }}
          <p></p>
         </v-card-text>
        </v-card>
        <router-link to="/home"  style="cursor: pointer">
          Si aun no te has registrado presiona aquí
         </router-link>
       </v-col>
     </v-row>
   </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      errorMessage: "",
      campoNoVacioRule: v => !!v || 'Este campo es obligatorio',
      showPassword: false,
    };
  },
  methods: {
    singIN() {
      this.$http.post("", this.user).then(
        (response) => {
          console.log(response);
          this.$router.push({ name: "Supongo q pagina de inicio" });
          this.$store.dispatch('setUser',user);
        },
        (error) => {
          console.log(error);
          this.errorMessage = "Hubo un problema";
        }
      );
    },
  },
  computed : {
    todosCamposLlenos() {
      return this.user.username && this.user.password;
    },
  }
};
</script>
