<template>
  <v-app >

    <!-- Side NavBar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
       <v-app-bar color="red" dark >
        <v-app-bar-nav-icon @click="sideNav=!sideNav"></v-app-bar-nav-icon>
        <v-toolbar-title @click="gotoMain" style="cursor: pointer;">DonaVida</v-toolbar-title>
       </v-app-bar>
       <v-divider></v-divider>

       <!-- Side NavBar Links -->
          <v-list>
            <v-list-item ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
                <v-icon>{{item.icon}}</v-icon>
                {{ item.title }}
            </v-list-item>
          </v-list>

    </v-navigation-drawer>

    <!-- Horizontal NavBar -->
    <v-app-bar
      :elevation="10"
      app
      color="primary"
      dark
    >
     <v-app-bar-nav-icon @click="sideNav=!sideNav"></v-app-bar-nav-icon>
     <v-toolbar-title
     class="hidden-xs-only"
     >
       <router-link to="/" class="logo-link" v-slot="{ navigate, href }" custom>
        <div v-on:click="navigate">
          <img class="logo" src="./assets/DonaVida-logo.png" alt="Logo">
          <a :href="href" style="color:white; text-decoration:none;">DonaVida</a>
        </div>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Horizontal navBar items -->
     <v-toolbar-items class="hidden-xs-only">
       <v-btn 
       color="primary" 
       v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
            {{item.title}}
       </v-btn>
     </v-toolbar-items>
    </v-app-bar>
    <!-- Current View -->
    <v-main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data(){
    return{
      sideNav :false
    };
  },
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
    gotoMain() {
      if (this.$route.name !== 'main') {
        this.$router.push({ name: 'main' });
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
  },
  computed :{
     horizontalNavItems(){
        if(this.$store.getters.isEmpty){
      return [
        {icon:'mdi-lock',title:'Sign In',link:'/about'},
        {icon:'mdi-pencil',title:'Sign Up',link:'/home'}
      ]
        }else{
          return [
        {icon:'mdi-account',title:'User',link:''},
        {icon:'mdi-share-variant',title:'Share',link:''},
        {icon:'mdi-dots-vertical',title:'More',link:''}
      ]
        }

     },
     sideNavItems(){
        if(this.$store.getters.isEmpty){
      return [
        {icon:'mdi-lock',title:'Sign In',link:'/about'},
        {icon:'mdi-pencil',title:'Sign Up',link:'/home'}
      ]
        }else{
          return [
        {icon:'mdi-account',title:'User',link:''},
        {icon:'mdi-share-variant',title:'Share',link:''},
        {icon:'mdi-dots-vertical',title:'More',link:''}
      ]
        }

     }
  }
  };
</script>

<style>
.logo-link {
  margin-right: 10px;
}

.logo {
  width: 50px;
  height: 50px;
}

.fade-enter-active,
.fade-leave-active{
      transition-property: all;
      transition-duration: 0.25s;
}

.fade-enter-active{
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active{
  opacity: 0;
  transform: translateX(-25px);
}
</style>
