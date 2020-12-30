import ApiService from './api';
import qs from 'qs';

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
  getAboutUsInfo() {
    return this.axios.$get(`/about`);
  }
  getCallPeriods() {
    return this.axios.get(`/filters/timeRain`);
  }
  orderCall(payload) {
    return this.axios.post(`/auth/one_car/check_form`, qs.stringify(payload));
  }
  getUserAds(params, token) {
    return this.axios.$get(`/auth/client/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }
  deleteUserAds(params, token) {
    return this.axios.delete(`/auth/client/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }
  toPublishOrInactiveUserAds(payload, token) {
    return this.axios.$post(`/auth/client/products/published`, qs.stringify(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getUserFavorite(params, token) {
    return this.axios.$get(`/auth/client/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }
  deleteUserFavorite(params, token) {
    return this.axios.delete(`/auth/client/favoriteDelete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }
  orderCheckAuto(payload, token) {
    return this.axios.post(`auth/one_car/order`, qs.stringify(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
