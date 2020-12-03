import ApiService from './api';

export default class AdsService extends ApiService {
  getMonitoringPriceList(uniqueId) {
    return this.axios.$get(`auth/one_car/price_monitoring/${uniqueId}`);
  }
}
