import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    locales: 'ru',
    isLogin: false,
    activeModalWindowName: '',
    modalWindowMeta: null,
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
      setModalWindowMeta(state, payload) {
        state.modalWindowMeta = payload;
      },
      resetModalWindowMeta(state) {
        state.modalWindowMeta = null;
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
      setModalWindowMeta({ commit }, payload) {
        commit('setModalWindowMeta', payload);
      },
      resetModalWindowMeta({ commit }) {
        commit('resetModalWindowMeta');
      },
    },
    modules: {
      filter,
    },
  });

export default store;
