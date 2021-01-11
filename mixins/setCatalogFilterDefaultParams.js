export default {
  methods: {
    setCatalogFilterDefaultParams(key, flag) {
      switch (key) {
        case 0:
          if (flag) {
          } else {
            if (this.isPreviousHome) {
              this.setAbroad(true);
              this.setCustomsCleared(true);
            } else {
              this.setAbroad(null);
              this.setCustomsCleared(null);
            }
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
          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Растаможенные');
          this.saveFilterParamNameInLocalStorage('status', 'Б/y автомобили');

          return flag;
        case 2:
          if (flag) {
            flag['customsCleared'] = true;
            flag['abroad'] = true;
          } else {
            this.setAbroad(true);
            this.setCustomsCleared(true);
          }
          this.saveFilterParamNameInLocalStorage('is_ukraine', this.abroad ? 'Авто в Украине' : 'Авто не в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', this.customsCleared ? 'Растаможенные' : 'Нерастаможенные');
          this.saveFilterParamNameInLocalStorage('status', 'Новые автомобили');

          return flag;

        default:
          if (flag) {
            flag['customsCleared'] = false;
            flag['abroad'] = false;
          } else {
            this.setAbroad(false);
            this.setCustomsCleared(false);
          }

          this.saveFilterParamNameInLocalStorage('is_ukraine', 'Авто не в Украине');
          this.saveFilterParamNameInLocalStorage('is_cleared', 'Нерастаможенные');
          this.saveFilterParamNameInLocalStorage('status', 'Под пригон автомобили');

          return flag;
      }
    },
  },
};
