import ApiService from './api';

export default class FilterService extends ApiService {
  getFilterTransportTypes() {
    return this.axios.$get(`filters/types`);
  }

  getFilterCountries() {
    return this.axios.$get(`filters/countries`);
  }

  getFilterBrand(type) {
    return this.axios.$get(`filters/marks?type=${type}`);
  }

  getFilterModel(type, brand) {
    return this.axios.$get(`filters/models?type=${type}&mark=${brand}`);
  }

  getFilterCarcase(type) {
    return this.axios.$get(`filters/series?type=${type}`);
  }

  getFilterRegions() {
    return this.axios.$get(`filters/regions`);
  }

  getFilterCities(regionId) {
    return this.axios.$get(`filters/cities?region=${regionId}`);
  }

  getFilterCurrencies() {
    return this.axios.$get(`filters/currencies`);
  }

  getFilterCharacteristic(type) {
    return this.axios.$get(`filters/characteristic?type=${type}`);
  }

  getFilterCarCondition(type) {
    return this.axios.$get(`filters/carCondition?type=${type}`);
  }

  getFilterCarComfort(type) {
    return this.axios.$get(`filters/carComfort?type=${type}`);
  }

  getFilterCarMultimedia(type) {
    return this.axios.$get(`filters/carMultimedia?type=${type}`);
  }

  getFilterCarSecurity(type) {
    return this.axios.$get(`filters/carSecurity?type=${type}`);
  }

  getFilterCarAnother(type) {
    return this.axios.$get(`filters/carAnother?type=${type}`);
  }
}
