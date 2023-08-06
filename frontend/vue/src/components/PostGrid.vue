<template>
            <v-col>
                <v-card
                color="rgb(255, 0, 0, 0.2)"
                >
                   <v-carousel 
                   cycle interval="8000" 
                   hide-delimiters
                   class="elevation-10 "
                   >
                      <v-carousel-item 
                      v-for="post in posts.slice()" 
                      :key="post.id"
                      cover
                      >
                      <v-container class="fill-height">
                        <v-row> 
                            <v-col
                            cols="12"
                            sm="12"
                            >
                               <Post :post="post" />
                            </v-col>
                        </v-row>
                    </v-container>
                       </v-carousel-item>
                    </v-carousel>
                </v-card>
            </v-col>
  </template>
  
  <script>
  import Post from './Post'
  
  export default {
    components: {
      Post
    },
    props: {
      posts: {
        type: Array,
        required: true
      }
    },

  }
  </script>
  