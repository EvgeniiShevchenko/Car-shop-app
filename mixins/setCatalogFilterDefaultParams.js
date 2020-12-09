export default {
  methods: {
    setCatalogFilterDefaultParams(key, flag) {
      switch (key) {
        case 0:
          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          return flag;
        case 1:
          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          return flag;
        case 2:
          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          return flag;

        default:
          if (flag) {
            flag['customsCleared'] = false;
            flag['abroad'] = false;
          } else {
            this.setAbroad(false);
            this.setCustomsCleared(false);
          }

          return flag;
      }
    },
  },
};
