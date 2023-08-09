import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource';


Vue.config.productionTip = false
Vue.use(VueResource);
Vue.http.options.root = "http://190.15.158.240:27000/createuser";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
