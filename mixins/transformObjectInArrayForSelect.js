export default {
  methods: {
    transformObjectInArrayForSelect(target) {
      let store = [];

      for (let item in target) {
        store = [...store, { text: target[item], value: item }];
      }

      return store;
    },
  },
};
