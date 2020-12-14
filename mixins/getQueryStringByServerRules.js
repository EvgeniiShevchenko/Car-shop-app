import stringReplaceAll from './stringReplaceAll.js';

export default {
  methods: {
    getQueryStringByServerRules(queryList) {
      let queryString = '';

      const convertArrayToString = (item) => {
        return item[1].map((value) => `${item[0]}[]=${value}`).join('&');
      };

      queryList.forEach((item, index) => {
        queryString += index === 0 ? `?${item[0]}=${item[1]}` : `&${Array.isArray(item[1]) ? convertArrayToString(item) : item[0] + '=' + item[1]}`;
      });

      return stringReplaceAll.methods.stringReplaceAll({ true: '1', false: '0' }, queryString);
    },
  },
};
