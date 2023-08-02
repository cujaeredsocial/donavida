<template>
  <v-app>
    <v-toolbar
      app
      color="red"
      dark
    >
     <v-app-bar-nav-icon></v-app-bar-nav-icon>
     <v-toolbar-title>
      <router-link to="/main" tag="span" style="cursor: pointer">
        DonaVida
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="error" v-if="$route.name==='home'" @click="goToLogin">
      Sign in
    </v-btn>
    <v-btn class="error" v-else-if="$route.name==='about'" @click="goToRegister">
      Sign up
      </v-btn>
    </v-toolbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    goToRegister() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' });
      }
    },
    goToLogin() {
      if (this.$route.name !== 'about') {
        this.$router.push({ name: 'about' });
      }
    }
  }
  };
</script>
