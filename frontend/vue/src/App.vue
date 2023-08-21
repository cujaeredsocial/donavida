<template>
  <v-app>
    <v-container fluid class="app-container">
      <!-- Side NavBar -->
      <v-navigation-drawer app temporary fixed v-model="sideNav">
        <v-app-bar color="red" dark>
          <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
          <v-toolbar-title @click="gotoMain" style="cursor: pointer"
            >DonaVida</v-toolbar-title
          >
        </v-app-bar>
        <v-divider></v-divider>

        <!-- Side NavBar Links -->
        <v-list>
          <v-list-item
            ripple
            v-for="item in sideNavItems"
            :key="item.id"
            :to="item.link"
          >
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Horizontal NavBar -->
      <v-app-bar :elevation="5" app color="bar" dark>
        <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link
            v-if="this.$store.getters.isEmpty"
            to="/"
            v-slot="{ navigate, href }"
            custom
          >
            <div v-on:click="navigate">
              <a :href="href" style="color: white; text-decoration: none"
                ><h2>DonaVida</h2></a
              >
            </div>
          </router-link>
          <router-link v-else to="/main" v-slot="{ navigate, href }" custom>
            <div v-on:click="navigate">
              <a :href="href" style="color: white; text-decoration: none"
                ><h2>DonaVida</h2></a
              >
            </div>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Horizontal navBar items -->
        <v-btn
          color="bar"
          v-for="item in horizontalNavItems"
          :key="item.id"
          :to="item.link"
          >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="!this.$store.getters.isEmpty"
          @click="botonCampana"
          @dblclick="handleDoubleClick"
          color="bar"
        >
          <v-badge color="blue" dot  :value="areThereNewNotifications">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
          
        </v-btn>
      </v-app-bar>

      <!--Barra lateral de notificaciones-->
      <transition name="expand-x">
        <div v-if="drawer" class="panel">
          <v-toolbar color="red" dark>
            <v-btn icon @click="drawer = !drawer">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>Centro de Notificaciones</v-toolbar-title>
            <v-btn @click="handleDoubleClick" color="bar">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="panel-content">
            <v-list>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="11"
                  class="mx-2"
                  v-for="Notificacion in Notifications"
                  :key="Notificacion.id"
                >
                  <Notificacion :Notification="Notificacion" />
                </v-col>
              </v-row>
            </v-list>
          </div>
        </div>
      </transition>

      <!-- Current View -->
      <v-main>
        <v-container fluid class="mt-4 app-container">
          <transition name="fade">
            <router-view />
          </transition>
        </v-container>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import Notificacion from "./components/Notificacion.vue";
