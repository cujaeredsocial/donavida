import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SolicitudView from "../views/SolicitudView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/centros",
    name: "centros",
    component: () => import("../views/CentroView.vue"),
  },
  {
    path: "/reportes",
    name: "reportes",
    component: () => import("../views/ReporteView.vue"),
  },
  {
    path: "/formularios",
    name: "formularios",
    component: () => import("../views/FormulariosView.vue"),
  },
  {
    path: "/formularios/plantilla",
    name: "plantilla",
    component: () => import("../views/MetaView.vue"),
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
