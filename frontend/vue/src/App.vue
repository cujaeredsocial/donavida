<template>
  <v-app >

    <!-- Side NavBar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
       <v-app-bar color="red" dark >
        <v-app-bar-nav-icon @click="sideNav=!sideNav" ></v-app-bar-nav-icon>
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
      :elevation="5"
      app
      color="bar"
      dark
    >
     <v-app-bar-nav-icon @click="sideNav=!sideNav"></v-app-bar-nav-icon>
     <v-toolbar-title
     class="hidden-xs-only"
     >
       <router-link v-if="this.$store.getters.isEmpty" to="/" v-slot="{ navigate, href }" custom>
        <div v-on:click="navigate">
          <a :href="href" style="color:white; text-decoration:none;"><h2>DonaVida</h2></a>
        </div>
      </router-link>
      <router-link v-else to="/main" v-slot="{ navigate, href }" custom>
        <div v-on:click="navigate">
          <a :href="href" style="color:white; text-decoration:none;"><h2>DonaVida</h2></a>
        </div>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Horizontal navBar items -->
     <v-toolbar-items class="hidden-xs-only" v-if="!(this.$route.name==='welcome')" >
       <v-btn 
       color="bar"  
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
  },
  computed :{
     horizontalNavItems(){
        if(this.$store.getters.isEmpty){
      return [
        {icon:'mdi-login-variant',title:'Iniciar sesion',link:'/about'},
        {icon:'mdi-account-plus-outline',title:'Registrarse',link:'/home'}
      ]
        }else{
          return [
        {icon:'mdi-account',title:'User',link:'/profile'},
        {icon:'mdi-share-variant',title:'Share',link:''},
        {icon:'mdi-folder',title:'Info',link:'/info'}
      ]
        }

     },
     sideNavItems(){
        if(this.$store.getters.isEmpty){
      return [
        {icon:'mdi-home',title:'Home',link:'/'},
        {icon:'mdi-login-variant',title:'Iniciar Sesion',link:'/about'},
        {icon:'mdi-account-plus-outline',title:'Registrarse',link:'/home'},
        
      ]
        }else{
          return [
        {icon:'mdi-home',title:'Home',link:'/main'},
        {icon:'mdi-account',title:'User',link:'/profile'},
        {icon:'mdi-share-variant',title:'Share',link:''},
        {icon:'mdi-folder',title:'Info',link:'/info'},
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
