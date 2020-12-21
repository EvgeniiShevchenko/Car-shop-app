import AdsService from './ads';
import MonitoringService from './monitoring';
import CalculatorService from './calculator';
import CreateAdsService from './create-ads';
import NewsService from './news';
import UserService from './user';
import AuthService from './auth';

export default (context) => {
  return {
    ads: new AdsService(context),
    monitoring: new MonitoringService(context),
    news: new NewsService(context),
    user: new UserService(context),
    calculator: new CalculatorService(context),
    createAds: new CreateAdsService(context),
    auth: new AuthService(context),
  };
};
