import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rol: "",
    user: {
      userName: "",
      password: "",
      email: "",
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getRol: (state) => {
      return state.rol;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setRol(state, rol) {
      state.rol = rol;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setRol({ commit }, rol) {
      commit("setRol", rol);
    },
  },
  modules: {},
});
