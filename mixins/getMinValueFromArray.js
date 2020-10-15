export default {
  methods: {
    getMinValue(array) {
      const minValue = Math.min.apply(
        Math,
        array.map((item) => {
          return item;
        })
      );

      return minValue;
    },
  },
};
