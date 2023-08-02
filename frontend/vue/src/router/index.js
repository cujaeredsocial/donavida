import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  {
    path:'/main',
    name: 'main',
    component: MainView

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
