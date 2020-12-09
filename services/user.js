import ApiService from './api';

export default class UserService extends ApiService {
  getContactForm() {
    return this.axios.$get(`/contact`);
  }
  submitContactForm(data) {
    return this.axios.$post(`/contact`, data);
  }
  getUserData(token) {
    return this.axios.$get(`/auth/client/personal`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  saveUserData(data, token) {
    return this.axios.$put(`/auth/client/change`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ChangeUserPassword(data, token) {
    return this.axios.$put(`/auth/client/changePassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getCities(params) {
    return this.axios.$get(`/filters/cities`, { params });
  }
}
