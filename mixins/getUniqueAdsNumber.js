export default {
  methods: {
    getUniqueAdsNumber() {
      return this.$route.params.id.match(/\b\d+\b$/g)[0];
    },
  },
};
