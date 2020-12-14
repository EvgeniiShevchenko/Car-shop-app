<template>
  <main class="main container">
    <div class="row no-gutters">
      <BreadCrumbs class="bread-crumb col-12" :collection="getRouteHistory()" />
      <h1 class="calculator-title">Калькулятор стоимости авто</h1>
      <div class="filter-wrapper col-md-8 pr-md-4">
        <MainFilter className="calculator" v-if="Object.keys(collection).length" :collection="collection" @send-data="calculation" />
      </div>
      <div class="price-stats col-md-4 pl-md-4" v-if="Object.keys(collection).length">
        <h2 class="stats-title">Средняя стоимость</h2>
        <h3 class="stats-subtitle">{{ collection.name }}</h3>
        <p class="stats-price">{{ collection.current_default }} {{ collection.price }}</p>
        <p class="stats-price-other">
          {{ collection.price_another[0].price }} {{ collection.price_another[0].currency.name }}
          <span class="ml-6">{{ collection.price_another[1].currency.symbol }} {{ collection.price_another[1].price }}</span>
        </p>
        <CurrencyRate class="course-currency" :collection="collection" v-if="isLoaded" />
        <n-link class="catalog-link" :to="`/catalog?status=0&car_type_id=${type}&car_mark_id=${brand}&car_model_id=${model}`" tag="button">
          Все предложения
          <svg class="catalog-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </n-link>
        <p class="stats-info">Если вы хотите продать {{ collection.name }} добавьте объявление на AutoSill</p>
        <n-link class="add-link" to="/add-advertisement" tag="button">
          <svg class="add-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#plus-18" />
          </svg>
          Подать объявление
        </n-link>
      </div>
      <section class="liner-chart-wrapper" v-if="Object.keys(collection).length">
        <h2 class="chart-title">Динмика изменения цен на {{ collection.name }}</h2>
        <div class="linear-chart">
          <LineChart class="chart" v-if="isLoaded" :chartData="chart.data" :chartLabels="chart.labels" :maintainAspectRatio="false" :responsive="true" cssClasses="chart-wrapper" />
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// components
import CurrencyRate from '~/components/base/CurrencyRate.vue';
import LineChart from '~/components/base/LineChart.vue';
import BreadCrumbs from '~/components/base/BreadCrumbs.vue';
import MainFilter from '~/components/modules/main/MainFilter.vue';
// mixins
import getUniqueAdsNumber from '~/mixins/getUniqueAdsNumber.js';
import getStatusName from '~/mixins/getStatusName.js';
import stringReplaceAll from '~/mixins/stringReplaceAll.js';
import isEmpty from '~/mixins/isEmpty.js';

