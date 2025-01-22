import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user in Vuex:', user); 
      state.user = user;
    },
    setToken(state, token) {
      console.log('Setting token in Vuex:', token); 
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      console.log('Clearing auth in Vuex'); 
      state.user = null;
      state.token = '';
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  actions: {
    login({ commit }, { token, user }) {
      console.log('Logging in via Vuex:', { token, user }); 
      commit('setToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearAuth');
    },
  },
});