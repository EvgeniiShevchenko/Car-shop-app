import ApiService from './api';

export default class AuthService extends ApiService {
  getRegistrationToken(serverData) {
    return this.axios.$post(`auth/register`, serverData);
  }

  getUserRole() {
    return this.axios.$get(`auth/type_user`);
  }

  recoveryPassword(body) {
    return this.axios.$post(`auth/password/email`, body);
  }

  getLoginToken(body) {
    return this.axios.$post(`auth/login`, body);
  }

  setNewPassword(body) {
    return this.axios.$post(`auth/password/reset`, body);
  }
}
