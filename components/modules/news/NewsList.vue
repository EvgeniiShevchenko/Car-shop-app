<template>
  <div class="d-flex wrap news_list">
    <div v-for="(news, index) of list" :key="index" :class="news === 'banner' ? 'full_width news_list-item' : 'news_list-item'">
      <horizontal-news v-if="index < 4 && news !== 'banner'" :news="news" />
      <vertical-news v-if="index > 4 && news !== 'banner'" :news="news" />
      <horizontal-banner v-if="news === 'banner'" />
    </div>
  </div>
</template>

<script>
//Components
import HorizontalNews from './HorizontalNews';
import VerticalNews from './VerticalNews';
import HorizontalBanner from '../banners/HorizontalBanner';

export default {
  name: 'NewsList',
  components: { VerticalNews, HorizontalNews, HorizontalBanner },
  props: {
    list: {
      type: Array,
      default: () => {
        [];
      },
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.news_list {
  font-family: Rubik;
  font-style: normal;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    margin: 16px 0;
  }
  .full_width {
    width: 100%;
    margin: 40px 0;
  }
  @include tablet {
    .news_list-item {
      width: 100%;
    }
  }
}
</style>
