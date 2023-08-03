<template>
    <v-app>
        <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-img
                width="300"
                aspect-ratio="" 
                src="../assets/DonaVida-removebg.png"></v-img>
                <v-card 
                class="elevation-10"
                color="rgb(255, 0, 0, 0.2)"
                >
                 <v-card-title>
                    Bienvenido al proyecto DonaVida
                 </v-card-title>
                 <v-card-text>
                    Some information about DonaVida Project
                 </v-card-text>
                </v-card>
              </v-col>
         <PostGrid :posts="posts" />
        </v-row>
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
          { id: 1, title: 'Post 1', content: 'Contenido del Post 1' ,info:'HOLA 1'},
          { id: 2, title: 'Post 2', content: 'Contenido del Post 2',info:'HOLA 2' },
          { id: 3, title: 'Post 3', content: 'Contenido del Post 3',info:'HOLA 3' },
          { id: 4, title: 'Post 4', content: 'Contenido del Post 4',info:'HOLA 4' },
          { id: 5, title: 'Post 5', content: 'Contenido del Post 5',info:'HOLA 5' },
          { id: 6, title: 'Post 6', content: 'Contenido del Post 6',info:'HOLA 6' },
          { id: 7, title: 'Post 7', content: 'Contenido del Post 7' ,info:'HOLA 7'},
          { id: 8, title: 'Post 8', content: 'Contenido del Post 8' ,info:'HOLA 8'},
          { id: 9, title: 'Post 9', content: 'Contenido del Post 9' ,info:'HOLA 9'},
          { id: 10, title: 'Post 10', content: 'Contenido del Post 10',info:'HOLA 10' },
        ]
      }
    }
  }
  </script>
  