export default class ApiService {
  constructor(context) {
    this.context = context;
    this.axios = context.$axios;
  }
}
