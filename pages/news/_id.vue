<template>
  <main class="main container">
    <h1 class="mt-3">{{ currentNews.title }}</h1>
    <div class="outer-wrap d-flex">
      <div>
        <news-carousel :news="currentNews" />
        <div v-html="currentNews.text_first" class="mt-6 news_content"></div>
        <div v-if="currentNews.quote" class="outer-wrap-another_news">
          <div class="outer-wrap-another_news-container d-flex">
            <nuxt-link :to="{ name: 'news-id___ru', params: { id: currentNews.quote.alias }, query: $route.query }">
              <h4 class="mx-4">{{ currentNews.quote.title }}</h4>
            </nuxt-link>
            <div>
              <img v-if="currentNews.quote.image" :src="currentNews.quote.image" alt="news image" />
              <img v-else src="" alt="news image" />
            </div>
          </div>
        </div>
        <div v-html="currentNews.text_second" class="mt-6 news_content"></div>
        <to-share-block class="share_wrapper" />
        <horizontal-banner class="horizontal_banner" />
      </div>
      <div class="share_banner">
        <to-share-block />
        <vertical-banner class="vertical_banner" />
      </div>
    </div>
    <div class="outer-wrap-interested_news">
      <h2>Вам будет интересно</h2>
      <div class="d-flex">
        <vertical-news class="outer-wrap-interested_news-item mx-0" v-for="news of interestingNews" :key="news.alias" :news="news" />
      </div>
    </div>
  </main>
</template>

<script>
//Components
import NewsCarousel from '@/components/modules/news/NewsCarousel';
import VerticalBanner from '@/components/modules/banners/VerticalBanner';
import ToShareBlock from '@/components/base/ToShareBlock';
import HorizontalBanner from '@/components/modules/banners/HorizontalBanner';
import VerticalNews from '@/components/modules/news/VerticalNews';

export default {
  name: 'NewsItem',
  components: { NewsCarousel, VerticalBanner, ToShareBlock, HorizontalBanner, VerticalNews },
  data() {
    return {
      currentNews: {},
      interestingNews: [],
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    async getNews() {
      try {
        const data = (await this.$services.news.GetNewsBySlug(this.$route.params.id)).data;
        this.currentNews = data.new;
        this.interestingNews = data.interesting.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.outer-wrap {
  margin-top: 50px;
  .share_wrapper {
    display: none;
    @include desktop {
      display: block;
      margin: 56px auto;
      .v-responsive__content {
        width: auto;
      }
    }
  }
  &-interested_news {
    margin-top: 52px;
    & > div {
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }
    &-item {
      margin: 16px 0;
    }
    h2 {
      color: #222329;
    }
  }
  &-another_news {
    padding: 20px;
    &-container {
      border-left: 3px solid #79ca64;
      align-items: center;
      @include xs {
        flex-direction: column;
      }
      div {
        min-width: 127px;
        width: 127px;
        height: 80px;
        @include xs {
          margin-top: 12px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .horizontal_banner {
    margin-top: 56px;
  }
  .share_banner {
    margin: 40px 0 0 32px;
    @include desktop {
      display: none;
    }
    .vertical_banner {
      margin: 36px auto;
    }
  }
}
::v-deep .news_content ul {
  li {
    list-style-type: disc;
  }
  li::marker {
    color: #79ca64;
  }
}
</style>
