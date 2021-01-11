export default {
  methods: {
    resetFilterParamsInLocalStorage() {
      localStorage.setItem('filterParamsName', JSON.stringify({}));
    },
  },
};
