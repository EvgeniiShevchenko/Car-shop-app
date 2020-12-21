export default {
  methods: {
    getRouteNameFromPath(path) {
      return path.match(/\b\w+\b$/)[0];
    },
  },
};
