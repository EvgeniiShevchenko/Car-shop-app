import ApiService from './api';

export default class UserService extends ApiService {
  getContactForm() {
    return this.axios.$get(`/contact`);
  }
}
