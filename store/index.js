import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    locales: 'ru',
    isLogin: false,
  };
};

const store = () =>
  new Vuex.Store({
    state: getDefaultState(),
    mutations: {
      setLogin(state, payload) {
        state.isLogin = payload;
      },
    },
    actions: {
      setLogin({ commit }, payload) {
        commit('setLogin', payload);
      },
    },
    modules: {
      filter,
    },
  });

export default store;
