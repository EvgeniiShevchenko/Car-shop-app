<template>
  <div class="filter">
    <form class="filter-form row no-gutters" method="POST">
      <ul class="filter-tabs-bar row no-gutters">
        <li class="tabs-bar-item col col-sm-3" :key="index" v-for="(item, index) in tabs">
          <button :class="`tabs-item-btn ${defineStyleTabs(index)}`" type="button" @click="selectFilterType(index)">{{ item }}</button>
        </li>
      </ul>
      <div class="category-car col-12 mb-sm-3">
        <label class="filter-param-label">Тип транспорта</label>
        <SelectBtn :options="category" :value="filterCategory" label="Выбрать" @change="selectFilterCategory($event)" />
      </div>
      <div class="brend-car col-sm-6 pr-sm-4 mb-sm-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Марка транспорта</label>
        <SelectBtn :options="factory" :value="filterProducer" label="Выбрать" @change="selectFilterProducer($event)" />
      </div>
      <div class="model-car col-sm-6 pl-sm-4 mb-sm-3 col-lg-6 pl-lg-4">
        <label class="filter-param-label">Модель</label>
        <SelectBtn :options="model" :value="filterModel" label="Выбрать" @change="selectFilterModel($event)" />
      </div>
      <div class="location-car col-sm-6 pr-sm-4 mb-sm-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Регион</label>
        <SelectBtn :options="locations" :value="filterLocation" label="Выбрать" @change="selectFilterLocation($event)" />
      </div>
      <div class="production-year col-sm-6 pl-sm-4 mb-sm-3 col-lg-6 pl-lg-4">
        <label class="filter-param-label">Год</label>
        <div class="row no-gutters">
          <SelectBtn
            class="col-6 pr-1 col-sm-6 pr-sm-1 pr-md-2 col-lg-6 pr-lg-2"
            :options="productionYear"
            :value="filterProductionYearFrom"
            label="от"
            @change="selectFilterProductionYearFrom($event)"
          />
          <SelectBtn class="col-6 pl-1 col-sm-6 pl-sm-1 pl-md-2 col-lg-6 pl-lg-2" :options="productionYear" :value="filterProductionYearTo" label="до" @change="selectFilterProductionYearTo($event)" />
        </div>
      </div>
      <div class="price-car row no-gutters col-12">
        <label class="filter-param-label">Цена</label>
        <div class="row no-gutters col-12">
          <div class="row no-gutters col-sm-12 col-lg-6 pr-lg-4">
            <div class="col-8 pr-1 col-sm-9 pr-sm-4 pr-md-2 col-lg-8 pr-lg-2">
              <input class="price-field" type="text" :placeholder="`${filterPriceMin} ‒ ${filterPriceMax}`" :value="priceRangeValue" @input="changePriceField" />
            </div>
            <SelectBtn class="col-4 pl-1 col-sm-3 pl-sm-4 pl-md-2 col-lg-4 pl-lg-2" :value="filterValuta" :options="valuta" @change="selectFilterValuta($event)" />
          </div>
          <div class="col-sm-12 col-lg-6 pl-lg-4">
            <DragSlider
              v-if="filterRangePriceMax"
              :key="updateSlaider"
              :sliderData="[filterRangePriceMin, filterRangePriceMax]"
              :sliderValue="[filterPriceMin, filterPriceMax]"
              :config="dragSliderConfig"
              @range-change="handlerDragSlider($event)"
            >
              <template slot="dot">
                <div class="slider-dot" />
              </template>
            </DragSlider>
          </div>
        </div>
      </div>
      <div class="search-btn-wrapper">
        <n-link class="extend-search-link" to="/search"> Расширенный поиск </n-link>
        <n-link class="search-link" to="/catalog" @click="startSearch">
          Начать поиск
          <svg class="search-link-icon">
            <use xlink:href="~assets/images/sprites/main.svg#icon-search-btn" />
          </svg>
        </n-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
// components
import SelectBtn from '~/components/base/SelectBtn.vue';
import DragSlider from '~/components/base/DragSlider.vue';

