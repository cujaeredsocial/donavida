<template>
    <v-app>
      <v-container fluid class="background-container fill-container">
        <v-row>
          <v-col cols="4">
            <v-card>
              <v-card-text class="d-flex flex-column">
                <v-img
          :src="require('../assets/DonaVida-removebg.png')"
          class="my-3"
          contain
          height="90"
        />
                <v-btn
                  v-for="item in menuItems"
                  :key="item.title"
                  class="my-2"
                  small
                  @click="selectItem(item)"
                >
                  {{ item.title }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card>
              <v-card-text>
                <template v-if="selectedItem">
                  <!-- Contenido del panel para el botón seleccionado -->
                   <component :is="selectedItem.component"></component>
                </template>
                <template v-else>
                  <h2>Seleccione una opción</h2>
                  <!-- Contenido del panel por defecto cuando no se ha seleccionado ningún botón -->
                </template>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        </v-container>
      </v-app>
</template>

<script>
import cuenta from '../components/userComponents/cuenta.vue'
import Informacion from '../components/userComponents/informacion.vue'

export default{
    data(){
        return {
            selectedItem: null
        }
    },
    computed: {
        menuItems(){
           return [
            {icon:'mdi-home',title:'Mi Cuenta',link:'/main',component:cuenta},
            {icon:'mdi-account',title:'Preguntas Frecuentes',link:'/profile', component: Informacion},
            {icon:'mdi-share-variant',title:'Informacion',link:''},
            {icon:'mdi-dots-vertical',title:'Contáctanos',link:''},
            ]
        },
    },
    methods: {
    selectItem(item) {
      this.selectedItem = item;
    }
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
  min-height: calc(100vh - 64px); /* Ajusta la altura según tus necesidades */
}
</style>