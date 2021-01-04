import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    locales: 'ru',
    isLogin: false,
    activeModalWindowName: '',
  };
};

const store = () =>
  new Vuex.Store({
    state: getDefaultState(),
    mutations: {
      setLogin(state, payload) {
        state.isLogin = payload;
      },
      setActiveModalWindowName(state, payload) {
        state.activeModalWindowName = payload;
      },
      resetActiveModalWindowName(state) {
        state.activeModalWindowName = '';
      },
    },
    actions: {
      setLogin({ commit }, payload) {
        commit('setLogin', payload);
      },
      setActiveModalWindowName({ commit }, name) {
        commit('setActiveModalWindowName', name);
      },
      resetActiveModalWindowName({ commit }) {
        commit('resetActiveModalWindowName');
      },
    },
    modules: {
      filter,
    },
  });

export default store;
