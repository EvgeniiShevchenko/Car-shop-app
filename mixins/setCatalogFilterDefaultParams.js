export default {
  methods: {
    setCatalogFilterDefaultParams(key, flag) {
      switch (key) {
        case 0:
          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Растаможенные');

          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          this.deleteFilterParamNameInLocalStorage(['status']);

          return flag;
        case 1:
          this.saveFilterParamNameInLocalStorage('status', 'Б/у автомобили');
          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Растаможенные');

          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          return flag;
        case 2:
          this.saveFilterParamNameInLocalStorage('status', 'Новые автомобили');
          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Растаможенные');

          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }

          return flag;

        default:
          this.saveFilterParamNameInLocalStorage('status', 'Под пригон автомобили');
          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто не в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Нерастаможенные');

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
