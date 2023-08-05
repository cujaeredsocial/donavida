import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{
      userName:"",
      password:"",
      email:"",
    }
  },
  getters: {
    getUser: state =>{
      return state.user;
    }
  },
  mutations: {
    setUser(state,user) {
      state.user = user;
    }
  },
  actions: {
    setUser({commit},user){
      commit('setUser',user);
    }
  },
  modules: {},
});
