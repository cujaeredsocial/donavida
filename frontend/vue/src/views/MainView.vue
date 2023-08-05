<template>
    <v-app>
        <v-container class="background-container" >
            <v-row>
              <v-col cols="12" sm="8">
                <v-img
                width="250"
                aspect-ratio="3" 
                src="../assets/DonaVida-removebg.png"></v-img>
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
                 </v-card-text>
                </v-card>
              </v-col>
         <PostGrid :posts="posts" />
        </v-row>
        </v-container>
        <!-- <v-card
        width="1200"
        height="800"
        class="elevation-10"
        style="background-color:rgb(255, 0, 0, 0.3); color:white"
        ></v-card> -->
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
    }
  }
  </script>
  
  <style>
  .background-container {
    background-image: url('../assets/fondo3.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  
</style>