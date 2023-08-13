<template>
    <v-sheet
    border="lg opacity-12"
    class="text-body-2 mx-auto"
    max-width="550"
  >  
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="3">
          <v-card>
            <v-card-title>Solicitud {{metaUser.rol}}</v-card-title>
            <v-card-text>{{metaUser.state}}</v-card-text>
          </v-card>    
    </v-col>
      <v-col cols="12" md="9">
        <ul>
            <li v-for="item in metaUser.components" :key="item.id">
                <h3>{{item.label}}</h3>
                <p>{{item. value_Introducido_por_el_usuario}}</p>
            </li>
        </ul>
    </v-col>
</v-row>
</v-container>
</v-sheet>
  </template>
  
  <script>
  export default {
    props: {
      metaUser: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  