export default {
  name: "App",
  components: {
    Notificacion,
  },
  data() {
    return {
      sideNav: false,
      drawer: false,
      panelVisible: false,
      socket: null,
      notifications: [],
      Notifications: [
        {
          title: "Ha sido Aprobado como donante",
          informacion:
            "loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremvv",
          link: "info",
          fecha: "  2/2/12",
          type: "green",
          icon: "mdi-checkbox-marked-circle",
          leida: false,
        },
        {
          title: "Ha sido Aprobado como donante",
          informacion: "blabla",
          link: "profile",
          fecha: "  2/2/12",
          type: "red",
          icon: "mdi-cancel",
          leida: true,
        },
        {
          title: "Ha sido Aprobado como donante",
          informacion: "blabla",
          link: "info",
          fecha: "  2/2/12",
          type: "gray",
          icon: "mdi-minus-circle",
          leida: true,
        },
        {
          title: "Ha sido Aprobado como donante",
          informacion: "blabla",
          route: "info",
          fecha: "  2/2/12",
          type: "gray",
          icon: "mdi-minus-circle",
          leida: true,
        },
        {
          title: "Ha sido Aprobado como donante",
          informacion: "blabla",
          route: "info",
          fecha: "  2/2/12",
          type: "gray",
          icon: "mdi-minus-circle",
          leida: true,
        },
      ],
    };
  },
  methods: {
    
    //Estos es el metodo de lo que hace el btn de la campana cuando le das click
    botonCampana(){
      this.drawer = !this.drawer; 
          if(this.areThereNewNotifications){
            this.marcarNoLeidas();
          }
    },

    //Metodo para marcar todoas las no leidas como leidas
    marcarNoLeidas(){
      const noLeidas = this.Notifications.filter((element)=>{
        return !element.leida
      });
      console.log(noLeidas)
      noLeidas.forEach((element)=>{
        element.leida= true;
      })
    },
    handleNotification(notification) {
      if (notification.message == "Donante Aprobado") {
        this.notifications.push({
          title: "Felicitaciones usted ha sido aprobado como donante",
          informacion:
            "Su solicitud como donante ha sido aprobada bienvenido a DonaVida project su pequeño gesto puede hacer grandes cosas. Presione aqui para comenzar como donante",
          link: "no se q poner", //definir
          fecha: Date.now,
          type: "green",
          icon: "mdi-checkbox-marked-circle",
        });
      } else if (notification.message == "Donante Rechazado") {
        this.notifications.push({
          title:
            "Lo sentimos lamentablemente usted no cumple con las condiciones médicas para ser donante",
          informacion:
            "Su solicitud como donante ha sido rechazada debido a que no cumplía requisitos médicos necesarios, pero si aún esta interesado presione aqui para rellenar una solicitud de Gestor",
          link: "no se q poner", //definir
          fecha: Date.now,
          type: "red",
          icon: "mdi-cancel",
        });
      } else if (notification.message == "Gestor Aprobado") {
        this.notifications.push({
          title:
            "Felicitaciones usted ha sido aprobado como Gestor de DonaVida",
          informacion:
            "Su solicitud como gestor ha sido aprobada bienvenido a DonaVida project su pequeño gesto puede hacer grandes cosas. Presione aqui para comenzar como Gestor",
          link: "no se q poner", //definir
          fecha: Date.now,
          type: "green",
          icon: "mdi-checkbox-marked-circle",
        });
      } else if (notification.message == "Gestor Rechazado") {
        this.notifications.push({
          title:
            "Lo sentimos lamentablemente usted no cumple con las condiciones para ser Gestor",
          informacion:
            "Su solicitud como gestor ha sido rechazada debido a que no cumplía los requisitos necesarios",
          link: "no se q poner", //definir
          fecha: Date.now,
          type: "red",
          icon: "mdi-cancel",
        });
      }
      this.notifications.push(notification);
    },
    handleDoubleClick() {
      if (this.$route.name !== "notificaciones") {
        this.drawer = false;
        this.$router.push({ name: "notificaciones" });
      } else {
        this.drawer = false;
      }
     
    },
    goToRegister() {
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      }
    },
    goToLogin() {
      if (this.$route.name !== "about") {
        this.$router.push({ name: "about" });
      }
    },
    gotoMain() {
      if (this.$route.name !== "main") {
        this.$router.push({ name: "main" });
      }
    },
    getUser() {
      return this.$store.getters.getUserData;
    },
    togglePanel() {
      this.panelVisible = !this.panelVisible;
    },
  },
  computed: {
        //Metodo para saber si hay nueva notificaion
        areThereNewNotifications(){
      if(this.Notifications.find((element)=>{
        return !element.leida
      })){
        return true
      }else{
        return false
      }
    },
    horizontalNavItems() {
      if (this.$store.getters.isEmpty) {
        return [
          {
            icon: "mdi-login-variant",
            title: "Iniciar sesion",
            link: "/about",
          },
          {
            icon: "mdi-account-plus-outline",
            title: "Registrarse",
            link: "/home",
          },
        ];
      } else {
        return [
          { icon: "mdi-account", title: "", link: "/profile" },
          { icon: "mdi-share-variant", title: "", link: "" },
        ];
      }
    },
    sideNavItems() {
      if (this.$store.getters.isEmpty) {
        return [
          { icon: "mdi-home", title: "Home", link: "/" },
          {
            icon: "mdi-login-variant",
            title: "Iniciar Sesion",
            link: "/about",
          },
          {
            icon: "mdi-account-plus-outline",
            title: "Registrarse",
            link: "/home",
          },
        ];
      } else {
        return [
          { icon: "mdi-home", title: "Home", link: "/main" },
          { icon: "mdi-account", title: "User", link: "/profile" },
          { icon: "mdi-note", title: "Solicitudes", link: "/requests" },
          { icon: "mdi-share-variant", title: "Share", link: "" },
          { icon: "mdi-folder", title: "Info", link: "/info" },
        ];
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}

.app-container {
  padding: 0;
  background-image: url("./assets/back1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.badge-container {
  display: flex;
  align-items: center;
}

.panel {
  width: 400px;
  height: 100vh;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.expand-x-enter-active,
.expand-x-leave-active {
  transition: all 0.3s;
}
.expand-x-enter,
.expand-x-leave-to {
  transform: translateX(100%);
}

.panel-content {
  height: calc(100% - 56px); /* Resta el alto de la barra de herramientas */
  overflow-y: auto; /* Habilita el scroll vertical */
  overflow-x: hidden;
}
.panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Color semi-transparente */
  z-index: 998; /* Debajo del panel */
}
</style>
