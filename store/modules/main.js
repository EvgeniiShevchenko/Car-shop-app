const getDefaultState = () => {
  return {
    filter: {
      states: 1,
      type: '',
      brand: '',
      model: '',
      location: '',
      productionYearFrom: '',
      productionYearTo: '',
      valuta: '',
      priceRange: {
        min: 0,
        max: 0,
      },
      priceMin: 0,
      priceMax: 0,
    },
  };
};

export default {
  namespaced: true,

  state: getDefaultState(),

  getters: {},

  mutations: {
    setFilterStates(state, payload) {
      state.filter.states = payload;
    },
    setFilterValuta(state, payload) {
      state.filter.valuta = payload;
    },
    setFilterType(state, payload) {
      state.filter.type = payload;
    },
    resetFilterType(state) {
      state.filter.type = '';
    },
    setFilterBrand(state, payload) {
      state.filter.brand = payload;
    },
    resetFilterBrand(state) {
      state.filter.brand = '';
    },
    setFilterModel(state, payload) {
      state.filter.model = payload;
    },
    resetFilterModel(state) {
      state.filter.model = '';
    },
    setFilterLocation(state, payload) {
      state.filter.location = payload;
    },
    resetFilterLocation(state) {
      state.filter.location = '';
    },
    setFilterProductionYearFrom(state, payload) {
      state.filter.productionYearFrom = payload;
    },
    resetFilterProductionYearFrom(state) {
      state.filter.productionYearFrom = '';
    },
    setFilterProductionYearTo(state, payload) {
      state.filter.productionYearTo = payload;
    },
    resetFilterProductionYearTo(state) {
      state.filter.productionYearTo = '';
    },
    setFilterPriceRangeMax(state, payload) {
      state.filter.priceRange.max = payload;
    },
    setFilterPriceRangeMin(state, payload) {
      state.filter.priceRange.min = payload;
    },
    setPriceMax(state, payload) {
      state.filter.priceMax = payload;
    },
    setPriceMin(state, payload) {
      state.filter.priceMin = payload;
    },
  },

  actions: {
    setFilterStates({ commit }, payload) {
      commit('setFilterStates', payload);
    },
    setFilterType({ commit }, payload) {
      commit('setFilterType', payload);
    },
    resetFilterType({ commit }) {
      commit('resetFilterType');
    },
    setFilterValuta({ commit }, payload) {
      commit('setFilterValuta', payload);
    },
    setFilterBrand({ commit }, payload) {
      commit('setFilterBrand', payload);
    },
    resetFilterBrand({ commit }) {
      commit('resetFilterBrand');
    },
    setFilterModel({ commit }, payload) {
      commit('setFilterModel', payload);
    },
    resetFilterModel({ commit }) {
      commit('resetFilterModel');
    },
    setFilterLocation({ commit }, payload) {
      commit('setFilterLocation', payload);
    },
    resetFilterLocation({ commit }) {
      commit('resetFilterLocation');
    },
    setFilterProductionYearFrom({ commit }, payload) {
      commit('setFilterProductionYearFrom', payload);
    },
    resetFilterProductionYearFrom({ commit }) {
      commit('resetFilterProductionYearFrom');
    },
    setFilterProductionYearTo({ commit }, payload) {
      commit('setFilterProductionYearTo', payload);
    },
    resetFilterProductionYearTo({ commit }) {
      commit('resetFilterProductionYearTo');
    },
    setFilterPriceRangeMax({ commit }, payload) {
      commit('setFilterPriceRangeMax', payload);
    },
    setFilterPriceRangeMin({ commit }, payload) {
      commit('setFilterPriceRangeMin', payload);
    },
    setPriceMax({ commit }, payload) {
      commit('setPriceMax', payload);
    },
    setPriceMin({ commit }, payload) {
      commit('setPriceMin', payload);
    },
  },
};
