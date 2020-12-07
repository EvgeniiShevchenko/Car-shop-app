<template>
  <div class="carousel">
    <v-row justify="space-between">
      <p class="news_date">
        {{ news.created_at | convertDateToFormatDDMMYYYY }}
      </p>
      <div v-if="news.images && news.images.length" class="d-flex arrows">
        <p class="news_date">{{ count + 1 }} из {{ news.images && news.images.length ? news.images.length : 0 }}</p>
        <v-icon @click="count--"> mdi-arrow-left </v-icon>
        <v-icon @click="count++"> mdi-arrow-right </v-icon>
      </div>
    </v-row>
    <v-carousel v-if="news.images && news.images.length" v-model="count" hide-delimiters height="auto">
      <v-carousel-item v-for="(images, i) in news.images" :key="i" :src="images.image"> </v-carousel-item>
    </v-carousel>
    <v-carousel v-else v-model="count" hide-delimiters hide-delimiter-background height="auto">
      <div class="v-image">
        <img src="~assets/images/news-placeholder.png" alt="news image" />
      </div>
    </v-carousel>
  </div>
</template>

<script>
import CarouselSingleLine from '~/components/base/CarouselSingleLine';
export default {
  name: 'NewsCarousel',
  components: { CarouselSingleLine },
  props: {
    news: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      required: false,
    },
  },
  data() {
    return {
      count: 0,
      defaultImages: [{ image: '~assets/images/news-placeholder.png' }],
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  max-width: calc(100vw - 64px);
  @include xs {
    max-width: calc(100vw - 32px);
  }
  .v-image {
    height: 100%;
    img {
      height: 100%;
    }
  }
  .row {
    align-items: center;
    margin: 0 0 16px 0;
    .arrows {
      width: 120px;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
