<template>
    <v-app>
        <v-container fluid class="background-container fill-container" >
         <div class="image-container">
          <v-img
          width="350"
          aspect-ratio="3" 
          src="../assets/DonaVida-removebg.png"></v-img>
        </div>
          <div class="button-container">
            <v-btn color="bar" dark @click="goToInfo">Información General</v-btn>
            <v-btn color="bar" dark>Estadísticas </v-btn>
            <v-btn color="bar" dark>Chat</v-btn>
            <v-btn color="bar" dark>Redes Sociales</v-btn>
            </div>  
            <br>
            <br>
            <br>
          <v-row>
              <v-col cols="12" sm="8">
               
                <v-card 
                class="elevation-10"
                style="background-color:rgb(255, 0, 0, 0.3); color:white"
                >
                 <v-card-title>
                   <h2> Bienvenido al proyecto DonaVida</h2>
                 </v-card-title>
                 <v-card-text class="white--text">
                 <h2> <br> •	El objetivo del proyecto es ayudar a quien lo necesita para que pueda seguir viviendo. Esto implica hacer todo lo que esté en nuestras manos para ofrecer apoyo a través de la red, sin prestar atención a políticas o campañas que puedan legitimar la voluntad de ayudarnos entre humanos. Debemos asegurarnos de que la ayuda sea genuina y no esté motivada por intereses políticos o económicos, sino por el deseo de ayudar a quienes lo necesitan.
                 </h2>
                 <br>
                 <v-btn color="bar" dark>
                  Comienza a donar
                 </v-btn>
                 <br>
                 <br>
                 <h2>El proyecto DonaVida cuenta con un chat interno para facilitar la comunicación entre los usuarios.</h2>
                 <br>
                 <v-btn color="bar" dark>
                  Comienza a chatear
                 </v-btn>
                 <br>
                 <br>
                 <h2 style="text-align: center;">Tú también puedes ayudar</h2>
                 <br>
                 <div class="button-container">
                 <v-btn color="bar" dark>
                  Aplicar para donante
                 </v-btn>
                 <v-btn color="bar" dark>
                  Aplicar para gestor
                 </v-btn>
                </div>
                 </v-card-text>
                </v-card>
              </v-col>
                 <PostGrid :posts="posts" />
              </v-row>
              <br><br>
              <h4 style="text-align: center;">© 2023 DonaVida Development Team</h4>
        </v-container>
    </v-app>
  </template>
  
  <script>
  import PostGrid from '../components/PostGrid.vue'
  
  export default {
    components: {
      PostGrid
    },
    data() {
      return {
        posts: [
          { id: 1, title: 'Post 1', image:'' ,info:'HOLA 1'},
          { id: 2, title: 'Post 2',  image:'',info:'HOLA 2' },
        ]
      }
    },
    methods: {
      goToInfo() {
      if (this.$route.name !== 'info') {
        this.$router.push({ name: 'info' });
      }
    },
    }
  }
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
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 20px; /* Ajusta el valor de acuerdo al espacio deseado entre los botones */
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
</style>