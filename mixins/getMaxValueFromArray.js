export default {
  methods: {
    getMaxValue(array) {
      const maxValue = Math.max.apply(
        Math,
        array.map((item) => {
          return item;
        })
      );

      return maxValue;
    },
  },
};
