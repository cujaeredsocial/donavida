import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

const config = require('../../../config');
Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  origin: config.URLDSS,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
