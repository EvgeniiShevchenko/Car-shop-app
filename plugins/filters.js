import Vue from 'vue';
import moment from 'moment';

Vue.filter('convertDateToFormatMM', (date) => {
  return moment(date).format('M');
});

Vue.filter('convertDateToFormatDDMMYYYY', (date) => {
  return moment(date).format('DD.MM.YYYY');
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
