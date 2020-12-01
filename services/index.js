import AdsService from './ads';

export default (context) => {
  return {
    ads: new AdsService(context),
  };
};