export default {
  name: 'Calculator',
  mixins: [getStatusName, getUniqueAdsNumber, stringReplaceAll, isEmpty],
  data() {
    return {
      collection: {},
      chart: {
        labels: [],
        data: {},
      },
      searchResult: {},
      isLoaded: false,
    };
  },
  computed: {
    ...mapState({
      type: (state) => state.filter.filter.type,
      brand: (state) => state.filter.filter.brand,
      model: (state) => state.filter.filter.model,
    }),
  },
  methods: {
    async calculation(carParams) {
      try {
        const serverData = { ...carParams };
        const { data } = await this.$services.calculator.getCalculationResult(this.getUniqueAdsNumber(), this.getQueryString(serverData));

        this.collection = { ...this.collection, ...data.product };
        this.setPriceChart(data.priceMonitoring);
      } catch (error) {
        console.error(error);
      }
    },

    getQueryString(queryList) {
      let queryString = '';
      let index = 0;

      const convertArrayToString = (item) => {
        return item[1].map((value) => `${item[0]}[]=${value}`).join('&');
      };

      for (let item in queryList) {
        if (!this.isEmpty(queryList[item])) {
          queryString += index === 0 ? `?${item}=${queryList[item]}` : `&${Array.isArray(queryList[item]) ? convertArrayToString([item, queryList[item]]) : item + '=' + queryList[item]}`;

          index += 1;
        }
      }

      return this.stringReplaceAll({ true: '1', false: '0' }, queryString);
    },

    changeSizeChart() {
      const chartNode = document.getElementById('line-chart');
      chartNode.parentNode.style.width = '128px';
    },

    getRouteHistory() {
      const { path, params } = this.$route;
      const routeList = [
        { path: `/catalog?status=0`, name: this.getStatusName(0) },
        { path: `/auto/${params.id}`, name: params.id },
        { path: path, name: 'Калькулятор' },
      ];

      return routeList;
    },

    setPriceChart(chartData) {
      let labels = [];
      let firstLine = [];
      let secondLine = [];

      for (let item of chartData) {
        labels = [...labels, item.date];
        firstLine = [...firstLine, item.maxPrice];
        secondLine = [...secondLine, item.minPrice];
      }

      this.chart.labels = labels;
      this.chart.data = { firstLine, secondLine };
    },

    ...mapActions({
      setType: 'filter/setFilterType',
      setBrand: 'filter/setFilterBrand',
      setModel: 'filter/setFilterModel',
    }),
  },
  mounted() {
    window.addEventListener('resize', this.changeSizeChart);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeSizeChart);
  },
  async fetch() {
    try {
      const { priceMonitoring } = (await this.$services.monitoring.getMonitoringPriceList(this.getUniqueAdsNumber())).data;

      this.setType(priceMonitoring.car_type_id);
      this.setBrand(priceMonitoring.car_mark_id);
      this.setModel(priceMonitoring.car_model_id);

      this.setPriceChart(priceMonitoring.price_monitoring);

      this.collection = priceMonitoring;
      this.isLoaded = true;
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    CurrencyRate,
    LineChart,
    BreadCrumbs,
    MainFilter,
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include init-font;
  padding-top: 24px;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }

  .title-xxl {
    @include init-title(#222329, 24px, 500, 26px);
  }

  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }

  .calculator-title {
    @extend .title-xxxl;
    margin: 24px 0;
  }

  .price-stats {
    .stats-title {
      font-size: 14px;
      font-weight: normal;
      line-height: 125%;
      color: #222329;
    }

    .stats-subtitle {
      margin-top: 4px;

      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
      color: #222329;
    }

    .stats-price {
      @extend .title-xxxl;
      margin-top: 12px;
      color: #4cad33;
    }

    .stats-price-other {
      @extend .title-xl;
      padding-bottom: 16px;
      margin-top: 12px;
      box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);
    }

    .course-currency {
      margin-top: 16px;
    }

    .catalog-link {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 12px;

      height: 44px;
      width: 100%;

      border-radius: 2px;
      background: #70848e;

      &:hover {
        background: #1768ac;
      }

      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
      color: #ffffff;

      .catalog-link-icon {
        margin-left: 19px;

        width: 7px;
        height: 12px;

        fill: #ffffff;
      }
    }

    .stats-info {
      margin-top: 12px;
      font-size: 13px;
      line-height: 16px;
    }

    .add-link {
      @extend .catalog-link;
      background: #4cad33;

      &:hover {
        background: #2ca00d;
      }

      .add-link-icon {
        margin-right: 13px;

        width: 18px;
        height: 18px;
      }
    }
  }

  .liner-chart-wrapper {
    margin-top: 72px;
    padding-bottom: 68px;
    width: 100%;

    .chart-title {
      @extend .title-xxl;
    }

    .linear-chart {
      display: flex;
      width: 100%;

      .chart {
        margin-top: 32px;
      }
    }
  }
}

@include sm {
  .main {
    max-width: 100%;

    .price-stats {
      margin-top: 20px;

      .bank-rate {
        max-width: 253px;
      }

      .catalog-link {
        max-width: 250px;
      }

      .add-link {
        max-width: 250px;
      }
    }

    .price-stats .stats-price-other {
      padding-bottom: 0;
    }

    .liner-chart-wrapper {
      margin-top: 20px;
      padding-bottom: 8px;
    }
  }
}

@include xs {
  .main {
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 0 !important;

    .bread-crumb {
      display: none;
    }

    .calculator-title {
      margin-top: 0;
    }

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

    .calculator-title {
      margin-bottom: 20px;
    }

    .price-stats .stats-price-other {
      padding-bottom: 0;
    }

    .liner-chart-wrapper {
      display: none;
    }
  }
}
</style>
