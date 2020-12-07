import ApiService from './api';

export default class CalculatorService extends ApiService {
  getCalculationResult(carId, queryString) {
    return this.axios.$get(`auth/one_car/calculation/${carId}${queryString}`);
  }
}
