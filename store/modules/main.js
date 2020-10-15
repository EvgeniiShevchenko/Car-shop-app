const getDefaultState = () => {
  return {
    filter: {
      type: 0,
      category: '',
      producer: '',
      model: '',
      location: '',
      productionYearFrom: '',
      productionYearTo: '',
      valuta: 'UAN',
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
    setFilterType(state, payload) {
      state.filter.type = payload;
    },
    setFilterValuta(state, payload) {
      state.filter.valuta = payload;
    },
    setFilterCategory(state, payload) {
      state.filter.category = payload;
    },
    setFilterProducer(state, payload) {
      state.filter.producer = payload;
    },
    setFilterModel(state, payload) {
      state.filter.model = payload;
    },
    setFilterLocation(state, payload) {
      state.filter.location = payload;
    },
    setFilterProductionYearFrom(state, payload) {
      state.filter.productionYearFrom = payload;
    },
    setFilterProductionYearTo(state, payload) {
      state.filter.productionYearTo = payload;
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
    setFilterType({ commit }, payload) {
      commit('setFilterType', payload);
    },
    setFilterCategory({ commit }, payload) {
      commit('setFilterCategory', payload);
    },
    setFilterValuta({ commit }, payload) {
      commit('setFilterValuta', payload);
    },
    setFilterProducer({ commit }, payload) {
      commit('setFilterProducer', payload);
    },
    setFilterModel({ commit }, payload) {
      commit('setFilterModel', payload);
    },
    setFilterLocation({ commit }, payload) {
      commit('setFilterLocation', payload);
    },
    setFilterProductionYearFrom({ commit }, payload) {
      commit('setFilterProductionYearFrom', payload);
    },
    setFilterProductionYearTo({ commit }, payload) {
      commit('setFilterProductionYearTo', payload);
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
