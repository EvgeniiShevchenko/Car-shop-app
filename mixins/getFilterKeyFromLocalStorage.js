export default {
  methods: {
    getFilterKeyFromLocalStorage(key) {
      if (localStorage.getItem('filterParamsName') === null) return localStorage.setItem('filterParamsName', JSON.stringify({}));

      const filterParamTitles = JSON.parse(localStorage.getItem('filterParamsName'));

      return filterParamTitles[key];
    },
  },
};
