import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import ProfileView from  '../views/ProfileView.vue'
import InfoView from  '../views/InfoView.vue'
import MetaUser from '@/views/MetaUser.vue'
import SolView from '../views/SolView.vue'
import NotificationCenter from '@/views/NotificationCenter.vue'
import MapView from '../views/MapView.vue'
import Centers from '../views/Centers'
Vue.use(VueRouter)

const routes = [
  {
    path: '/notificaciones',
    name: 'notificaciones',
    component: NotificationCenter

  },
  {
    path: '/requests',
    name: 'req',
    component: SolView

  },
  {
    path: '/forms/:ruta',
    name: 'forms',
    component: MetaUser

  },
  {
    path: '/info',
    name: 'info',
    component: InfoView

  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView

  },
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView

  },
  {
    path: '/home',
    name: 'home',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    component: LoginView
  },
  {
    path:'/main',
    name: 'main',
    component: MainView

  },
  {
    path:'/map',
    name: 'map',
    component: MapView

  },
  {
    path:'/centers',
    name: 'centers',
    component: Centers

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
