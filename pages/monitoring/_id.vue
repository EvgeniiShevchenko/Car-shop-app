<template>
  <main class="main container">
    <div class="row no-gutters">
      <BreadCrumbs class="breadcrumb-wrapper col-12" :collection="getRouteHistory" />
      <h1 class="main-title">Стоимость {{ collection.name }}</h1>
      <div class="stats-preview-wrapper row no-gutters">
        <div class="stats-preview">
          <h2 class="stats-title">Средняя стоимость {{ collection.name }} по всей Украине</h2>
          <div class="stats-value-wrapper">
            <p class="stats-value-price">{{ collection.current_default }} {{ collection.price }}</p>
            <p class="stats-value-convert" v-if="productsDefaultList.length">
              {{ collection.price_another[0].price }} {{ collection.price_another[0].currency.name }}
              <span class="ml-6">{{ collection.price_another[1].currency.symbol }} {{ collection.price_another[1].price }}</span>
            </p>
          </div>
          <n-link class="calculator-link" :to="`/calculator/${$route.params.id}`">
            Открыть калькулятор
            <svg class="calculator-link-icon">
              <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
            </svg>
          </n-link>
        </div>
        <CurrencyRate :collection="collection" v-if="productsDefaultList.length" />
      </div>
      <section class="liner-chart-wrapper">
        <h2 class="chart-title">Динмика изменения цен на {{ collection.name }}</h2>
        <div class="liner-chart">
          <LineChart class="chart" v-if="loaded" :chartData="chart.data" :chartLabels="chart.labels" :maintainAspectRatio="false" :responsive="true" cssClasses="chart-wrapper" />
        </div>
      </section>
      <div class="model-versions">
        <h3 class="versions-title">Цены на модели Volkswagen по видам топлива</h3>
        <ul class="versions-list">
          <li class="versions-list-item" :key="index" v-for="(item, index) in modelVersionList">
            <button :class="`versions-item-btn ${modelVersionSelect === item.id ? 'is-select' : ''}`" type="button" @click="handlerSelectVersion(item)">{{ item.name }}</button>
          </li>
        </ul>
        <AdsCardsList class="products" :collection="shownProductsList" className="mobile" />
        <button class="versions-more-btn" type="button" @click="showMoreAds">
          Еще модели Volkswagen
          <svg class="more-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </button>
      </div>
      <section class="rating">
        <h3 class="rating-title">Топ предложений {{ collection.name }}</h3>
        <div class="rating-search-wrapper">
          <div class="rating-search-result">
            <n-link
              class="search-result-btn"
              :to="`/catalog?status=0&car_type_id=${collection.car_type_id}&car_mark_id=${collection.car_mark_id}&car_model_id=${collection.car_model_id}&currency_id=${currencyDefault}`"
              role="button"
            >
              За час
              <span class="result-btn-value">+{{ collection.countHour }}</span>
            </n-link>
            <n-link
              class="search-result-btn"
              :to="`/catalog?status=0&car_type_id=${collection.car_type_id}&car_mark_id=${collection.car_mark_id}&car_model_id=${collection.car_model_id}&currency_id=${currencyDefault}`"
              type="button"
            >
              За день
              <span class="result-btn-value">+{{ collection.countDay }}</span>
            </n-link>
          </div>
          <SelectBtn class="select-currency" className="prepend" :options="currenciesList" :payload="true" :value="currencyDefault" @change="selectCurrency($event)" />
        </div>
        <AdsCardsList class="sentence" :collection="sentenceList" className="mobile" />
      </section>
      <n-link
        class="search-total-wrapper"
        :to="`/catalog?status=0&car_type_id=${collection.car_type_id}&car_mark_id=${collection.car_mark_id}&car_model_id=${collection.car_model_id}&currency_id=${currencyDefault}`"
        tag="div"
      >
        <h3 class="search-total-title">Предложений о продаже {{ collection.name }}</h3>
        <div class="total-preview-wrapper">
          <div class="total-preview">
            <p class="total-preview-label">Всего предложений</p>
            <p class="total-preview-value">{{ collection.count_sentence }}</p>
          </div>
          <div class="total-preview is-radius-right">
            <p class="total-preview-label">Стоимость</p>
            <p class="total-preview-value">
              <span class="preview-value">от</span>
              {{ collection.current_default }}{{ collection.minPrice }}
              <span class="preview-value">до</span>
              {{ collection.current_default }}{{ collection.maxPrice }}
            </p>
          </div>
        </div>
      </n-link>
    </div>
  </main>
</template>

<script>
// components
import BreadCrumbs from '~/components/base/BreadCrumbs.vue';
import AdsCardsList from '~/components/base/AdsCardsList.vue';
import SelectBtn from '~/components/base/SelectBtn.vue';
import LineChart from '~/components/base/LineChart.vue';
import CurrencyRate from '~/components/base/CurrencyRate.vue';
// mixins
import getStatusName from '~/mixins/getStatusName.js';
import getUniqueAdsNumber from '~/mixins/getUniqueAdsNumber.js';
// mocks
import monitoringList from '~/static/mocks/monitoringPriceList.json';

