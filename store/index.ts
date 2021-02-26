import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';
import { RootState, Mutations, Actions } from './types';

Vue.use(Vuex);

const getDefaultState = (): RootState => {
  return {
    locales: 'ru',
    isLogin: false,
    activeModalWindowName: '',
    modalWindowMeta: null,
    currentCarName: '',
  };
};

interface IMutations {
  setLogin: boolean;
  setActiveModalWindowName: string;
  resetActiveModalWindowName: void;
  setModalWindowMeta: any;
  resetModalWindowMeta: void;
  setCurrentCarName: string;
}

const mutations: Mutations<RootState, IMutations> = {
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
  setCurrentCarName(state, payload) {
    state.currentCarName = payload;
  },
};

interface IActions extends IMutations {}

const actions: Actions<RootState, IActions, {}, IMutations> = {
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
  setCurrentCarName({ commit }, payload) {
    commit('setCurrentCarName', payload);
  },
};

const store = () =>
  new Vuex.Store({
    state: getDefaultState(),
    mutations,
    actions,
    modules: {
      filter,
    },
  });

export default store;