export default {
  name: 'MainFilter',
  data() {
    return {
      tabs: ['Все', 'Б/у', 'Новые', 'Под пригон'],
      category: ['Новые автомобили', 'Б/у автомобили', 'Мотоциклы', 'Грузовые автомобили'],
      factory: ['Argo', 'APS', 'Audi', 'Atmos', 'Azura', 'BMW'],
      locations: ['Киев', 'Винница', 'Днепр', 'Полтава'],
      model: ['318', '320', '328', 'X1', 'X3'],
      productionYear: [...Array(121).keys()].map((item) => 1900 + item),
      valuta: ['UAN', 'USD', 'RUB', 'EUR'],
      dragSliderConfig: {
        single: false,
        title: '',
        dotSize: 28,
      },
      priceRangeValue: '',
      updateSlaider: false,
    };
  },
  computed: {
    ...mapState({
      filterType: (state) => state.main.filter.type,
      filterValuta: (state) => state.main.filter.valuta,
      filterCategory: (state) => state.main.filter.category,
      filterProducer: (state) => state.main.filter.producer,
      filterModel: (state) => state.main.filter.model,
      filterLocation: (state) => state.main.filter.location,
      filterProductionYearFrom: (state) => state.main.filter.productionYearFrom,
      filterProductionYearTo: (state) => state.main.filter.productionYearTo,
      filterRangePriceMax: (state) => state.main.filter.priceRange.max,
      filterRangePriceMin: (state) => state.main.filter.priceRange.min,
      filterPriceMax: (state) => state.main.filter.priceMax,
      filterPriceMin: (state) => state.main.filter.priceMin,
    }),
  },
  methods: {
    startSearch() {
      const parseMinPrice = Number(this.priceRangeValue.replace(/^(\d+)(?: - \d*)/, '$1'));
      const parseMaxPrice = Number(this.priceRangeValue.replace(/(?:\d* - )(\d+)$/, '$1'));
      const sendData = {
        type: this.filterType,
        category: this.filterCategory,
        producer: this.filterProducer,
        model: this.filterModel,
        location: this.filterLocation,
        fromYear: this.filterProductionYearFrom,
        toYear: this.filterProductionYearTo,
        maxPrice: parseMaxPrice,
        minPrice: parseMinPrice,
      };
    },
    defineStyleTabs(index) {
      let className = '';

      if (index === this.filterType) className = 'is-select ';
      return index === 0 ? className + ' is-border-left' : index === 3 ? className + ' is-border-right' : className;
    },
    selectFilterCategory(param) {
      this.setFilterCategory(param);
    },
    selectFilterType(typeIndex) {
      this.setFilterType(typeIndex);
    },
    selectFilterProducer(typeName) {
      this.setFilterProducer(typeName);
    },
    selectFilterModel(modelName) {
      this.setFilterModel(modelName);
    },
    selectFilterLocation(modelName) {
      this.setFilterLocation(modelName);
    },
    selectFilterProductionYearFrom(year) {
      this.setFilterProductionYearFrom(year);
    },
    selectFilterProductionYearTo(year) {
      this.setFilterProductionYearTo(year);
    },
    async selectFilterValuta(valuta) {
      this.updateSlaider = !this.updateSlaider;
      try {
        // const getPriceRange = await axios.get(`api/price-range/${valuta}`, { method: 'GET' });
        if (valuta === 'USD') {
          this.setFilterPriceRangeMax(10000);
          this.setFilterPriceRangeMin(120);
          this.setPriceMax(10000);
          this.setPriceMin(120);
          this.priceRangeValue = `120 - 10000`;
        }
      } catch (error) {
        console.log(error);
      }

      this.setFilterValuta(valuta);
    },
    handlerDragSlider(value) {
      if (value[1] === this.filterPriceMax && value[0] !== this.filterPriceMin) {
        this.setPriceMin(value[0]);
        this.priceRangeValue = this.priceRangeValue.replace(/(?:\d*)( - \d*)/, `${value[0]}$1`);
      } else {
        this.setPriceMax(value[1]);
        this.priceRangeValue = this.priceRangeValue.replace(/(\d* - )(?:\d*)/, `$1${value[1]}`);
      }
    },
    changePriceField(e) {
      let value = e.target.value;

      if (!value.match(/[-]/g)) {
        value += '-';
      }
      if (value.match(/[a-zA-Z]+/g)) {
        e.target.value = this.priceRangeValue;

        return;
      }
      e.target.value = value;
      this.priceRangeValue = value;
    },
    ...mapActions({
      setFilterType: 'main/setFilterType',
      setFilterCategory: 'main/setFilterCategory',
      setFilterProducer: 'main/setFilterProducer',
      setFilterModel: 'main/setFilterModel',
      setFilterLocation: 'main/setFilterLocation',
      setFilterProductionYearFrom: 'main/setFilterProductionYearFrom',
      setFilterProductionYearTo: 'main/setFilterProductionYearTo',
      setFilterValuta: 'main/setFilterValuta',
      setFilterPriceRangeMax: 'main/setFilterPriceRangeMax',
      setFilterPriceRangeMin: 'main/setFilterPriceRangeMin',
      setPriceMax: 'main/setPriceMax',
      setPriceMin: 'main/setPriceMin',
    }),
  },
  async mounted() {
    try {
      // const getPriceRange = await axios.get(`api/price-range/${valuta}`, { method: 'GET' });
      // const test = await axios.get(`http://localhost:8000/api/auth/client/filters/types`, { method: 'GET' });
      this.setFilterPriceRangeMax(1000000);
      this.setFilterPriceRangeMin(12000);
      this.setPriceMax(1000000);
      this.setPriceMin(12000);
      this.priceRangeValue = `${12000} - ${1000000}`;
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    SelectBtn,
    DragSlider,
  },
};
</script>

<style lang="scss" scoped>
.filter {
  position: relative;

  &::before {
    position: absolute;
    content: '';

    top: -32px;
    left: -32px;
    bottom: -32px;
    right: -32px;

    border-radius: 12px;
    background: rgba(213, 235, 253, 0.5);
    box-shadow: 0px 2px 20px rgba(143, 155, 176, 0.2);
  }

  .filter-form {
    position: relative;

    .filter-tabs-bar {
      display: flex;
      padding-left: 0;
      margin-bottom: 16px;

      .tabs-item-btn {
        padding: 10px 0;

        width: 100%;

        color: #4a4d5c;

        &:hover {
          background: #1768ac;
          color: #ffffff;
        }
      }

      .is-select {
        background: #1768ac;
        color: #ffffff;

        &:hover {
          background: #0e4c80;
        }
      }

      .is-border-left {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      .is-border-right {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }

    .price-car {
      .price-field {
        padding-left: 12px;

        height: 100%;
        width: 100%;

        border-radius: 2px;
        border: 1px solid#8fa5b0;
        background: #ffffff;
      }
    }

    .search-btn-wrapper {
      display: flex;
      margin-top: 17px;

      width: 100%;

      .extend-search-link {
        display: flex;
        justify-content: center;
        align-items: center;

        margin-right: 32px;

        width: 100%;
        max-height: 43px;

        flex: 1;

        border-radius: 2px;
        border: 1px solid #4a4d5c;
        background: #ffffff;

        text-align: center;

        &:hover {
          background: #f2f7fa;
        }
      }

      .search-link {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 14px 0;

        width: 100%;
        max-height: 43px;

        flex: 1;

        border-radius: 2px;
        background: #1768ac;

        text-align: center;
        text-transform: uppercase;
        font-family: Raleway;
        color: #ffffff;
        letter-spacing: 0.05em;

        &:hover {
          background: #0e4c80;
        }

        .search-link-icon {
          margin-left: 19px;

          width: 19px;
          height: 12px;
        }
      }
    }

    .slider-dot {
      height: 28px;
      width: 28px;

      border: 7px solid #1768ac;
      border-radius: 50%;
      background: #ffffff;
    }

    .filter-param-label {
      display: block;

      margin-bottom: 6px;
    }
  }
}

@include sm {
  .filter::before {
    background: #f2f7fa;
    border-radius: 0;
  }
}

@include xs {
  .filter .filter-form {
    .filter-tabs-bar {
      justify-content: space-between;

      .tabs-bar-item {
        flex: 1;

        .tabs-item-btn {
          white-space: nowrap;
        }
      }
    }

    .search-btn-wrapper {
      flex-direction: column;

      & a:first-child {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
