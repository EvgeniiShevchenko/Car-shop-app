import ApiService from './api';

export default class CarService extends ApiService {
  sendCarComplainMessage(serverData) {
    return this.axios.$post(`auth/one_car/complaint`, serverData);
  }
}
