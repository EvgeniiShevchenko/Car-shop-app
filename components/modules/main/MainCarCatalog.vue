<template>
  <div class="catalog-wrapper row no-gutters">
    <section :class="`catalog row no-gutters col-md-12 col-lg-10 ${$vuetify.breakpoint.mdAndDown ? 'is-margin-72' : ''}`">
      <div class="catalog-box">
        <h3 class="catalog-title">Каталог автомобилей</h3>
        <SelectBtn class="catalog-options" :options="transportType" label="выбрать тип" :payload="true" @change="selectOptions($event)" v-if="$vuetify.breakpoint.smAndDown" />
      </div>
      <div class="sidebar-list-wrapper">
        <ul class="catalog-sidebar-list">
          <li class="sidebar-list-item" :key="index" v-for="(item, index) in transportType" @click="selectOptions(item)">
            <img class="sidebar-link-icon" :src="`${!!item.icon ? item.icon : require('~/assets/images/main-transport-type.png')}`" alt="Transport icon" />
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div class="sort-marks">
        <div class="sort" ref="sort">
          <h3 class="sort-marks-title">Быстрая сортировка марок</h3>
          <ul :class="`sort-marks-list ${cyrillicList.length ? 'is-margin-10' : ''}`" ref="firstMarksList" v-if="latinlList.length">
            <li class="sort-list-item" :key="index" v-for="(item, index) in latinlList">
              <button :class="`sort-item-btn ${activeSortTab === item ? 'is-select' : ''}`" type="button" @click="handlerSortSelect(item)">{{ item }}</button>
            </li>
          </ul>
          <ul class="sort-marks-list" ref="secondMarksList" v-if="cyrillicList.length">
            <li class="sort-list-item" :key="index" v-for="(item, index) in cyrillicList">
              <button :class="`sort-item-btn ${activeSortTab === item ? 'is-select' : ''}`" type="button" @click="handlerSortSelect(item)">{{ item }}</button>
            </li>
          </ul>
          <div class="carousel-pagination-wrapper" v-if="carBrandList.length > shownQuantity">
            <CarouselPaginationBar
              class="carosel-navigation-bar"
              @go-next="goToNext"
              :isDisabledPrev="page === 1"
              :isDisabledNext="carBrandList.length === amountShownLogo"
              @go-prev="goToPrev"
              v-if="carBrandList.length"
            >
              <p class="pagination-title">{{ amountShownLogo }} из {{ carBrandList.length }}</p>
            </CarouselPaginationBar>
          </div>
          <input class="sort-field" :value="searchValue" type="text" disabled />
        </div>
        <div class="carousel-wrapper" ref="slider">
          <CarouselSingleLine originId="main-catalog" :collection="carBrandList" :showNumber="range" :scrollNumber="range" :rows="2" :config="carouselConfig" :arrow="false">
            <template slot="default" slot-scope="{ slotScope }">
              <div class="carousel-item-wrapper">
                <div class="sort-preview-link" @click="selectBrend(slotScope)">
                  <img class="preview-item-icon" :src="`${!!slotScope.meta.icon ? slotScope.meta.icon : require('~/assets/images/car-logo.png')}`" alt="Car logotype" />
                  <p class="preview-item-text" :alt="slotScope.name">{{ slotScope.name }}</p>
                </div>
              </div>
            </template>
          </CarouselSingleLine>
        </div>
      </div>
    </section>
    <div class="catalog-advertising col-md-12 col-lg-2"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
// components
import CarouselSingleLine from '~/components/base/CarouselSingleLine.vue';
import CarouselPaginationBar from '~/components/base/CarouselPaginationBar.vue';
import SelectBtn from '~/components/base/SelectBtn.vue';

