const getDefaultState = () => {
  return {
    defaultValues: {
      currency: null,
      priceRange: {
        min: 0,
        max: 0,
      },
    },
    collections: {
      categoryList: [],
      brandList: [],
      modelList: [],
      yearFromList: [],
      yearToList: [],
    },
    filter: {
      states: 0,
      type: '',
      brand: '',
      model: '',
      location: null,
      city: null,
      productionYearFrom: 0,
      productionYearTo: 0,
      currency: '',
      priceMin: 0,
      priceMax: 0,
      isVinCode: false,
      mileageFrom: null,
      mileageTo: null,
      transmission: [],
      fuel: [],
      driveUnit: [],
      customsCleared: null,
      abroad: null,
      isStateNumber: false,
      broken: null,
      damage: null,
      sort: 'data_asc',
      publicationTime: 'all',
      additionalSettings: null,
    },
  };
};

export default {
  namespaced: true,

  state: getDefaultState(),

  mutations: {
    setFilterStates(state, payload) {
      state.filter.states = payload;
    },
    resetFilterStates(state) {
      state.filter.states = 0;
    },
    setFilterCurrency(state, payload) {
      state.filter.currency = payload;
    },
    setDefaultCurrency(state, payload) {
      state.defaultValues.currency = payload;
    },
    resetFilterCurrency(state) {
      state.filter.currency = state.defaultValues.currency;
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
      state.filter.location = null;
    },
    setFilterProductionYearFrom(state, payload) {
      state.filter.productionYearFrom = payload;
    },
    resetFilterProductionYearFrom(state) {
      state.filter.productionYearFrom = 0;
    },
    setFilterProductionYearTo(state, payload) {
      state.filter.productionYearTo = payload;
    },
    resetFilterProductionYearTo(state) {
      state.filter.productionYearTo = 0;
    },
    setFilterPriceRangeMax(state, payload) {
      state.defaultValues.priceRange.max = payload;
    },
    setFilterPriceRangeMin(state, payload) {
      state.defaultValues.priceRange.min = payload;
    },
    setPriceMax(state, payload) {
      state.filter.priceMax = payload;
    },
    resetPriceMax(state) {
      state.filter.priceMax = state.defaultValues.priceRange.max;
    },
    setPriceMin(state, payload) {
      state.filter.priceMin = payload;
    },
    resetPriceMin(state) {
      state.filter.priceMin = state.defaultValues.priceRange.min;
    },
    setVinCode(state, payload) {
      state.filter.isVinCode = payload;
    },
    resetVinCode(state) {
      state.filter.isVinCode = false;
    },
    setStateNumber(state, payload) {
      state.filter.isStateNumber = payload;
    },
    resetStateNumber(state) {
      state.filter.isStateNumber = false;
    },
    setMileageFrom(state, payload) {
      state.filter.mileageFrom = payload;
    },
    resetMileageFrom(state) {
      state.filter.mileageFrom = null;
    },
    setMileageTo(state, payload) {
      state.filter.mileageTo = payload;
    },
    resetMileageTo(state) {
      state.filter.mileageTo = null;
    },
    setBroken(state, payload) {
      state.filter.broken = payload;
    },
    resetBroken(state) {
      state.filter.broken = null;
    },
    setDamage(state, payload) {
      state.filter.damage = payload;
    },
    resetDamage(state) {
      state.filter.damage = null;
    },
    setTransmission(state, payload) {
      state.filter.transmission = payload;
    },
    deleteTransmission(state, id) {
      state.filter.transmission = state.filter.transmission.filter((item) => item !== id);
    },
    resetTransmission(state) {
      state.filter.transmission = [];
    },
    setFuel(state, payload) {
      state.filter.fuel = payload;
    },
    deleteFuel(state, id) {
      state.filter.fuel = state.filter.fuel.filter((item) => item !== id);
    },
    resetFuel(state) {
      state.filter.fuel = [];
    },
    setDriveUnit(state, payload) {
      state.filter.driveUnit = payload;
    },
    deleteDriveUnit(state, id) {
      state.filter.driveUnit = state.filter.driveUnit.filter((item) => item !== id);
    },
    resetDriveUnit(state) {
      state.filter.driveUnit = [];
    },
    setCustomsCleared(state, payload) {
      state.filter.customsCleared = payload;
    },
    resetCustomsCleared(state) {
      state.filter.customsCleared = null;
    },
    setAbroad(state, payload) {
      state.filter.abroad = payload;
    },
    resetAbroad(state) {
      state.filter.abroad = null;
    },
    setCategoryList(state, payload) {
      state.collections.categoryList = payload;
    },
    resetCategoryList(state) {
      state.collections.categoryList = [];
    },
    setBrandList(state, payload) {
      state.collections.brandList = payload;
    },
    resetBrandList(state) {
      state.collections.brandList = [];
    },
    setModelList(state, payload) {
      state.collections.modelList = payload;
    },
    resetModelList(state) {
      state.collections.modelList = [];
    },
    setYearFromList(state, payload) {
      state.collections.yearFromList = payload;
    },
    resetYearFromList(state) {
      state.collections.yearFromList = [];
    },
    setYearToList(state, payload) {
      state.collections.yearToList = payload;
    },
    resetYearToList(state) {
      state.collections.yearToList = [];
    },
    setSort(state, payload) {
      state.filter.sort = payload;
    },
    resetSort(state) {
      state.filter.sort = 'data_asc';
    },
    setPublicationTime(state, payload) {
      state.filter.publicationTime = payload;
    },
    resetPublicationTime(state) {
      state.filter.publicationTime = 'all';
    },
    resetAll(state) {
      state.filter.type = '';
      state.filter.brand = '';
      state.filter.model = '';
      state.filter.productionYearFrom = 0;
      state.filter.productionYearTo = 0;
      state.filter.priceMax = state.defaultValues.priceRange.max;
      state.filter.priceMin = state.defaultValues.priceRange.min;
      state.filter.isVinCode = false;
      state.filter.isStateNumber = false;
      state.filter.mileageFrom = null;
      state.filter.mileageTo = null;
      state.filter.broken = null;
      state.filter.damage = null;
      state.filter.transmission = [];
      state.filter.fuel = [];
      state.filter.driveUnit = [];
      state.collections.categoryList = [];
      state.collections.brandList = [];
      state.collections.modelList = [];
      state.collections.yearFromList = [];
      state.collections.yearToList = [];
      state.filter.sort = 'data_asc';
      state.filter.publicationTime = 'all';
    },
    setAdditionalSettings(state, payload) {
      state.filter.additionalSettings = payload;
    },
    resetAdditionalSettings(state) {
      state.filter.additionalSettings = null;
    },
    initialFilterParams(state, payload) {
      state.filter = { ...state.filter, ...payload };
    },
    initialFilterPriceRange(state, { minPrice, maxPrice }) {
      state.filter.priceMax = maxPrice;
      state.filter.priceMin = minPrice;
    },
    setFilterCity(state, payload) {
      state.filter.city = payload;
    },
    resetFilterCity(state) {
      state.filter.city = null;
    },
  },

  actions: {
    setFilterStates({ commit }, payload) {
      commit('setFilterStates', payload);
    },
    resetFilterStates({ commit }) {
      commit('resetFilterStates');
    },
    setFilterType({ commit }, payload) {
      commit('setFilterType', payload);
    },
    resetFilterType({ commit }) {
      commit('resetFilterType');
    },
    setDefaultCurrency({ commit }, payload) {
      commit('setDefaultCurrency', payload);
    },
    setFilterCurrency({ commit }, payload) {
      commit('setFilterCurrency', payload);
    },
    resetFilterCurrency({ commit }) {
      commit('resetFilterCurrency');
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
    resetPriceMax({ commit }) {
      commit('resetPriceMax');
    },
    setPriceMin({ commit }, payload) {
      commit('setPriceMin', payload);
    },
    resetPriceMin({ commit }) {
      commit('resetPriceMin');
    },
    setVinCode({ commit }, payload) {
      commit('setVinCode', payload);
    },
    resetVinCode({ commit }) {
      commit('resetVinCode');
    },
    setStateNumber({ commit }, payload) {
      commit('setStateNumber', payload);
    },
    resetStateNumber({ commit }) {
      commit('resetStateNumber');
    },
    setMileageFrom({ commit }, payload) {
      commit('setMileageFrom', payload);
    },
    resetMileageFrom({ commit }) {
      commit('resetMileageFrom');
    },
    setMileageTo({ commit }, payload) {
      commit('setMileageTo', payload);
    },
    resetMileageTo({ commit }) {
      commit('resetMileageTo');
    },
    setBroken({ commit }, payload) {
      commit('setBroken', payload);
    },
    resetBroken({ commit }) {
      commit('resetBroken');
    },
    setDamage({ commit }, payload) {
      commit('setDamage', payload);
    },
    resetDamage({ commit }) {
      commit('resetDamage');
    },
    setTransmission({ commit }, payload) {
      commit('setTransmission', payload);
    },
    deleteTransmission({ commit }, deleteId) {
      commit('deleteTransmission', deleteId);
    },
    resetTransmission({ commit }) {
      commit('resetTransmission');
    },
    setFuel({ commit }, payload) {
      commit('setFuel', payload);
    },
    deleteFuel({ commit }, deleteId) {
      commit('deleteFuel', deleteId);
    },
    resetFuel({ commit }) {
      commit('resetFuel');
    },
    setDriveUnit({ commit }, payload) {
      commit('setDriveUnit', payload);
    },
    deleteDriveUnit({ commit }, payload) {
      commit('deleteDriveUnit', payload);
    },
    resetDriveUnit({ commit }) {
      commit('resetDriveUnit');
    },
    setCustomsCleared({ commit }, payload) {
      commit('setCustomsCleared', payload);
    },
    resetCustomsCleared({ commit }) {
      commit('resetCustomsCleared');
    },
    setAbroad({ commit }, payload) {
      commit('setAbroad', payload);
    },
    resetAbroad({ commit }) {
      commit('resetAbroad');
    },
    setCategoryList({ commit }, payload) {
      commit('setCategoryList', payload);
    },
    resetCategoryList({ commit }) {
      commit('resetCategoryList');
    },
    setBrandList({ commit }, payload) {
      commit('setBrandList', payload);
    },
    resetBrandList({ commit }) {
      commit('resetBrandList');
    },
    setModelList({ commit }, payload) {
      commit('setModelList', payload);
    },
    resetModelList({ commit }) {
      commit('resetModelList');
    },
    setYearFromList({ commit }, payload) {
      commit('setYearFromList', payload);
    },
    resetYearFromList({ commit }) {
      commit('resetYearFromList');
    },
    setYearToList({ commit }, payload) {
      commit('setYearToList', payload);
    },
    resetYearToList({ commit }) {
      commit('resetYearToList');
    },
    setSort({ commit }, payload) {
      commit('setSort', payload);
    },
    resetSort({ commit }) {
      commit('resetSort');
    },
    setPublicationTime({ commit }, payload) {
      commit('setPublicationTime', payload);
    },
    resetPublicationTime({ commit }) {
      commit('resetPublicationTime');
    },
    resetAll({ commit }) {
      commit('resetAll');
    },
    setAdditionalSettings({ commit }, payload) {
      commit('setAdditionalSettings', payload);
    },
    resetAdditionalSettings({ commit }) {
      commit('resetAdditionalSettings');
    },
    initialFilterParams({ commit }, payload) {
      commit('initialFilterParams', payload);
    },
    initialFilterPriceRange({ commit }, payload) {
      commit('initialFilterPriceRange', payload);
    },
    setFilterCity({ commit }, payload) {
      commit('setFilterCity', payload);
    },
    resetFilterCity({ commit }, payload) {
      commit('resetFilterCity', payload);
    },
  },
};
