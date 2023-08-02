<template>
  <v-app>
    <v-toolbar
      app
      color="primary"
      dark
    >
     <v-app-bar-nav-icon></v-app-bar-nav-icon>
     <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        DonaVida
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn 
    class="button"
    light
    v-if="$route.name==='home'" 
    @click="goToLogin">
      Sign in
    </v-btn>
    <v-btn 
    class="button" 
    light
    v-else-if="$route.name==='about'" 
    @click="goToRegister">
      Sign up
      </v-btn>
      <v-btn 
      class="button" 
      light
      v-else-if="$store.getters.isEmpty" 
      @click="goToLogin">
        Sign in
        </v-btn>
        <div v-else-if="!$store.getters.isEmpty">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        </div>    
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
    },
    getUser(){
      return this.$store.getters.getUserData;
    },
    isEmpty(){
      const user = this.$store.getters.getUserData;
      if(user.username==""){
        return true;
      }else{
        return false;
      }
    }
  }
  };
</script>
