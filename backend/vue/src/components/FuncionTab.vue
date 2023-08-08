<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <v-tabs
    color="white"
    right
    v-model="tab"
  >
    <v-tab>
      <v-icon>
        mdi mdi-account-box-multiple
      </v-icon>
        Usuarios
    </v-tab>
    <v-tab>
      <v-icon>
       
      </v-icon>
      Solicitudes
    </v-tab>
    <v-tab>Reportes</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text><p>Funciona</p></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    
</template>

<script>
export default {
  data(){
    return{
      tab: null,
    }
  }
}
</script>
<style>
.custom-tabs {
  margin-top: 56px; /* Adjust the value according to your app-bar height */
  z-index: 99; /* Ensure a higher z-index to ensure it appears above other elements */
  /* Add any other styles as needed */
}
</style>