<template>
  <section class="news">
    <h2 class="news-title">Новости</h2>
    <ul class="news-category-list">
      <li class="category-list-item" :key="index" v-for="(item, index) in category">
        <button :class="`category-btn ${selectCategory === item.id ? 'is-selected' : ''} ${category.length - 1 === index ? 'is-border-radius-right' : ''}`" @click="selectNewsCategory(item)">
          {{ item.value }}
        </button>
      </li>
      <li class="category-list-item empty"></li>
      <li class="category-list-item empty"></li>
    </ul>
    <CarouselSingleLine class="carousel-wrapper" originId="main-news" :key="reloadSlider" :config="carouselConfig" :collection="newsCollection" lazyLoad="ondemand">
      <template slot="default" slot-scope="{ slotScope: item }">
        <n-link class="news-list-item" :to="`/news/${item.slug}`">
          <img class="item-preview" :src="item.image" alt="" />
          <time class="date-publication">{{ item.created_at }}</time>
          <VClamp autoresize :max-lines="2" tag="span">
            {{ item.name }}
          </VClamp>
        </n-link>
      </template>
    </CarouselSingleLine>
    <n-link to="news/">
      <button class="news-btn">
        Перейти в раздел новостей
        <svg class="news-btn-icon">
          <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
        </svg>
      </button>
    </n-link>
    <CarouselPaginationBar
      class="pagination-wrapper"
      :isDisabledPrev="page === 1"
      :isDisabledNext="newsCollection.length === amountShownNews"
      @go-next="goToTheNext"
      @go-prev="goToThePrevious"
      v-if="newsCollection.length"
    >
      <p class="pagination-title">{{ amountShownNews }} из {{ newsCollection.length }}</p>
    </CarouselPaginationBar>
  </section>
</template>

<script>
import VClamp from 'vue-clamp';
import { mapState } from 'vuex';
// components
import CarouselSingleLine from '~/components/base/CarouselSingleLine.vue';
import CarouselPaginationBar from '~/components/base/CarouselPaginationBar.vue';

export default {
  name: 'MainNews',
  data() {
    return {
      category: [],
      newsCollection: [],
      selectCategory: '',
      reloadSlider: false,
      page: 1,
      range: 4,
      newsByDefault: 1,
      carouselConfig: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  },
  computed: {
    amountShownNews() {
      return this.newsCollection.length % this.range === 0 ? this.page * this.range : this.page * this.range >= this.newsCollection.length ? this.newsCollection.length : this.range;
    },

    ...mapState({ locales: (state) => state.locales }),
  },
  methods: {
    goToTheNext() {
      document.querySelector('.main-news').__vue__.next();

      this.page = this.page * this.range >= this.newsCollection.length ? this.page : this.page + 1;
    },

    goToThePrevious() {
      document.querySelector('.main-news').__vue__.prev();

      this.page = this.page - 1 !== 0 ? this.page - 1 : 1;
    },

    async selectNewsCategory({ id }) {
      try {
        const { data } = await this.$axios.$get(`/api/main/getNewsHome?tag_id=${id}`, { method: 'GET' });

        this.newsCollection = data.data;
        this.selectCategory = id;
        this.page = 1;
        this.reloadSlider = !this.reloadSlider;
      } catch (error) {
        console.error(error);
      }
    },

    defineCarouselRange() {
      this.range = this.$vuetify.breakpoint.xs ? 1 : this.$vuetify.breakpoint.smAndDown ? 2 : 4;
    },
  },
  async mounted() {
    const { news_tags } = this.mainData;

    this.$nextTick(() => {
      this.defineCarouselRange();
    });

    this.selectCategory = this.newsByDefault;
    this.category = news_tags.tags[0].map((item) => {
      return {
        id: item.id,
        value: item.name[this.locales],
      };
    });

    try {
      (async () => {
        const { data } = await this.$axios.$get(`/api/main/getNewsHome?tag_id=${this.newsByDefault}`, { method: 'GET' });

        this.newsCollection = data.data;
      })();
    } catch (error) {
      console.error(error);
    }
  },
  props: {
    mainData: {
      type: Object,
      required: true,
    },
  },
  components: {
    CarouselSingleLine,
    CarouselPaginationBar,
    VClamp,
  },
};
</script>

<style lang="scss" scoped>
.news {
  position: relative;
  margin-bottom: 72px;

  width: 100%;
  .news-title {
    margin-bottom: 42px;

    font-size: 32px;
    font-weight: 500;
    line-height: 35px;
    color: #222329;
  }

  .news-category-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;

    background: #f2f7fa;

    & li:first-child {
      .category-btn {
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
      }
    }

    .category-list-item {
      .category-btn {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding: 0 30px;

        height: 38px;

        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        color: #4a4d5c;

        &:hover {
          background: #1768ac;
          color: #ffffff;
        }
      }

      .is-selected {
        background: #1768ac;
        color: #ffffff;

        &:hover {
          background: #0e4c80;
        }
      }
    }

    .is-border-radius-right {
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  .carousel-wrapper {
    margin-bottom: 32px;
    overflow: hidden;

    ::v-deep .slick-list {
      margin: 0 -16px;

      .slick-slide {
        padding: 0 16px;
      }
    }

    .news-list-item {
      font-size: 18px;
      font-weight: 500;
      line-height: 20px;
      color: #222329;

      &:hover {
        color: #1768ac;
      }

      .item-preview {
        width: 100%;
      }

      .date-publication {
        display: inline-block;

        margin-bottom: 8px;

        width: 100%;

        font-size: 13px;
        line-height: 16px;
        color: #70848e;
      }
    }
  }

  .news-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 281px;
    width: 100%;
    height: 44px;

    padding: 14.5px 20px;

    border-radius: 2px;
    border: 1px solid #4a4d5c;

    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
    color: #4a4d5c;

    &:hover {
      background: #f2f7fa;
    }

    .news-btn-icon {
      margin-left: 18px;
      width: 12px;
      height: 8px;
      transform: rotate(-90deg);
      fill: #4a4d5c;
    }
  }

  .pagination-wrapper {
    position: absolute;
    display: flex;
    align-items: center;

    top: 8px;
    right: 5px;

    .pagination-title {
      margin-bottom: 0;

      font-size: 14px;
      line-height: 18px;
      color: #70848e;
    }
  }
}

@include desktop {
  .news .news-category-list .category-list-item {
    margin-bottom: 10px;
  }
}

@include xs {
  .news {
    .news-title {
      font-size: 30px;
      line-height: 33px;
    }

    .news-category-list {
      background: #f2f7fa;

      .category-list-item {
        flex: 1;
        min-width: max-content;

        .category-btn {
          padding: 0 10px;
        }
      }
    }

    .pagination-wrapper {
      flex-direction: column;
      top: 0;

      ::v-deep .pagination {
        margin: 0;
      }
    }
  }
}
</style>
