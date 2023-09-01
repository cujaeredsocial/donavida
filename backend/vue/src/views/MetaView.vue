<template>
  <v-container class="text-center">
    <meta-template-1 :rol-actual="this.$store.getters.getRol" />
  </v-container>
</template>

<script>
import MetaTemplate1 from "../components/templates/MetaTemplate1.vue";

export default {
  name: "MetaView",
  components: {
    MetaTemplate1,
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
