<template>
  <section class="news">
    <h2 class="news-title">Новости</h2>
    <ul class="news-category-list">
      <li class="category-list-item" :key="index" v-for="(item, index) in category">
        <button :class="`category-btn ${selectCategory === item ? 'is-selected' : ''}`" @click="selectNewsCategory(item)">{{ item }}</button>
      </li>
      <li class="category-list-item empty"></li>
      <li class="category-list-item empty"></li>
    </ul>
    <CarouselSingleLine class="carousel-wrapper" :config="carouselConfig" :collection="newsCollection">
      <template slot="default" slot-scope="{ slotScope: item }">
        <n-link class="news-list-item" :to="`/news/${item}`">
          <img class="item-preview" src="~/assets/images/news-item-img.png" alt="" />
          <time class="date-publication">24.08.2020</time>
          Бизнес-пауза? Новый коммерческий транспорт стали реже покупать
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
import axios from 'axios';
// components
import CarouselSingleLine from '~/components/base/CarouselSingleLine.vue';
import CarouselPaginationBar from '~/components/base/CarouselPaginationBar.vue';

export default {
  name: 'MainNews',
  data() {
    return {
      category: ['Авомобильные новости', 'Тест-драйвы', 'Журнал', 'Как подготовить авто к зиме', 'Акции', 'Обзоры'],
      newsCollection: ['1', '2', '3', '4', '5', '6'],
      selectCategory: '',
      page: 1,
      range: 0,
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
  },
  methods: {
    goToTheNext() {
      this.$children[0].$refs.carousel.next();

      this.page = this.page * this.range >= this.newsCollection.length ? this.page : this.page + 1;
    },

    goToThePrevious() {
      this.$children[0].$refs.carousel.prev();

      this.page = this.page - 1 !== 0 ? this.page - 1 : 1;
    },

    async selectNewsCategory(category) {
      try {
        // const getNews = await axios.get('api/news', {method: 'GET'});

        this.selectCategory = category;
      } catch (error) {
        console.error(error);
      }
    },

    defineCarouselRange() {
      console.log(this.$vuetify.breakpoint.xs);
      this.range = this.$vuetify.breakpoint.xs ? 1 : this.$vuetify.breakpoint.smAndDown ? 2 : 4;
    },
  },
  async mounted() {
    try {
      // const getCategoryList = await axios.get('api/news/categories', {method: 'GET'});
      // const getNews = await axios.get('api/news', {method: 'GET'});
      // this.range = 4;
      this.$nextTick(() => {
        this.defineCarouselRange();
      });

      this.selectCategory = 'Авомобильные новости';
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    CarouselSingleLine,
    CarouselPaginationBar,
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

    .category-list-item {
      .category-btn {
        padding: 10px 30px;

        font-size: 16px;
        font-weight: 500;
        line-height: 18px;

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
    align-items: center;

    padding: 14.5px 20px;

    border-radius: 2px;
    border: 1px solid #4a4d5c;

    font-size: 15px;
    font-weight: 500;
    line-height: 15px;

    &:hover {
      background: #f2f7fa;
    }

    .news-btn-icon {
      margin-left: 18px;
      width: 12px;
      height: 8px;
      transform: rotate(-90deg);
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

@include xs {
  .news {
    .news-category-list {
      background: #f2f7fa;

      .category-list-item {
        flex: 1;
        min-width: max-content;

        .category-btn {
          width: 100%;
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
