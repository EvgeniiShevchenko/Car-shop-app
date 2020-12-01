import Vue from 'vue';
import Vuex from 'vuex';

import filter from './modules/filter';

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    locales: 'ru',
  };
};

const store = () =>
  new Vuex.Store({
    state: getDefaultState(),
    mutations: {},
    modules: {
      filter,
    },
  });

export default store;
