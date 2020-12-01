import createServices from '~/services';

export default ({ app }, inject) => {
  inject('services', createServices(app));
};
