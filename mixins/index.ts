import { Component, Vue } from 'vue-property-decorator';

@Component
class MyMixin extends Vue {
  $vuetify: any;

  getCarouselRange(): number {
    return this.$vuetify.breakpoint.xs ? 1 : this.$vuetify?.breakpoint.smAndDown ? 2 : 4;
  }
}

export default { MyMixin };
