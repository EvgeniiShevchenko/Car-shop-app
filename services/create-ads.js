import ApiService from './api';

export default class CreateAdsService extends ApiService {
  getAdditionalCharacteristic() {
    return this.axios.$get(`filters/characteristic`);
  }

  getAdditionalCarCondition(transportType = 1) {
    return this.axios.$get(`filters/carCondition?type=${transportType}`);
  }

  getAdditionalComfortCondition(transportType = 1) {
    return this.axios.$get(`filters/carComfort?type=${transportType}`);
  }

  getAdditionalMultimediaCondition(transportType = 1) {
    return this.axios.$get(`filters/carMultimedia?type=${transportType}`);
  }

  getAdditionalSecurityCondition(transportType = 1) {
    return this.axios.$get(`filters/carSecurity?type=${transportType}`);
  }

  getAdditionalAnotherCondition(transportType = 1) {
    return this.axios.$get(`filters/carAnother?type=${transportType}`);
  }

  getAdditionalCurrenciesList() {
    return this.axios.$get(`filters/currencies`);
  }

  getAdditionalTest() {
    return this.axios.$get(`filters/regions`);
  }

  getAdditionalDraft() {
    return this.axios.$get(`auth/one_car/draft`);
  }

  postAdditionalNewAds(body) {
    return this.axios.$post(`auth/one_car/products`, body);
  }
}
