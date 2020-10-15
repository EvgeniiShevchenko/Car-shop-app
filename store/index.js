import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main';

Vue.use(Vuex);

const getDefaultState = () => {
  return {};
};

const store = () =>
  new Vuex.Store({
    state: getDefaultState(),
    mutations: {},
    modules: {
      main,
    },
  });

export default store;
