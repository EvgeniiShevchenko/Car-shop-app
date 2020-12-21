<template>
  <v-card outlined>
    <v-img v-if="news.mainImage" :src="news.mainImage" height="200px"></v-img>
    <div v-else class="v-image">
      <img src="~assets/images/news-placeholder.png" alt="news image" />
    </div>
    <div class="px-4 py-5 content">
      <p class="news_date mb-2">
        {{ news.created_at | convertNewsDate }}
      </p>
      <nuxt-link :to="{ name: 'news-id___ru', params: { id: news.alias }, query: $route.query }">
        <v-card-title class="pa-0 mt-2"> {{ news.title }} </v-card-title>
      </nuxt-link>
      <v-card-text class="pa-0 mt-2"> {{ news.preview }} </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'VerticalNews',
  props: {
    news: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  font-family: Rubik;
  font-style: normal;
  max-width: 268px;
  .content {
    min-height: 202px;
    max-height: 202px;
  }
  .v-card__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 110%;
    color: #222329;
    max-height: 58px;
    min-height: 58px;
    -webkit-line-clamp: 3;
    word-break: break-word;
  }
  .v-card__text {
    font-weight: normal;
    font-size: 14px;
    line-height: 125%;
    color: #4a4d5c;
    max-height: 68px;
    min-height: 68px;
    -webkit-line-clamp: 4;
  }
  .v-card__title,
  .v-card__text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  @include tablet {
    width: 100%;
    max-width: 100%;
  }
}
</style>
