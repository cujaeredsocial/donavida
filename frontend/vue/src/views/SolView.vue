<template>
  <v-responsive  style="min-height: 100vh;">
    <div class="pa-6 text-center">
      <h1 style="text-align: center; color: red">
        Registro de solicitudes realizadas
      </h1>
    </div>
    <v-responsive
      class="text-center pa-2"
      v-for="metauser in usuarios"
      :key="metauser._id">
      <div class="text-rigth text-body-2 ">
        Fecha: {{ new Date(metauser.date).toDateString() }}
      </div>

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 0.5,
        }"
        min-height="200"
        transition="fade-transition"
        style="padding-bottom: 40px;"
      >
        <solicitud-vue :meta-user="metauser"></solicitud-vue>
      </v-lazy>

    </v-responsive >
  </v-responsive>
</template>

  <script>
import solicitudVue from "../components/solicitud.vue";
export default {
  mounted() {
    console.log(this.$store.getters.getUserData.userName);
    this.$http
      .get(
        `http://127.0.0.1:27000/metauser/inprocessrequests`
      )
      .then((response) => {
        console.log(response);
        this.usuarios = response.body.metas;
        console.log(this.usuarios);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
    console.log("helo");
  },

  data: () => ({
    isActive: false,
    usuarios: [],
  }),

  components: {
    solicitudVue: solicitudVue,
  },
};
</script>
