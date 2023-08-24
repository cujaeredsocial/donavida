<template>
  <v-container class="spacing-playground pa-16" fluid>
    <v-row class="fill-height" align="center" justify="center">
      <v-spacer></v-spacer>
      <v-hover v-slot="{ hover }">
        <v-card
          :elevation="hover ? 12 : 2"
          :class="{ 'on-hover': hover }"
          width="250"
          min-height="410"
        >
          <v-img
            :src="require('../assets/ingeniero-de-software.png')"
            class="my-3"
            contain
            height="200"
          />
          <v-divider></v-divider>
          <v-card-title>
            <p class="text-h5 red--text">Gestor</p>
          </v-card-title>
          <v-card-subtitle
            >Aqui tendra acceso a las solicitudes de los que desean optar por
            ser gestores
          </v-card-subtitle>
        </v-card>
      </v-hover>
      <v-spacer></v-spacer>
      <v-hover v-slot="{ hover }">
        <v-card
          :elevation="hover ? 12 : 2"
          :class="{ 'on-hover': hover }"
          width="250"
          height="410"
        >
          <v-img
            :src="require('../assets/prueba-de-sangre.png')"
            class="my-3"
            contain
            height="200"
          />
          <v-divider></v-divider>
          <v-card-title>
            <p class="text-h5 red--text">Solicitudes</p>
            <p class="text-h5 red--text">de Donacion</p>
          </v-card-title>
          <v-card-subtitle
            >Aqui podra acceder a las solicitudes de donacion que aun no han
            sido aceptadas
          </v-card-subtitle>
        </v-card>
      </v-hover>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Solicitud 1" },
      { text: "Solicitud 2" },
      { text: "Solicitud 3" },
      { text: "Solicitud 4" },
      { text: "Solicitud 5" },
    ],
    donantes: [],
  }),
};
</script>
