<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
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
          @click="rolDecided('gestor')"
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
            >Aqui podra modificar la plantilla del formulario correspondiente a
            los que quieren optar por ser gestores
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
          @click="rolDecided('solicitante')"
        >
          <v-img
            :src="require('../assets/prueba-de-sangre.png')"
            class="my-3"
            contain
            height="200"
          />
          <v-divider></v-divider>
          <v-card-title>
            <p class="text-h5 red--text">Solicitante</p>
          </v-card-title>
          <v-card-subtitle
            >Aqui podra modificar la plantilla del formulario correspondiente a
            los que quieran hacer una solicitud de sangre
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
            :src="require('../assets/donacion-de-sangre.png')"
            class="my-3"
            contain
            height="200"
            @click="rolDecided('donante')"
          />
          <v-divider></v-divider>
          <v-card-title>
            <p class="text-h5 red--text">Donantes</p>
          </v-card-title>
          <v-card-subtitle
            >Aqui podra modificar la plantilla del formulario correspondiente a
            los que quieren optar por ser donantes
          </v-card-subtitle>
        </v-card>
      </v-hover>
      <v-spacer></v-spacer>
      <v-hover>
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            width="250"
            height="410"
            @click="rolDecided('mensaje')"
          >
            <v-img
              :src="require('../assets/globos-de-texto.png')"
              class="my-3"
              contain
              height="200"
            />
            <v-divider></v-divider>
            <v-card-title>
              <p class="text-h5 red--text">Mensaje</p>
            </v-card-title>
            <v-card-subtitle>
              Aqui podra modificar la plantilla del formulario correspondiente a
              los mensajes que van a recibir en las notificaciones en caso de
              ser rechazados
            </v-card-subtitle>
          </v-card>
        </v-hover>
      </v-hover>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MetaTemplate from "@/components/templates/MetaTemplate.vue";

export default {
  data: function () {
    return {
      rol: "",
    };
  },
  methods: {
    rolDecided(rolSelected) {
      console.log(rolSelected);
      MetaTemplate.methods.recibirMeta(rolSelected);
      this.$router.push("/formularios/plantilla");
    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>
