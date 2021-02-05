// mixins.js
import Vue from 'vue';
import Component from 'vue-class-component';

export function getCarouselRange(): number {
  return this.$vuetify.breakpoint.xs ? 1 : this.$vuetify.breakpoint.smAndDown ? 2 : 4;
};