<template>
  <v-app>
    <div id="app">
      <v-toolbar app color="#fe3b3b" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title><h1>DonaVida</h1></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="$route.name === 'register'" text @click="toInicio">
          <v-icon>mdi mdi-login-variant</v-icon>
          <span class="mr-2">Inicia Sesion</span>
        </v-btn>
        <v-btn v-else-if="$route.name === 'login'" text @click="toRegister">
          <v-icon>mdi mdi-account-plus-outline</v-icon>
          <span class="mr-2">Registrar Sesion</span>
        </v-btn>
      </v-toolbar>
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },

  methods: {
    toSolicitud() {
      this.$router.push("/solicitud");
    },
    toInicio() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
