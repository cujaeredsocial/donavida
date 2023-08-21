<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <v-tabs color="white" right v-model="tab">
    <v-tab to="/">
      <v-icon>mdi mdi-home-variant</v-icon>
      Inicio
    </v-tab>
    <v-tab to="/formularios">
      <v-icon> mdi mdi-list-box-outline </v-icon>
      Formularios
    </v-tab>
    <v-tab to="/centros">
      <v-icon>mdi mdi-hospital-marker</v-icon>
      Centros
    </v-tab>
    <v-tab to="/solicitud">
      <v-icon>mdi mdi-format-list-group</v-icon>
      Solicitudes
    </v-tab>
    <v-tab to="/reportes">
      <v-icon>mdi mdi-poll</v-icon>
      Reportes
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {
      tab: "/",
    };
  },
  methods: {
    toForms() {
      this.$router.push("/formularios");
    },
  },
};
</script>
<style>
.custom-tabs {
  margin-top: 56px; /* Adjust the value according to your app-bar height */
  z-index: 99; /* Ensure a higher z-index to ensure it appears above other elements */
  /* Add any other styles as needed */
}
</style>
