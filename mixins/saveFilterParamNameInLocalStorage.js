export default {
  methods: {
    saveFilterParamNameInLocalStorage(key, value) {
      if (localStorage.getItem('filterParamsName') === null) return localStorage.setItem('filterParamsName', JSON.stringify({ [key]: value }));

      let filterParamNames = JSON.parse(localStorage.getItem('filterParamsName'));

      filterParamNames = { ...filterParamNames, [key]: value };

      localStorage.setItem('filterParamsName', JSON.stringify(filterParamNames));
    },
  },
};
