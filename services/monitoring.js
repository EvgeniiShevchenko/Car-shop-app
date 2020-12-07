import ApiService from './api';

export default class AdsService extends ApiService {
  getMonitoringPriceList(uniqueId) {
    return this.axios.$get(`auth/one_car/price_monitoring/${uniqueId}`);
  }

  getFuelProductsList(carId, fuelId) {
    return this.axios.$get(`auth/one_car/price_monitoring/${carId}/fuel/${fuelId}`);
  }

  getSentenceList(carId, currencyId) {
    return this.axios.$get(`auth/one_car/sentence/${carId}/currency/${currencyId}`);
  }
}
