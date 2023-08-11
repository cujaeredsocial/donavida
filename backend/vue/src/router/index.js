import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SolicitudView from "../views/SolicitudView.vue";
import GestionPrincipal from "../views/GestionPrincipalView.vue";
// eslint-disable-next-line no-unused-vars
import CrearReporte from "../components/CrearReporte.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/inicio",
    name: "inicio",
    component: GestionPrincipal,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LogInView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/solicitud",
    name: "solicitud",
    component: SolicitudView,
  },
  {
    path: "/crearReporte",
    name: "creaReporte",
    component: () => import("../components/CrearReporte.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
