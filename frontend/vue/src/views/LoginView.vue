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
           v-model="user.username"
           label="Username"
           ></v-text-field>
           <v-text-field
           v-model="user.password"
           label="Password"
          ></v-text-field>
          <v-btn 
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
};
</script>
