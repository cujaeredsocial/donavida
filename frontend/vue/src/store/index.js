import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: "",
      password: "",
      nameU: "",
      email: "",
    }
  },
  getters: {
    getUserData: user =>{
      return state.user;
    },
    isEmpty: state => {
      return Object.values(state.user).every(value => value === "");
    }
  },
  mutations: {
    setUser(state,user){
      state.user= user
    }
  },
  actions: {
    setUser({commit},user){
      commit('setUser',user);
    }
  },
  modules: {
  }
})
