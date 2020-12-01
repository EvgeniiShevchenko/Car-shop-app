import ApiService from './api';

export default class AdsService extends ApiService {
  getLatestAdsFor404() {
    return this.axios.$get(`/404`);
  }
}
