import AdsService from './ads';
import NewsService from './news';

export default (context) => {
  return {
    ads: new AdsService(context),
    news: new NewsService(context),
  };
};
