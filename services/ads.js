import ApiService from './api';

export default class AdsService extends ApiService {
  getLatestAdsFor404() {
    return this.axios.$get(`/404`);
  }
  getCheckByAuto(id) {
    return this.axios.get(`/auth/one_car/check/${id}`);
  }
}
