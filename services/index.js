import AdsService from './ads';
import MonitoringService from './monitoring';
import NewsService from './news';
import UserService from './user';

export default (context) => {
  return {
    ads: new AdsService(context),
    monitoring: new MonitoringService(context),
    news: new NewsService(context),
    user: new UserService(context),
  };
};
