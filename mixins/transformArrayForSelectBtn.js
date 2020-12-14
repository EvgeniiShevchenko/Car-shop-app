export default {
  methods: {
    transformArrayForSelectBtn: (target) => target.map((item) => ({ text: item.name, value: item.id })),
  },
};
