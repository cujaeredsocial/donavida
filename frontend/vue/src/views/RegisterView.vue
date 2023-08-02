<template>
   <v-app>
    <v-container fill-height>
     <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
         <v-card class="elevation-10" color="red" dark>
            <v-card-title>Sign up in DonaVida project</v-card-title>
           <v-card-text>
           <v-form @submit.prevent="submit">
           <v-text-field
            v-model="user.nameU"
            label="Name"
            ></v-text-field>
            <v-text-field
            v-model="user.username"
            label="Username"
            ></v-text-field>
            <v-text-field
            v-model="user.email"
            label="Email"
            ></v-text-field>
            <v-text-field
            v-model="user.password"
            label="Password"
           ></v-text-field>
           <v-btn 
           type="submit" 
           block 
           class="mt-2" 
           color="error"
           >Submit</v-btn>
           </v-form>
           <p></p>
           {{ errorMessage }}
           <p></p>
          </v-card-text>
         </v-card>
         <router-link to="/about"  style="cursor: pointer">
           Si ya te has registrado presiona aquí para iniciar sesión
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
        nameU: "",
        username: "",
        password: "",
        email: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    submit(user) {
      this.$http.post("", user).then(
        (response) => {
          console.log(response);
          this.$router.push({ name: "login" });
          this.$store.dispatch('setUser',this.user);
        },
        (error) => {
          console.log(error);
          this.errorMessage = "Hubo un problema";
        }
      );
    },
    validEmail: function () {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.user.email)) {
        this.errorMessage = "email incorrecto";
      } else {
        console.log();
        this.errorMessage = "";
        this.submit(this.user);
      }
    },
  },
};
</script>

