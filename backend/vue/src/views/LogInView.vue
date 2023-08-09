<template>
  <v-container class="text-center">
    <rol-gestor />
  </v-container>
</template>

<script>
import RolGestor from "../components/RolGestor.vue";

export default {
  name: "LogInView",

  components: {
    RolGestor,
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

