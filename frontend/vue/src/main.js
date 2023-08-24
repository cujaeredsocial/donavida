import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

export const SocketInstance = socketio('http://127.0.0.1:27000');
Vue.use(new VueSocketIO({connection: SocketInstance}));


Vue.config.productionTip = false
Vue.use(VueResource);
Vue.http.options.root = "http://190.15.158.240:27000/createuser";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
