<template>
   <v-app>
    <v-container fluid class="background-container fill-container">
     <v-row align="center" justify="center">
         <v-card class="mx-auto my-12" width="400" height="450">
          <v-col class="mx-auto" cols="12" md="10">
            <v-img
          :src="require('../assets/DonaVida-removebg.png')"
          class="my-3"
          contain
          height="90"
        />
           <v-card-text>
           <v-form @submit.prevent="submit">
            <v-text-field
            :rules="[campoNoVacioRule]"
            v-model="userName"
            label="Username"
            ></v-text-field>
            <v-text-field
            :rules="emailRules"
            v-model="email"
            label="Email"
            ></v-text-field>
            <v-text-field
            :rules="[campoNoVacioRule]"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
           @click:append="showPassword = !showPassword"
            label="Password"
           ></v-text-field>
           <v-btn
           :disabled="!todosCamposLlenos" 
           type="submit" 
           block 
           class="mt-2" 
           color="red"
           dark
           >Submit</v-btn>
           </v-form>
           <span>¿Ya tienes una cuenta? </span>
           <router-link to="/about"  style="cursor: pointer">
             Inicia sesión
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
        userName: '',
        password: '',
        email: '',
      errorMessage: "",
      campoNoVacioRule: v => !!v || 'Este campo es obligatorio',
      emailRules: [
     v => !!v || 'E-mail is required',
     v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
   ],
        showPassword:false
    };
  },
  methods: {
     submit() {
       const user = {
       userName: this.userName,
       email: this.email,
       password: this.password,
     };
     console.log(user);
     this.$http.post("http://127.0.0.1:27000/createuser",user)
      .then(response => {
        // Verificar el estado de la respuesta
        if (response.status === 200) {
          // Usuario registrado correctamente
          console.log(response); // Puedes mostrar o utilizar la respuesta recibida
          this.$router.push({ name: "main" });
          this.$store.dispatch('setUser', user);
        } else {
          // Mostrar mensaje de error si la respuesta no es exitosa
          console.log(response.statusText); // Puedes mostrar o utilizar el mensaje de error
          this.errorMessage = "Hubo un problema en el registro";
          confirm(this.errorMessage);
        }
      })
      .catch(error => {
        // Mostrar mensaje de error si ocurre una excepción
        console.log(error); // Puedes mostrar o utilizar el error recibido
        this.errorMessage = "Hubo un problema en el registro";
      });
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
  computed : {
    todosCamposLlenos() {
      return this.userName && this.email && this.password;
    },
  }
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
