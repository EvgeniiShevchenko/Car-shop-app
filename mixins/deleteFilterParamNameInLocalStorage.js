export default {
  methods: {
    deleteFilterParamNameInLocalStorage(keysList) {
      let filterParamNames = JSON.parse(localStorage.getItem('filterParamsName'));

      for (let item of keysList) {
        delete filterParamNames[item];
      }

      localStorage.setItem('filterParamsName', JSON.stringify(filterParamNames));
    },
  },
};
