<template>
  <v-app >
<v-container fluid class="app-container">
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
     <v-toolbar-items class="hidden-xs-only" >
       <v-btn 
       color="bar"  
       v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
            {{item.title}}
       </v-btn>
       <!-- <div class="badge-container" v-if="!(this.$route.name==='welcome')&&!(this.$route.name==='home')&&!(this.$route.name==='about')">
        <v-badge :content="12">
          <v-icon>mdi-bell</v-icon>
         </v-badge>
       </div> -->
     </v-toolbar-items>
    </v-app-bar>
    <!-- Current View -->
    <v-main>
      <v-container fluid class="mt-4 app-container">
        <transition name="fade">
          <router-view/>
        </transition>
      </v-container>
    </v-main>
  </v-container>
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
        {icon:'mdi-account',title:'',link:'/profile'},
        {icon:'mdi-share-variant',title:'',link:''},
        {icon:'mdi-bell',title:'',link:''}
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

.app-container {
  padding: 0;
  background-image: url('./assets/back1.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.badge-container {
  display: flex;
  align-items: center;
}
</style>
