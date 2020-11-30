export default {
  methods: {
    getStatusName(statusId) {
      switch (Number(statusId)) {
        case 0:
          return 'Все автомобили';

        case 1:
          return 'Б/у автомобили';

        case 2:
          return 'Новые автомобили';

        default:
          return 'Под пригон автомобили';
      }
    },
  },
};
