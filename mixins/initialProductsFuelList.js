export default {
  methods: {
    initialProductsFuelList(modelsList) {
      return modelsList.map((item) => ({ ...item.product, count: item.count }));
    },
  },
};
