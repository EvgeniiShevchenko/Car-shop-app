<template>
  <main class="auto container">
    <BreadCrumbs :collection="getRouteHistory" v-if="$vuetify.breakpoint.mdAndUp" />
    <h1 class="auto-title">{{ collection.name }}</h1>
    <div class="auto-preview row no-gutters">
      <div class="preview-content-wrapper col-md-6 pr-md-4">
        <div class="carousel">
          <CarouselSingleLine :collection="collection.images" :showNumber="1" :scrollNumber="1" originId="auto-carousel">
            <template slot="default" slot-scope="{ slotScope }">
              <div class="carousel-preview-wrapper" :style="`background:  url(${slotScope.image}) no-repeat center / cover`"></div>
            </template>
          </CarouselSingleLine>
          <button class="prev-btn" type="button" @click="prevSlide"></button>
          <button class="next-btn" type="button" @click="nextSlide"></button>
        </div>
        <div class="preview-content">
          <ul :class="`preview-content-list ${!isShowCarouselList && $vuetify.breakpoint.xs ? 'is-shrink-hight' : ''}`">
            <li
              :class="`preview-list-item ${index > 3 && !isShowCarouselList ? 'is-hide-item' : $vuetify.breakpoint.smAndDown && !isShowCarouselList ? 'is-hide-item' : ''}`"
              :key="index"
              v-for="(item, index) in collection.images"
              @click="handlerSlideSelect(index)"
            >
              <img class="preview-item-icon" :src="item.image" alt="Auto image" />
            </li>
            <li class="preview-list-item is-show-more">
              <button class="preview-content-btn" type="button" @click="showMore">
                {{ getAmountRestSlides && !isShowCarouselList ? `Еще ${getAmountRestSlides} фото` : getAmountRestSlides && isShowCarouselList ? 'Меньше фото' : '' }}
              </button>
            </li>
          </ul>
        </div>
        <div class="google-advertising" v-if="$vuetify.breakpoint.mdAndUp"></div>
      </div>
      <CarPreviewStats class="col-md-6 pl-md-4" :collection="collection" />
      <div class="content-wrapper">
        <nav class="content-navigation-bar">
          <ul class="content-bar-list">
            <li class="bar-list-item" :key="index" v-for="(item, index) in contentNavigationList">
              <button :class="`bar-item-btn ${activeTabId === item.id ? 'is-tab-select' : ''}`" :id="item.anchor" type="button" @click="selectTab(item.id)">{{ item.name }}</button>
            </li>
          </ul>
        </nav>
        <CarDetail v-if="activeTabId === 1" :collection="collection" />
      </div>
      <div class="body-advertising offset-1 col-10 offset-1"></div>
      <AdsCardsList class="similar-ads" title="Похожие объявления" :collection="similarList" />
    </div>
  </main>
</template>

<script>
// components
import CarouselSingleLine from '~/components/base/CarouselSingleLine.vue';
import AdsCardsList from '~/components/base/AdsCardsList.vue';
import BreadCrumbs from '~/components/base/BreadCrumbs.vue';
import CarDetail from '~/components/modules/car/CarDetail.vue';
import CarPreviewStats from '~/components/modules/car/CarPreviewStats.vue';
// mixins
import getStatusName from '~/mixins/getStatusName.js';

