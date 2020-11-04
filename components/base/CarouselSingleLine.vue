<template>
  <VueSlickCarousel
    :id="originId"
    :class="`carousel ${originId}`"
    ref="carousel"
    :arrows="arrow"
    :swipeToSlide="true"
    :adaptiveHeight="false"
    cssEase="linear"
    :autoplay="false"
    :infinite="false"
    :slidesToShow="showNumber"
    :slidesToScroll="scrollNumber"
    :responsive="config"
    :rows="rows"
    v-if="collection.length"
  >
    <div class="carousel-item" :key="index" v-for="(item, index) in collection">
      <slot name="default" :slot-scope="item"></slot>
    </div>
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

export default {
  name: 'CarouselSingleLine',
  props: {
    collection: {
      type: Array,
      required: true,
    },
    showNumber: {
      type: Number,
      default: 4,
    },
    scrollNumber: {
      type: Number,
      default: 4,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 1,
    },
    originId: {
      type: String,
      default: 'carouselSingleLine',
    },
    config: {
      type: Array,
      default: () => {
        return [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ];
      },
    },
  },
  components: {
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;

  margin: 0 auto;

  .carousel-item {
    height: 100%;
    outline: none;
  }
}
</style>