export default {
  name: 'MainCarCatalog',
  data() {
    return {
      transportType: ['Новые автомобили', 'Б/у автомобили', 'Мотоциклы', 'Грузовые автомобили', 'Прицепы', 'Спецтехника', 'Сельхозтехника', 'Автобусы', 'Водный транспорт'],
      latinlList: [],
      cyrillicList: [],
      carBrandList: [],
      activeSortTab: '',
      searchValue: '',
      columnWidth: 36,
      gap: 12,
      isSidebar: false,
      page: 1,
      range: 5,
      shownQuantity: 10,
      containerWidth: 0,
      carouselConfig: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
  },
  computed: {
    amountShownLogo() {
      return this.carBrandList.length % this.shownQuantity === 0
        ? this.page * this.shownQuantity
        : this.page * this.shownQuantity > this.carBrandList.length
        ? this.carBrandList.length
        : this.page * this.shownQuantity;
    },

    ...mapState({ locales: (state) => state.locales }),
  },
  methods: {
    selectBrend(brand) {
      this.setBrand(brand.name);
      this.$router.push({ path: `catalog/` });
    },

    selectOptions(type) {
      this.setType(type.value);
      this.$router.push({ path: `catalog/` });
    },

    defineCarouselRange() {
      this.shownQuantity = this.$vuetify.breakpoint.xs ? 4 : 10;
    },

    goToNext() {
      document.querySelector('.main-catalog').__vue__.next();

      this.page = this.page * this.shownQuantity >= this.carBrandList.length ? this.page : this.page + 1;
    },

    goToPrev() {
      document.querySelector('.main-catalog').__vue__.prev();

      this.page = this.page - 1 !== 0 ? this.page - 1 : 1;
    },

    setAmountSortColumns() {
      const container = this.$refs.firstMarksList;
      const width = Number(container.offsetWidth);
      const columnAmount = Math.ceil((width - 15) / (this.columnWidth + this.gap));

      container.style.gridTemplateColumns = `repeat(${columnAmount}, 1fr)`;
      this.$refs.secondMarksList.style.gridTemplateColumns = `repeat(${columnAmount}, 1fr)`;
    },

    findCarouselWidth() {
      const targetElement = this.$refs.sort;
      const width = targetElement.offsetWidth;

      this.$refs.slider.style.width = width + 'px';
    },

    async handlerSortSelect(sortKey) {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/main/searchMark?search=${sortKey}`, { method: 'GET' });

        this.carBrandList = data.data.marks;
        this.activeSortTab = sortKey;
        this.searchValue = sortKey;
      } catch (error) {
        console.error(error);
      }
    },

    ...mapActions({ setType: 'main/setFilterType', setBrand: 'main/setFilterBrand' }),
  },
  async mounted() {
    window.addEventListener('resize', () => {
      this.setAmountSortColumns();
      this.findCarouselWidth();
    });

    try {
      await (async () => {
        const { data } = await axios.get(`http://localhost:8000/api/main`, { method: 'GET' });

        this.transportType = data.data.types.map((item) => {
          const getTranslationsType = item.translations.find((item) => item.locale === this.locales);

          return {
            text: getTranslationsType.name,
            value: getTranslationsType.id,
            meta: item,
          };
        });
      })();

      await (async () => {
        const { data } = await axios.get('http://localhost:8000/api/main', { method: 'GET' });

        this.latinlList = data.data.liters;
        this.activeSortTab = this.latinlList[0];
        this.searchValue = this.latinlList[0];

        this.cyrillicList = ['А', 'В', 'С', 'Д', 'Е', 'Ф', 'Г', 'Н', 'И', 'З', 'К'];
      })();

      await (async () => {
        const { data } = await axios.get(`http://localhost:8000/api/main/searchMark?search=${this.activeSortTab}`, { method: 'GET' });

        this.carBrandList = data.data.marks.map((item) => {
          const getTranslationsType = item.translations.find((item) => item.locale === this.locales);

          return {
            id: getTranslationsType.id,
            name: getTranslationsType.name,
            meta: item,
          };
        });
      })();

      this.$nextTick(() => {
        if (this.$vuetify.breakpoint.xs) this.columnWidth = 32;

        this.findCarouselWidth();
        this.defineCarouselRange();
        this.setAmountSortColumns();
      });
    } catch (error) {
      console.error(error);
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => {
      this.setAmountSortColumns();
      this.findCarouselWidth();
    });
  },
  components: {
    CarouselSingleLine,
    CarouselPaginationBar,
    SelectBtn,
  },
};
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  margin-bottom: 72px;

  .catalog {
    position: relative;
    display: grid;
    grid-template-columns: max(268px) 1fr;
    grid-template-rows: 1fr;

    padding-right: 14px;

    .catalog-box {
      margin-bottom: 42px;
      grid-column: 2 span;

      .catalog-title {
        width: 100%;

        font-weight: 500;
        font-size: 32px;
        line-height: 35px;
        color: #222329;
      }

      .catalog-options {
        width: min-content;
      }
    }

    .sidebar-list-wrapper {
      position: relative;
      display: flex;

      grid-column: 1 span;
      transition: transform 1s ease;

      .catalog-sidebar-list {
        padding: 24px 0 30px 0;

        width: 100%;
        height: min-content;

        border-radius: 8px;
        background: #f2f7fa;

        transition: transform 1s ease;

        & li:first-child {
          margin-top: 0;
        }

        .sidebar-list-item {
          display: flex;
          align-items: center;

          padding: 0 32px;

          height: 48px;
          font-weight: 500;
          font-size: 15px;
          line-height: 17px;
          color: #4a4d5c;

          cursor: pointer;

          &:hover {
            background: #d5ebfd;
          }

          display: flex;
          align-items: center;

          .sidebar-link-icon {
            margin-right: 8px;
            // background: url('~assets/images/sprites/car-categories.png') -62px -102px;

            // width: 32px;
            // height: 16px;
          }
        }
      }
    }

    .sort-marks {
      display: flex;
      flex-direction: column;
      padding-left: 32px;

      grid-column: 1 span;

      .sort {
        border-bottom: 1px solid rgba(34, 35, 41, 0.1);
        margin-bottom: 28px;
      }

      .sort-marks-title {
        margin-bottom: 32px;

        font-weight: 500;
        font-size: 24px;
        line-height: 26px;
        color: #222329;
      }

      .sort-marks-list {
        display: grid;

        margin-bottom: 40px;

        width: 100%;

        grid-template-columns: repeat(14, 1fr);
        grid-template-rows: 1fr;
        gap: 12px;

        .sort-list-item {
          position: relative;

          grid-column: span 1;
          grid-row: span 1;

          &::before {
            content: '';
            display: block;
            padding-top: 100%;
            width: 100%;
          }

          .sort-item-btn {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 100%;

            border-radius: 2px;
            border: 1px solid #b1c4cd;

            font-weight: 500;
            font-size: 15px;
            line-height: 17px;
            color: #4a4d5c;
          }

          .is-select {
            border: 1px solid #4cad33;
            color: #4cad33;
          }
        }
      }

      .is-margin-10 {
        margin-bottom: 10px;
      }

      .carousel-pagination-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin-bottom: 40px;

        .carosel-navigation-bar {
          position: initial;

          .pagination-title {
            margin-bottom: 0;

            font-size: 14px;
            line-height: 18px;
            color: #70848e;
          }
        }
      }

      .sort-field {
        margin-bottom: 8px;
        outline: none;

        max-width: 160px;

        font-size: 15px;
        font-weight: 500;
        line-height: 17px;
        color: #4cad33;
      }

      .carousel-wrapper {
        width: 500px;
        height: 100%;

        ::v-deep .carousel {
          height: 100%;

          .slick-list {
            height: 100%;

            .slick-track {
              padding: 1px 0;
              height: 100%;

              .slick-slide {
                height: 100%;

                & > div {
                  height: calc(100% / 2);

                  .carousel-item {
                    display: flex !important;
                    flex-direction: column;
                    justify-content: flex-end;
                  }
                }
              }
            }
          }
        }

        .carousel-item-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          margin-bottom: 20px;

          &::before {
            content: '';
            padding-bottom: 75%;
            width: 100%;
          }

          .sort-preview-link {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 100%;
            width: 85%;

            border-radius: 16px;

            font-size: 15px;
            line-height: 17px;
            color: #4a4d5c;
            cursor: pointer;

            &:hover {
              box-shadow: 0 0 0 1px #4cad33;
            }

            .preview-item-icon {
              margin-bottom: 11px;
            }

            .preview-item-text {
              margin-bottom: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100%;
              text-align: center;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }

  .is-margin-72 {
    margin-bottom: 72px;
  }

  .catalog-advertising {
    padding-left: 34px;
    min-height: 90px;
    max-width: 100%;
    background: #d3d3d3;
  }
}

@include widescreen {
  .catalog-wrapper .catalog {
    margin-bottom: 72px;

    .sort-marks {
      justify-content: space-between;

      .sort-marks-list {
        grid-template-columns: repeat(12, 1fr);
      }
    }
  }
}

@include sm {
  .catalog-wrapper .catalog {
    padding-right: 0 !important;

    .catalog-box {
      margin-bottom: 20px;

      .catalog-title {
        margin-bottom: 20px;
      }
    }

    .sidebar-list-wrapper {
      position: relative;
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      transform: translateX(-100%);

      .catalog-sidebar-list {
        max-height: 450px;
        transform-origin: top;
        transform: scaleY(0);
        overflow-y: auto;
      }

      .sidebar-btn {
        display: flex;
      }
    }

    .sort-marks {
      padding-left: 0;

      grid-column: 1 / 3;
      grid-row: 2 / 3;
    }
  }
}

@include xs {
  .catalog-wrapper {
    margin-bottom: 25px;

    .catalog {
      margin-bottom: 25px;

      .catalog-box {
        .catalog-title {
          font-size: 30px;
          line-height: 33px;
        }
      }

      .sort-marks {
        .sort-marks-list {
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: 1fr;
          gap: 12px;

          .sort-list-item .sort-item-btn {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
