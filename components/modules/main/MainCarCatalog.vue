<template>
  <div class="catalog-wrapper row no-gutters">
    <section :class="`catalog row no-gutters col-md-12 col-lg-10 ${$vuetify.breakpoint.mdAndDown ? 'is-margin-72' : ''}`">
      <div class="catalog-box">
        <h3 class="catalog-title">Каталог автомобилей</h3>
        <SelectBtn class="catalog-options" :options="transportType" label="выбрать тип" @change="selectOptions($event)" v-if="$vuetify.breakpoint.smAndDown" />
      </div>
      <div class="sidebar-list-wrapper">
        <ul class="catalog-sidebar-list">
          <li :key="index" v-for="(item, index) in transportType">
            <n-link class="sidebar-list-item" :to="`catalog/${item}`">
              <img class="sidebar-link-icon" src="~/assets/images/main-transport-type.png" alt="" />
              {{ item }}
            </n-link>
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
          <div class="sort-fiel-wrapper">
            <input class="sort-field" :value="searchValue" type="text" disabled />
            <CarouselPaginationBar class="carosel-navigation-bar" @go-next="goToNext" @go-prev="goToPrev" v-if="carLogos.length">
              <p class="pagination-title">{{ amountShownLogo }} из {{ carLogos.length }}</p>
            </CarouselPaginationBar>
          </div>
        </div>
        <div class="carousel-wrapper" ref="slider">
          <CarouselSingleLine originId="mainCatalog" :collection="carLogos" :showNumber="range" :scrollNumber="range" :rows="2" :config="carouselConfig" :arrow="false">
            <template slot="default">
              <div class="carousel-item-wrapper">
                <n-link class="sort-preview-link" :to="`catalog/${'alfa-romeo'}`">
                  <img class="preview-item-icon" src="~/assets/images/car-logo.png" alt="" />
                  Alfa Romeo
                </n-link>
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
      cyrillicList: ['А', 'В', 'С', 'Д', 'Е', 'Ф', 'Г', 'Н', 'И', 'З', 'К'],
      carLogos: [],
      activeSortTab: '',
      searchValue: '',
      columnWidth: 36,
      gap: 12,
      isSidebar: false,
      page: 1,
      range: 5,
      rangeDuble: 10,
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
      return this.carLogos.length % this.rangeDuble === 0 ? this.page * this.rangeDuble : this.page * this.rangeDuble > this.carLogos.length ? this.carLogos.length : this.page * this.rangeDuble;
    },
  },
  methods: {
    selectOptions(e) {
      this.$router.push({ path: `catalog/${e}` });
    },

    defineCarouselRange() {
      this.rangeDuble = this.$vuetify.breakpoint.xs ? 4 : 10;
    },

    goToNext() {
      this.$children[9].$refs.carousel.next();

      this.page = this.page * this.rangeDuble >= this.carLogos.length ? this.page : this.page + 1;
    },

    goToPrev() {
      this.$children[9].$refs.carousel.prev();

      this.page = this.page - 1 !== 0 ? this.page - 1 : 1;
    },

    setAmountSortColumns() {
      const container = this.$refs.firstMarksList;
      const width = Number(container.offsetWidth);
      const columnAmount = Math.floor((width - 15) / (this.columnWidth + this.gap));

      container.style.gridTemplateColumns = `repeat(${columnAmount}, 1fr)`;
      this.$refs.secondMarksList.style.gridTemplateColumns = `repeat(${columnAmount}, 1fr)`;
    },

    findCarouselWidth() {
      const targetElement = this.$refs.sort;
      const width = targetElement.offsetWidth;

      this.$refs.slider.style.width = width + 'px';
    },

    handlerSortSelect(sortKey) {
      try {
        // const getMarks = await axios.get(`api/marks/${this.searchValue + sortKey}`, {method: 'GET'});
        this.carLogos = [...Array(17).keys()];
        this.activeSortTab = sortKey;
        this.searchValue = sortKey;
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    this.$nextTick(() => {
      if (this.$vuetify.breakpoint.xs) this.columnWidth = 20;

      this.setAmountSortColumns();
      this.findCarouselWidth();
      this.defineCarouselRange();
    });

    window.addEventListener('resize', () => {
      this.setAmountSortColumns();
      this.findCarouselWidth();
    });
    try {
      //   this.latinList = await axios.get('api/latinAlphabetical');
      //   this.cyrillicList = await axios.get('api/cyrillicAlphabetical');
      this.latinlList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'K'];
      this.activeSortTab = this.latinlList[0];
      this.searchValue = this.latinlList[0];
      //   this.carLogos = await axios.get('api/getCarLogotypes');
      this.carLogos = [...Array(17).keys()];
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
        width: 100%;

        border-radius: 8px;
        background: #f2f7fa;

        transition: transform 1s ease;

        & li:first-child {
          margin-top: 0;
        }

        .sidebar-list-item {
          display: flex;
          align-items: center;

          padding: 16px 32px;
          margin-top: 16px;

          &:hover {
            background: #d5ebfd;
          }

          display: flex;
          align-items: center;

          .sidebar-link-icon {
            margin-right: 8px;
            background: url('~assets/images/sprites/car-categories.png');
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
        border: 1px solid rgba(34, 35, 41, 0.1);
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

        margin-bottom: 32px;

        width: 100%;

        grid-template-columns: repeat(14, 36px);
        grid-template-rows: 36px;
        gap: 12px;

        .sort-list-item {
          grid-column: span 1;
          grid-row: span 1;

          .sort-item-btn {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 36px;
            height: 36px;

            border-radius: 2px;
            border: 1px solid #b1c4cd;

            font-weight: 500;
            font-size: 15px;
            line-height: 17px;
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

      .sort-fiel-wrapper {
        position: relative;

        .sort-field {
          margin-bottom: 8px;
          outline: none;

          max-width: 160px;

          font-size: 15px;
          font-weight: 500;
          line-height: 17px;
          color: #4cad33;
        }

        .carosel-navigation-bar {
          bottom: 0;
          top: auto;

          .pagination-title {
            margin-bottom: 0;

            font-size: 14px;
            line-height: 18px;
            color: #70848e;
          }
        }
      }

      .carousel-wrapper {
        width: 500px;
        height: 100%;

        ::v-deep .carousel {
          height: 100%;

          .slick-list {
            height: 100%;

            .slick-track {
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

          &::before {
            content: '';
            padding-bottom: 100%;
            width: 100%;
          }

          .sort-preview-link {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 100%;
            width: 100%;

            border-radius: 16px;

            font-size: 15px;
            line-height: 17px;

            &:hover {
              border: 1px solid #4cad33;
            }

            .preview-item-icon {
              margin-bottom: 11px;
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
    .catalog-box {
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
  .catalog-wrapper .catalog .sort-marks {
    .sort-marks-list {
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: 20px;
      gap: 8px;

      .sort-list-item .sort-item-btn {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
