import Vue from 'vue';
import moment from 'moment';

Vue.filter('convertDateToFormatMM', (date) => {
  return moment(date).format('M');
});

Vue.filter('convertDateToFormatDDMMYYYY', (date) => {
  console.log('🚀 ~ file: filters.js ~ line 9 ~ Vue.filter ~ date', date);
  return moment(date).format('DD.MM.YYYY');
});

Vue.filter('convertNewsDate', (date) => {
  return moment(date, 'DD.MM.YYYY hh:mm').format('DD.MM.YYYY');
});

Vue.filter('convertEngineCapacity', (value) => {
  value = value / 1000;
  return value.toFixed(1);
});

Vue.filter('beforeNowInPastFromDate', (date) => {
  moment.updateLocale('ru', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: 'сикунду спустя',
      ss: '%d сикунд спустя',
      m: 'минуту назад',
      mm: '%d минут назад',
      h: 'час назад',
      hh: '%d часов назад',
      d: 'вчера',
      dd: '%d дней назад',
      w: 'неделя назад',
      ww: '%d недель назад',
      M: 'месяц назад',
      MM: '%d месяцев назад',
      y: 'год назад',
      yy: '%d год назад',
    },
  });

  return moment(date).fromNow();
});

Vue.filter('cropFloatNumber', (floatNumber, croppedNumber = 2) => {
  return Number(floatNumber).toFixed(croppedNumber);
});

Vue.filter('getCurrentDateByFormat', (format = 'DD.MM.YYYY') => {
  return moment().format(format);
});
