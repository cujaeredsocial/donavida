<template>
   <v-app>
    <v-container >
     <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <v-img
                width="300"
                aspect-ratio="3" 
                src="../assets/DonaVida-removebg.png"></v-img>
         <v-card class="elevation-10" color="primary" dark>
           <v-card-title>Sign up in DonaVida project</v-card-title>
           <v-card-text>
           <v-form @submit.prevent="submit">
            <v-text-field
            :rules="[campoNoVacioRule]"
            v-model="userName"
            label="Username"
            ></v-text-field>
            <v-text-field
            :rules="[campoNoVacioRule]"
            v-model="email"
            label="Email"
            ></v-text-field>
            <v-text-field
            :rules="[campoNoVacioRule]"
            v-model="password"
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
        userName: '',
        password: '',
        email: '',
      errorMessage: "",
      campoNoVacioRule: v => !!v || 'Este campo es obligatorio',
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

<style>
.back {
  background-image: url('../assets/back.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
