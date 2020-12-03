import ApiService from './api';

export default class CalculatorService extends ApiService {
  getMonitoringPriceList() {
    return this.axios.$get(`auth/one_car/price_monitoring/`);
  }
}
