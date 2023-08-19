<template>
  <v-app>
   <v-container fluid class="background-container fill-container">
    <v-row align="center" justify="center">
        <v-card class="mx-auto my-16" width="400" height="420">
          <v-col class="mx-auto" cols="12" md="10">
              <v-img
          :src="require('../assets/DonaVida-removebg.png')"
          class="my-3"
          contain
          height="90"
            />
          <v-card-text>
          <v-form @submit.prevent="singIN"  ref="form" v-model="valid">
          
          <!--Username-->
          <v-text-field
          :rules="rules"
           v-model="user.userName"
           label="Username"
           ></v-text-field>
           
           <!--Password-->
           <v-text-field
           :rules="rules"
           v-model="user.password"
           :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
           :type="showPassword ? 'text' : 'password'"
           @click:append="showPassword = !showPassword"
           label="Password"
          ></v-text-field>

           <!--Submit-->
          <v-btn 
          :disabled="!valid" 
          type="submit" 
          block 
          class="mt-2" 
          color="red"
          dark
          >Submit</v-btn>
          </v-form>
          <span>¿Aun no tienes cuenta?</span>
          <router-link to="/home"  style="cursor: pointer">
            Registrate
          </router-link>
         </v-card-text>
        </v-col>
        </v-card>
     </v-row>
   </v-container>
  </v-app>
</template>

<script>
export default {
   
  data() {
    return {
      valid: false,
      user: {
        userName: "",
        password: ""
      },
      errorMessage: "",
      rules: [
        v => !!v || 'Este campo es obligatorio',
        v => v.length>4 || 'Este campo requiere al menos 4 caracteres',
    ],
      showPassword: false,
    };
  },
  methods: {
    singIN() {
      this.$http.post("http://127.0.0.1:27000/login", this.user).then(
        (response) => {
          console.log(response.data);
          this.$router.push({ name: "main" });
          this.$store.dispatch('setUser',response.data.user);
          localStorage.setItem('password', response.data.user.password);
          localStorage.setItem('username', response.data.user.userName);
          localStorage.setItem('email', response.data.user.email);

        },
        (error) => {
          console.log(error);
          this.errorMessage = "Hubo un problema iniciando sesion revise q los datos sean correctos";
          confirm(this.errorMessage);
        }
      );
    },
  },
  
};
</script>

<style scoped>
.background-container {
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