export default {
  name: 'Auto',
  mixins: [getStatusName],
  data() {
    return {
      tagsList: ['Легковые', 'Первая регистрация'],
      contentNavigationList: [
        { name: 'Описание', id: 1, anchor: `nav_${1}` },
        { name: 'Отзывы', id: 2, anchor: `nav_${2}` },
        { name: 'Обмен', id: 3, anchor: `nav_${3}` },
        { name: 'Пожаловаться', id: 4, anchor: `nav_${4}` },
      ],
      activeTabId: 1,
      isShowCarouselList: false,
      amountSlidesShow: 4,
      similarList: [],
    };
  },
  computed: {
    getAmountRestSlides() {
      if (this.$vuetify.breakpoint.smAndDown) return this.collection.images.length;

      return Object.keys(this.collection).length && this.collection.images.length > this.amountSlidesShow ? this.collection.images.length - this.amountSlidesShow : 0;
    },

    getRouteHistory() {
      const { path, params } = this.$route;
      const routeList = [
        { path: `/catalog?status=${this.collection.user.active_status}`, name: this.getStatusName(this.collection.user.active_status) },
        { path: path, name: params.id },
      ];

      return routeList;
    },
  },
  methods: {
    handlerSlideSelect(slideId) {
      document.querySelector('.auto-carousel').__vue__.goTo(slideId);
    },

    selectTab(tabId) {
      this.activeTabId = tabId;
    },

    prevSlide() {
      document.querySelector('.auto-carousel').__vue__.prev();
    },

    nextSlide() {
      document.querySelector('.auto-carousel').__vue__.next();
    },

    showMore() {
      this.isShowCarouselList = !this.isShowCarouselList;
    },
  },
  mounted() {
    this.getRouteHistory;
    this.similarList = [...Array(8).keys()].map((item) => this.collection.similar[0]);
  },
  async asyncData({ params, $axios }) {
    try {
      const { data } = await $axios.$get(`auth/one_car/products/${params.id}`, { method: 'GET' });
      const { product } = data;

      return { collection: { ...product } };
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    CarouselSingleLine,
    AdsCardsList,
    CarDetail,
    CarPreviewStats,
    BreadCrumbs,
  },
};
</script>

<style lang="scss" scoped>
.auto {
  @include init-font;
  margin: 0 auto;
  padding-top: 24px;

  width: 100%;

  .auto-title {
    margin-top: 24px;

    font-size: 32px;
    font-weight: 500;
    line-height: 35px;
    color: #222329;
  }

  .auto-preview {
    margin-top: 32px;

    .preview-content-wrapper {
      .carousel {
        position: relative;

        .prev-btn {
          display: block;
          position: absolute;

          padding: 20px 10px;
          top: 50%;
          left: 0;

          border-radius: 0 5px 5px 0;
          background: rgba(0, 0, 0, 0.25);

          line-height: 23px;
          box-shadow: inset 0 0 0 1px #fff;
          transform: translateY(-50%);
          transition: background 0.5s ease;
          z-index: 2;

          &:hover {
            background: rgba(0, 0, 0, 0.5);
          }

          &::before {
            content: '‹';
            display: inline-block;
            vertical-align: top;
            min-height: 25px;
            font-size: 40px;
            color: #fff;
          }
        }

        .next-btn {
          @extend .prev-btn;

          right: 0;
          left: auto;
          border-radius: 5px 0 0 5px;

          &::before {
            content: '›';
          }
        }

        .carousel-preview-wrapper {
          &::before {
            display: block;
            content: '';

            width: 100%;
            padding-top: 67%;
          }
        }
      }

      .preview-content {
        margin-top: 12px;

        .preview-content-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(60px, 98px));
          grid-template-rows: 67px;
          gap: 12px;

          .preview-list-item {
            cursor: pointer;

            .preview-item-icon {
              width: 100%;
              height: 100%;
            }
          }

          .is-hide-item {
            display: none;
          }

          .is-show-item {
            display: block;
          }

          .is-show-more {
            display: flex;
            align-items: center;
            justify-content: center;

            margin-left: 17px;

            .preview-content-btn {
              white-space: nowrap;
              border-bottom: 0.7px dashed #70848e;

              font-size: 14px;
              line-height: 17px;
              color: #70848e;
            }
          }
        }

        .is-shrink-hight {
          grid-template-rows: 1fr;
        }
      }

      .google-advertising {
        margin: 18px 65px 0 65px;

        height: 60px;
        background: #d3d3d3;
      }
    }

    .content-wrapper {
      margin-top: 44px;
      width: 100%;

      .content-navigation-bar {
        background: #f2f7fa;

        .content-bar-list {
          display: flex;
          margin-bottom: 24px;

          .bar-list-item {
            .bar-item-btn {
              display: flex;
              align-items: center;
              justify-content: center;

              padding: 0 30px;

              height: 38px;

              font-size: 16px;
              font-weight: 500;
              line-height: 18px;
              color: #4a4d5c;

              transition: background 0.5s ease;

              &:hover {
                background: #1768ac;
                color: #ffffff;
              }
            }

            .is-tab-select {
              background: #1768ac;
              color: #ffffff;

              &:hover {
                background: #0e4c80;
              }
            }
          }
        }
      }
    }

    .body-advertising {
      margin-top: 56px;
      height: 90px;
      background: #d3d3d3;
    }

    .similar-ads {
      margin-top: 56px;
      width: 100%;
    }
  }
}

@include sm {
  .auto .auto-preview {
    .preview-content-wrapper .preview-content .preview-content-list .is-show-more {
      margin-left: 0;
      justify-content: flex-start;
    }
  }
}

@include xs {
  .auto {
    .auto-title {
      margin-top: 0;

      font-size: 22px;
      line-height: 24px;
    }

    .auto-preview {
      margin-top: 16px;

      .preview-content-wrapper .preview-content .preview-content-list {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }

      .content-wrapper {
        margin-top: 20px;

        .content-navigation-bar .content-bar-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          grid-template-rows: 36px;
          margin-bottom: 16px;

          .bar-list-item .bar-item-btn {
            padding: 0;
            width: 100%;
          }
        }
      }

      .similar-ads {
        padding-bottom: 20px;

        ::v-deep .card-title {
          margin-bottom: 20px;

          font-size: 22px;
          line-height: 24px;
        }

        ::v-deep .card-list {
          gap: 16px;
          margin-bottom: 20px;

          .card-list-item {
            position: relative;
            flex-direction: column;
            max-height: max-content;
            height: 100%;

            .preview-wrapper {
              position: relative;
              max-width: 100%;

              border-radius: 4px 4px 0 0;

              &::before {
                display: block;
                content: '';

                /*Aspect ratio 16:9 */
                padding-top: 77%;
                width: 100%;
              }
            }

            .general {
              position: initial;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;

              border-radius: 0 4px 4px 4px;
              border-left: 1px solid #b1c4cd;
              border-top: 0;

              .vin {
                left: auto;
                right: 8px;
              }
            }
          }
        }
      }

      .body-advertising {
        margin-top: 20px;
      }

      .similar-ads {
        margin-top: 20px;
      }
    }
  }
}
</style>
