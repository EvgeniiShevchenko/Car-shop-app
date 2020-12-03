import AdsService from './ads';
import MonitoringService from './monitoring';

export default (context) => {
  return {
    ads: new AdsService(context),
    monitoring: new MonitoringService(context),
  };
};