export default {
  name: 'Monitoring',
  mixins: [getStatusName, getUniqueAdsNumber],
  data() {
    return {
      modelVersionList: [],
      productsList: [],
      shownProductsList: [],
      productsDefaultList: [],
      sentenceList: [],
      currenciesList: [],
      modelVersionSelect: 0,
      currencyDefault: 2,
      collection: {},
      loaded: false,
      chart: {
        labels: [],
        data: [],
      },
    };
  },
  computed: {
    getRouteHistory() {
      const { path, params } = this.$route;
      const routeList = [
        { path: `/catalog?status=0`, name: this.getStatusName(0) },
        { path: `/auto/${params.id}`, name: params.id },
        { path: path, name: 'Мониторинг цен' },
      ];

      return routeList;
    },
  },
  methods: {
    showMoreAds() {
      this.shownProductsList = this.productsList.length <= 8 ? [...this.shownProductsList, ...this.productsList] : [...this.shownProductsList, ...this.productsList.splice(0, 8)];
    },

    async selectCurrency({ value }) {
      try {
        this.sentenceList = (await this.$services.monitoring.getSentenceList(this.getUniqueAdsNumber(), value)).data.sentences;

        this.currencyDefault = value;
      } catch (error) {
        console.error(error);
      }
    },

    async handlerSelectVersion({ id }) {
      try {
        if (!id) {
          this.productsList = [...this.productsDefaultList];
          this.shownProductsList = this.productsList.splice(0, 8);
          this.modelVersionSelect = id;

          return;
        }

        this.productsList = (await this.$services.monitoring.getFuelProductsList(this.getUniqueAdsNumber(), id)).data.products;

        this.shownProductsList = this.productsList.splice(0, 8);
        this.modelVersionSelect = id;
      } catch (error) {
        console.error(error);
      }
    },

    changeSizeChart() {
      const chartNode = document.getElementById('line-chart');
      chartNode.parentNode.style.width = '128px';
    },
  },
  mounted() {
    window.addEventListener('resize', this.changeSizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeSizeChart);
  },
  async fetch() {
    try {
      const { data } = await this.$services.monitoring.getMonitoringPriceList(this.getUniqueAdsNumber());
      const { fuels, sentence, select_currencies, products_fuels } = data.priceMonitoring;

      this.currenciesList = select_currencies.map((item) => {
        return { text: item.name, value: item.id, meta: item };
      });
      this.modelVersionList = [{ id: 0, name: 'Все' }, ...fuels];
      this.sentenceList = sentence;
      this.collection = data.priceMonitoring;
      this.productsDefaultList = products_fuels;
      this.productsList = [...products_fuels];
      this.shownProductsList = this.productsList.splice(0, 8);
      let labels = [];
      let firstLine = [];
      let secondLine = [];

      for (let item of monitoringList) {
        labels = [...labels, item.date];
        firstLine = [...firstLine, item.maxPrice];
        secondLine = [...secondLine, item.minPrice];
      }

      this.chart.labels = labels;
      this.chart.data = { firstLine, secondLine };
      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    BreadCrumbs,
    AdsCardsList,
    SelectBtn,
    LineChart,
    CurrencyRate,
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include init-font;
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 24px;

  flex: 1;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }

  .title-xxl {
    @include init-title(#222329, 24px, 500, 26px);
  }

  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }

  .title-l {
    @include init-title(#4a4d5c, 18px, 500, 20px);
  }

  .main-title {
    margin-top: 25px;

    @extend .title-xxxl;
  }

  .stats-preview-wrapper {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 32px;

    .stats-preview {
      padding: 20px 24px;
      width: calc(100% - 253px);
      background: #f2f7fa;

      .stats-title {
        @extend .title-xxl;
        max-width: 562px;
      }

      .stats-value-wrapper {
        display: flex;
        align-items: center;

        margin-top: 20px;

        .stats-value-price {
          @extend .title-xxxl;
          color: #4cad33;
        }

        .stats-value-convert {
          @extend .title-xl;
          margin-left: 120px;
        }
      }

      .calculator-link {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0 29px 0 20px;
        margin-top: 20px;

        height: 44px;
        width: max-content;

        border-radius: 2px;
        background: #1768ac;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #ffffff;

        &:hover {
          background: #0e4c80;
        }

        .calculator-link-icon {
          margin-left: 19px;
          width: 7px;
          height: 12px;

          fill: #ffffff;
        }
      }
    }
  }

  .liner-chart-wrapper {
    margin-top: 43px;
    width: 100%;

    .chart-title {
      @extend .title-xxl;
    }

    .liner-chart {
      display: flex;
      width: 100%;

      .chart {
        margin-top: 32px;
      }
    }
  }

  .model-versions {
    margin-top: 56px;
    width: 100%;

    .versions-title {
      @extend .title-xxl;
    }

    .versions-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 0;

      margin-top: 32px;

      & li:first-child .versions-item-btn {
        border-radius: 4px 0 0 4px;
      }

      & li:last-child .versions-item-btn {
        border-radius: 0 4px 4px 0;
      }

      .versions-list-item {
        .versions-item-btn {
          padding: 0 30px;
          height: 38px;

          font-weight: 500;
          font-size: 16px;
          line-height: 18px;

          &:hover {
            background: #1768ac;
            color: #ffffff;
          }
        }

        .is-select {
          background: #1768ac;
          color: #ffffff;

          &:hover {
          }
        }

        .is-select {
          background: #1768ac;
          color: #ffffff;

          &:hover {
            background: #0e4c80;
          }
        }
      }
    }

    .products {
      margin-top: 24px;
    }

    .versions-more-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0 20px;
      margin-top: 24px;

      height: 44px;

      border-radius: 2px;
      border: 1px solid #4a4d5c;

      &:hover {
        background: #f2f7fa;
      }

      .more-btn-icon {
        margin-left: 19px;

        width: 7px;
        height: 12px;
      }
    }
  }

  .rating {
    margin-top: 56px;
    width: 100%;

    .rating-title {
      @extend .title-xxl;
    }

    .rating-search-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-top: 32px;

      border-radius: 4px;
      background: #f2f7fa;

      .rating-search-result {
        display: flex;

        .search-result-btn {
          display: flex;
          align-items: center;

          padding: 0 16px;
          height: 38px;

          font-size: 14px;
          line-height: 17px;

          .result-btn-value {
            margin-left: 12px;

            font-size: 14px;
            font-weight: 500;
            line-height: 17px;
            color: #222329;
          }
        }
      }

      .select-currency {
        width: min-content;

        ::v-deep .v-select__slot {
          background: #f2f7fa;

          .v-input__control {
            & div:first-child {
              background: #f2f7fa;
            }
          }
        }
      }
    }

    .sentence {
      margin-top: 24px;
    }
  }

  .search-total-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 24px;

    width: 100%;
    height: max-content;
    cursor: pointer;

    .search-total-title {
      @extend .title-l;
      color: #222329;
    }

    .total-preview-wrapper {
      display: flex;
      justify-content: space-between;

      .total-preview {
        padding: 4px 8px;
        margin-right: 1px;

        background: #51a9f2;

        .total-preview-label {
          font-size: 13px;
          line-height: 16px;
          color: #ffffff;
        }

        .total-preview-value {
          @extend .title-xxl;
          font-size: 18px;
          line-height: 20px;
          color: #ffffff;

          & .preview-value:first-child {
            margin-left: 0;
          }

          .preview-value {
            @extend .total-preview-label;
            margin: 0 4px;
            font-weight: 400;
          }
        }
      }

      .is-radius-right {
        border-radius: 0 4px 4px 0;
      }
    }
  }
}

