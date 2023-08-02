<template>
    <v-card>
      <v-img :src="post.image" aspect-ratio="1.7" cover></v-img>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{ post.info }}</v-card-text>
    </v-card>

  </template>
  
  <script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
        info:""
      }
    }
  }
  </script>