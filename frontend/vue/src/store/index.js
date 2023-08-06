//import VuexPersist from 'vuex-persist';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const vuexPersist = new VuexPersist({
//   key: 'my-app',
//   storage: localStorage,
//   reducer: (state) => {
//     // Filtra el estado basado en tu condición
//     if (state.user.isLoggedIn) {
//       return {
//         user: state.user,
//       };
//     }
//     // Restablece el estado a un valor predeterminado si la condición no se cumple
//     return {
//       user: {
//         isLoggedIn: false,
//       },
//     };
//   },
// });

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
    },
    deleteUser(state) {
      state.user.email ="";
      state.user.nameU =""; 
      state.user.password =""; 
      state.user.username =""; 
    }
  },
  actions: {
    setUser({commit},user){
      commit('setUser',user);
    },
    deleteUser({ commit }) {
      commit('deleteUser');
    }
  },
  modules: {
  }
})