@include sm {
  .main {
    .stats-preview-wrapper {
      .stats-preview {
        padding: 8px;

        .stats-value-wrapper {
          flex-wrap: wrap;

          .stats-value-price {
            width: 100%;
          }

          .stats-value-convert {
            margin: 16px 0 0 0;
          }
        }
      }
    }

    .search-total-wrapper {
      flex-wrap: wrap;

      .search-total-title {
        width: 100%;
      }

      .total-preview-wrapper {
        margin-top: 16px;
      }
    }
  }
}

@include xs {
  .main {
    padding-top: 0;

    .title-xxxl {
      font-size: 22px;
      line-height: 24px;
    }

    .title-xxl {
      font-size: 18px;
      line-height: 20px;
    }

    .title-xl {
      font-size: 16px;
      line-height: 18px;
    }

    .breadcrumb-wrapper {
      display: none;
    }

    .main-title {
      margin-top: 5px;
    }

    .stats-preview-wrapper {
      flex-wrap: wrap;
      margin-top: 20px;

      .stats-preview {
        width: 100%;
      }
    }

    .liner-chart-wrapper {
      display: none;
      margin-top: 20px;
    }

    .model-versions {
      margin-top: 20px;

      .versions-list {
        margin-top: 16px;

        .versions-list-item .versions-item-btn {
          padding: 0 15px;
        }
      }

      .versions-more-btn {
        margin-top: 16px;
      }
    }

    .rating {
      margin-top: 20px;

      .rating-search-wrapper {
        margin-top: 16px;
      }
    }

    .search-total-wrapper {
      margin-top: 20px;

      .total-preview-wrapper {
        flex-wrap: wrap;

        .total-preview {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
