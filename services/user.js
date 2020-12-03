import ApiService from './api';

export default class UserService extends ApiService {
  getContactForm() {
    return this.axios.$get(`/contact`);
  }
  submitContactForm(data) {
    return this.axios.$post(`/contact`, data);
  }
}
