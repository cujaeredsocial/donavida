<template>
  <v-container class="text-center">
    <log-in />
  </v-container>
</template>

<script>
import LogIn from "../components/LogIn.vue";

export default {
  name: "LogInView",

  components: {
    LogIn,
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

