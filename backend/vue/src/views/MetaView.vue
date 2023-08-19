<template>
  <v-container class="text-center">
    <meta-template />
  </v-container>
</template>

<script>
import MetaTemplate from "../components/templates/MetaTemplate.vue";

export default {
  name: "MetaView",
  components: {
    MetaTemplate,
  },
};
</script>
<style>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Se ajusta la altura al tamaño de la ventana */
}
</style>
