export default {
  methods: {
    getCarouselRange() {
      return this.$vuetify.breakpoint.xs ? 1 : this.$vuetify.breakpoint.smAndDown ? 2 : 4;
    },
  },
};
