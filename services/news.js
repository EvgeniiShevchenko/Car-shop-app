import ApiService from './api';

export default class NewsService extends ApiService {
  getNewsList(params) {
    return this.axios.$get(`/news`, { params });
  }
}
