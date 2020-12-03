import AdsService from './ads';
import NewsService from './news';
import UserService from './user';

export default (context) => {
  return {
    ads: new AdsService(context),
    news: new NewsService(context),
    user: new UserService(context),
  };
};
