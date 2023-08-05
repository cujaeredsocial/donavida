<template>
  <v-app>
    <div id="app">
      <v-app-bar color="#fe3b3b" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
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
      </v-app-bar>
      <!--Barra de navegacion !Pendiente de arreglo-->
      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      </div>
      <v-main>
        <router-view />
      </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      drawer: false,
      group: null,
    };

  },

  methods: {
    toInicio() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
