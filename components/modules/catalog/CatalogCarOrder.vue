<template>
  <div class="order-car">
    <h1 class="order-title">Авто под заказ</h1>
    <CarouselSingleLine class="carousel-wrapper" originId="catalog-order" :config="carouselConfig" :collection="collection">
      <template slot="default" slot-scope="{ slotScope }">
        <n-link class="news-list-item" :to="`/news/${slotScope.alias}`">
          <span class="item-preview" :style="`background: ${!!slotScope.mainImage ? 'url(' + slotScope.mainImage + ') no-repeat center / cover' : ''}`"></span>
          <div class="content-wrapper">
            <VClamp class="content-title" autoresize :max-lines="1" tag="h3">
              {{ slotScope.name }}
            </VClamp>
            <div class="content">
              <p class="content-price">$ 21 000</p>
              <div class="stats-wrapper">
                <svg class="content-icon">
                  <use xlink:href="~assets/images/sprites/main.svg#icon-speedometer" />
                </svg>
                <p class="content-label">{{ slotScope.mileage }} км</p>
              </div>
            </div>
          </div>
        </n-link>
      </template>
    </CarouselSingleLine>
    <CarouselPaginationBar
      class="pagination-wrapper"
      :isDisabledPrev="page === 1"
      :isDisabledNext="collection.length === amountShownNews"
      @go-next="goToTheNext"
      @go-prev="goToThePrevious"
      v-if="collection.length"
    >
      <p class="pagination-title">{{ amountShownNews }} из {{ collection.length }}</p>
    </CarouselPaginationBar>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
// components
import CarouselSingleLine from '~/components/base/CarouselSingleLine.vue';
import CarouselPaginationBar from '~/components/base/CarouselPaginationBar.vue';
// mixins
import getCarouselRange from '~/mixins/getCarouselRange.js';

export default {
  name: 'CatalogCarOrder',
  mixins: [getCarouselRange],
  data() {
    return {
      page: 1,
      range: 4,
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
      return this.collection.length % this.range === 0 ? this.page * this.range : this.page * this.range >= this.collection.length ? this.collection.length : this.range;
    },
  },
  methods: {
    goToTheNext() {
      document.querySelector('.catalog-order').__vue__.next();

      this.page = this.page * this.range >= this.collection.length ? this.page : this.page + 1;
    },

    goToThePrevious() {
      document.querySelector('.catalog-order').__vue__.prev();

      this.page = this.page - 1 !== 0 ? this.page - 1 : 1;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.range = this.getCarouselRange();
    });
  },
  props: {
    collection: {
      type: Array,
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
.order-car {
  position: relative;

  .order-title {
    margin-bottom: 32px;

    font-size: 32px;
    font-weight: 500;
    line-height: 35px;
    color: #222329;
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
      display: flex;
      flex-direction: column;

      font-size: 18px;
      font-weight: 500;
      line-height: 20px;
      color: #222329;

      &:hover .content-wrapper .content-title {
        color: #1768ac;
      }

      .item-preview {
        width: 100%;

        background: url('~assets/images/image-empty-car.png') no-repeat;
        background-size: cover;
        background-position: 50% 50%;

        &::before {
          display: block;
          content: '';
          padding-top: 56.25%;
          width: 100%;
        }
      }

      .content-wrapper {
        padding: 20px 16px;
        border-radius: 0 0 6px 6px;
        border: 1px solid #d6e1e7;
        border-top: none;

        .content-title {
          font-size: 18px;
          font-weight: 500;
          line-height: 20px;
          color: #4a4d5c;
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-top: 12px;

          .content-price {
            margin-bottom: 0;

            font-weight: 500;
            font-size: 20px;
            line-height: 22px;
            color: #4cad33;
          }

          .stats-wrapper {
            display: flex;
            align-items: center;

            .content-icon {
              width: 18px;
              height: 14px;
            }

            .content-label {
              margin-left: 8px;
              margin-bottom: 0;

              font-size: 14px;
              line-height: 17px;
              color: #4a4d5c;
            }
          }
        }
      }
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
  .order-car .pagination-wrapper {
    top: 42px;
  }
}
</style>
