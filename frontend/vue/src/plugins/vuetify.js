import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import { VMenu } from 'vuetify/lib';
Vue.use(Vuetify);


export default new Vuetify({
    theme: {
        themes: {
          light: {
            bar:'#fe3b3b',
            primary: '#660000',
            button: '#FF8A80',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#b71c1c',
          },
        },
      },
      components:{
        VMenu
      }
});
