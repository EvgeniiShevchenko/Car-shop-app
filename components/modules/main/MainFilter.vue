<template>
  <div class="filter">
    <form class="filter-form row no-gutters" method="POST">
      <ul class="filter-tabs-bar row no-gutters">
        <li class="tabs-bar-item col col-sm-3" :key="index" v-for="(item, index) in statesList">
          <button :class="`tabs-item-btn ${defineStyleTabs(index)}`" type="button" @click="selectFilterStates(index)">{{ item }}</button>
        </li>
      </ul>
      <div class="category-car col-12 mb-3">
        <label class="filter-param-label">Тип транспорта</label>
        <AutocompleteBtn :options="categoryList" :value="type" label="Выбрать" :isReset="!!type.length" @change="selectCategory($event)" @reset="resetTypeField" />
      </div>
      <div class="brend-car col-sm-6 pr-sm-4 mb-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Марка транспорта</label>
        <AutocompleteBtn
          :options="brandList"
          :value="brand"
          label="Выбрать"
          :isPrepend="hasType || !type.length"
          :isReset="!!brand.length"
          prependTitle="Выбырите сначало тип"
          @change="selectBrand($event)"
          @focus="checkExistType($event)"
          @reset="resetBrandField"
        />
      </div>
      <div class="model-car col-sm-6 pl-sm-4 mb-3 col-lg-6 pl-lg-4">
        <label class="filter-param-label">Модель</label>
        <AutocompleteBtn
          :options="modelsList"
          :value="model"
          label="Выбрать"
          :isPrepend="hasBrand || !brand.length"
          :isReset="!!model.length"
          prependTitle="Выбырите марку"
          @change="selectModel($event)"
          @focus="checkExistBrand($event)"
          @reset="resetModelField"
        />
      </div>
      <div class="location-car col-sm-6 pr-sm-4 mb-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Регион</label>
        <AutocompleteBtn
          :options="locationsList"
          :value="location"
          label="Выбрать"
          :loading="isLocationsLoading"
          :isReset="!!location.length"
          @change="selectLocation($event)"
          @focus="prefetchLocations()"
          @reset="resetLocation"
        />
      </div>
      <div class="production-year col-sm-6 pl-sm-4 mb-3 col-lg-6 pl-lg-4">
        <label class="filter-param-label">Год</label>
        <div class="row no-gutters">
          <AutocompleteBtn
            class="col-6 pr-2 col-sm-6 pr-sm-2 pr-md-2 col-lg-6 pr-lg-2"
            :options="yearsFromList"
            :value="fromYear"
            label="от"
            :isPrepend="hasModel || !model.length"
            :isReset="!!fromYear.length"
            prependTitle="Выбырите модель"
            @change="selectYearFrom($event)"
            @focus="checkExistModel($event)"
            @reset="resetFieldFrom"
          />
          <AutocompleteBtn
            class="col-6 pl-2 col-sm-6 pl-sm-2 pl-md-2 col-lg-6 pl-lg-2"
            :options="yearsToList"
            :value="toYear"
            label="до"
            :isPrepend="hasModel || !model.length"
            :isReset="!!toYear.length"
            prependTitle="Выбырите модель"
            @change="selectYearTo($event)"
            @focus="checkExistModel($event)"
            @reset="resetFieldTo"
          />
        </div>
      </div>
      <div class="price-car row no-gutters col-12">
        <label class="filter-param-label">Цена</label>
        <div class="row no-gutters col-12">
          <div class="row no-gutters col-sm-12 col-lg-6 pr-lg-4">
            <div class="price-wrapper col-7 pr-1 col-sm-9 pr-sm-4 pr-md-2 col-lg-8 pr-lg-2">
              <div class="price-inner-wrapper">
                <span class="price-from-wrapper">
                  {{ minPrice }}
                  <input class="price-from" type="text" :value="minPrice" @input="changePriceFrom" :maxlength="`${String(fixedMinPrice).length}`" />
                </span>
                <span class="price-divider">-</span>
                <span class="price-to-wrapper">
                  {{ maxPrice }}
                  <input class="price-to" type="text" :value="maxPrice" @input="changePriceTo" :maxlength="`${String(fixedMaxPrice).length}`" />
                </span>
              </div>
            </div>
            <SelectBtn class="col-5 pl-4 col-sm-3 pl-sm-4 pl-md-4 col-lg-4 pl-lg-2" :value="valuta" :payload="true" :options="valutaList" @change="selectValuta($event)" />
          </div>
          <div class="col-sm-12 col-lg-6 pl-lg-4">
            <DragSlider
              v-if="fixedMaxPrice"
              :key="updateSlaider"
              :sliderData="[fixedMinPrice, fixedMaxPrice]"
              :sliderValue="[minPrice, maxPrice]"
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
        <n-link class="extend-search-link" to="/search">Расширенный поиск</n-link>
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
import AutocompleteBtn from '~/components/base/AutocompleteBtn.vue';
import DragSlider from '~/components/base/DragSlider.vue';

export default {
  name: 'MainFilter',
  data() {
    return {
      statesList: ['Все', 'Б/у', 'Новые', this.$i18n.t('под-пригон')],
      categoryList: [],
      brandList: [],
      modelsList: [],
      locationsList: [],
      yearsFromList: [],
      yearsToList: [],
      valutaList: [],
      dragSliderConfig: {
        single: false,
        title: '',
        dotSize: 28,
      },
      updateSlaider: false,
      hasType: false,
      hasBrand: false,
      hasModel: false,
      isLocationsLoading: false,
    };
  },
  computed: {
    ...mapState({
      states: (state) => state.main.filter.states,
      type: (state) => state.main.filter.type,
      brand: (state) => state.main.filter.brand,
      model: (state) => state.main.filter.model,
      valuta: (state) => state.main.filter.valuta,
      fromYear: (state) => state.main.filter.productionYearFrom,
      toYear: (state) => state.main.filter.productionYearTo,
      location: (state) => state.main.filter.location,
      fixedMaxPrice: (state) => state.main.filter.priceRange.max,
      fixedMinPrice: (state) => state.main.filter.priceRange.min,
      maxPrice: (state) => state.main.filter.priceMax,
      minPrice: (state) => state.main.filter.priceMin,
    }),
  },
  methods: {
    resetTypeField() {
      this.resetType();
      this.resetFieldBrand();
      this.resetFieldModel();
      this.resetFieldsFromAndTo();
    },

    resetBrandField() {
      this.resetBrand();
      this.resetFieldModel();
      this.resetFieldsFromAndTo();
    },

    resetModelField() {
      this.resetModel();
      this.resetFieldsFromAndTo();
    },

    resetFieldFrom() {
      this.resetFilterProductionYearFrom();
    },

    resetFieldTo() {
      this.resetFilterProductionYearTo();
    },

    resetLocation() {
      this.resetLocation();
    },

    changePriceFrom(e) {
      const value = e.target.value;

      if (/^\d*$/.test(value) && Number(value) < this.maxPrice) {
        this.setPriceMin(Number(value));

        return;
      }

      e.target.value = this.minPrice;
    },

    changePriceTo(e) {
      const value = e.target.value;

      if (/^\d*$/.test(value) && Number(value) < this.fixedMaxPrice) {
        this.setPriceMax(Number(value));

        return;
      }

      e.target.value = this.maxPrice;
    },

    startSearch() {
      const sendData = {
        states: this.states,
        type: this.type,
        brand: this.brand,
        model: this.model,
        location: this.location,
        fromYear: this.fromYear,
        toYear: this.toYear,
        maxPrice: maxPrice,
        minPrice: minPrice,
      };
    },

    defineStyleTabs(index) {
      let className = '';

      if (index === this.states) className = 'is-select ';
      return index === 0 ? className + ' is-border-left' : index === 3 ? className + ' is-border-right' : className;
    },

    selectFilterStates(typeIndex) {
      this.setFilterStates(typeIndex);
    },

    async selectCategory(param) {
      if (this.brand) {
        this.resetFieldBrand();
        this.resetFieldModel();
        this.resetFieldsFromAndTo();
      }

      this.setType(param);

      try {
        const { data } = await axios.get(`http://localhost:8000/api/filters/marks?type=${param}`, { method: 'GET' });
        this.brandList = Object.values(data.data.marks).map((item, index) => ({
          text: item,
          value: `${index + 1}`,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    async selectBrand(typeName) {
      if (this.model) {
        this.resetFieldModel();
        this.resetFieldsFromAndTo();
      }

      this.setBrand(typeName);

      try {
        const { data } = await axios.get(`http://localhost:8000/api/filters/models?type=${this.type}&mark=${typeName}`, { method: 'GET' });
        this.modelsList = Object.values(data.data.models).map((item, index) => ({
          text: item,
          value: `${index + 1}`,
        }));
      } catch (error) {
        console.error(error);
      }
    },

    resetFieldBrand() {
      this.resetBrand();
      this.brandList = [];
    },

    checkExistType() {
      if (!this.type.length) {
        this.hasType = true;

        return;
      }

      this.hasType = false;
    },

    async selectModel(modelName) {
      if (this.yearsFromList || this.yearsToList) this.resetFieldsFromAndTo();

      this.setModel(modelName);

      try {
        const { data } = await axios.get(`http://localhost:8000/api/filters/years?type=${this.type}&model=${modelName}`, { method: 'GET' });
        const productionYear = Object.values(data.data.years).map((item, index) => ({
          text: item,
          value: `${index + 1}`,
        }));

        this.yearsFromList = productionYear;
        this.yearsToList = productionYear;
      } catch (error) {
        console.error(error);
      }
    },

    checkExistBrand() {
      if (!this.brandList.length) {
        this.hasBrand = true;

        return;
      }

      this.hasBrand = false;
    },

    resetFieldModel() {
      this.resetModel();
      this.modelsList = [];
    },

    selectLocation(modelName) {
      this.setLocation(modelName);
    },

    async prefetchLocations() {
      if (this.locationsList.length) return;

      try {
        this.isLocationsLoading = true;

        const { data } = await axios.get(`http://localhost:8000/api/filters/regions`, { method: 'GET' });

        this.locationsList = Object.values(data.data.regions).map((item, index) => ({
          text: item,
          value: `${index + 1}`,
        }));
        this.isLocationsLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    selectYearFrom(year) {
      this.setFilterProductionYearFrom(year);
    },

    selectYearTo(year) {
      this.setFilterProductionYearTo(year);
    },

    checkExistModel() {
      if (!this.modelsList.length) {
        this.hasModel = true;

        return;
      }

      this.hasModel = false;
    },

    resetFieldsFromAndTo() {
      this.resetFilterProductionYearFrom();
      this.resetFilterProductionYearTo();
      this.yearsFromList = [];
      this.yearsToList = [];
    },

    async selectValuta(valuta) {
      this.updateSlaider = !this.updateSlaider;
      try {
        // const getPriceRange = await axios.get(`api/price-range/${valuta}`, { method: 'GET' });
        if (valuta.value === 'USD') {
          this.setFixedMaxPrice(10000);
          this.setFixedMinPrice(120);
          this.setPriceMax(10000);
          this.setPriceMin(120);
        }
      } catch (error) {
        console.error(error);
      }

      this.setValuta(valuta.value);
    },

    handlerDragSlider(value) {
      if (value[1] === this.maxPrice && value[0] !== this.minPrice) {
        this.setPriceMin(value[0]);
      } else {
        this.setPriceMax(value[1]);
      }
    },
    ...mapActions({
      setType: 'main/setFilterType',
      resetType: 'main/resetFilterType',
      setBrand: 'main/setFilterBrand',
      resetBrand: 'main/resetFilterBrand',
      setModel: 'main/setFilterModel',
      resetModel: 'main/resetFilterModel',
      setLocation: 'main/setFilterLocation',
      resetLocation: 'main/resetFilterLocation',
      setFilterProductionYearFrom: 'main/setFilterProductionYearFrom',
      resetFilterProductionYearFrom: 'main/resetFilterProductionYearFrom',
      setFilterProductionYearTo: 'main/setFilterProductionYearTo',
      resetFilterProductionYearTo: 'main/resetFilterProductionYearTo',
      setValuta: 'main/setFilterValuta',
      setFixedMaxPrice: 'main/setFilterPriceRangeMax',
      setFixedMinPrice: 'main/setFilterPriceRangeMin',
      setPriceMax: 'main/setPriceMax',
      setPriceMin: 'main/setPriceMin',
    }),
  },
  mounted() {
    console.log(this);
    try {
      (async () => {
        const { data } = await axios.get(`${'http://localhost:8000/api/filters/types'}`, { method: 'GET' });

        this.categoryList = Object.values(data.data.types).map((item, index) => ({
          text: item,
          value: `${index + 1}`,
        }));
      })();

      (async () => {
        const { data } = await axios.get(`${'http://localhost:8000/api/filters/currencies'}`, { method: 'GET' });

        this.valutaList = Object.values(data.data.currencies).map((item) => ({
          text: item.name,
          value: item.name,
          meta: item,
        }));

        this.setValuta(data.data.current_default.name);
      })();

      (async () => {
        // const { data } = await axios.get(`${'http://localhost:8000/api/filters/prices'}`, { method: 'GET' });
        // console.log('mounted -> data', '422 Unprocessable Entity');

        // this.setPriceMax(data.data.max);
        // this.setPriceMin(data.data.min);
        // this.setFixedMaxPrice(data.data.max);
        // this.setFixedMinPrice(data.data.min);
        this.setPriceMin(200);
        this.setPriceMax(796);
        this.setFixedMinPrice(200);
        this.setFixedMaxPrice(796);
      })();
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    AutocompleteBtn,
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
        padding: 10px 8px;

        width: 100%;

        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
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
      .price-wrapper {
        width: 100%;
        height: 100%;

        .price-inner-wrapper {
          display: flex;
          align-items: center;

          padding-left: 12px;

          width: 100%;
          height: 100%;

          border-radius: 2px;
          border: 1px solid#8fa5b0;
          background: #ffffff;

          .price-from-wrapper {
            position: relative;
            display: flex;
            align-items: center;

            color: #ffffff;

            .price-from {
              position: absolute;
              outline: none;

              font-weight: 500;
              font-size: 15px;
              line-height: 12px;
              color: #4a4d5c;
            }
          }

          .price-divider {
            margin: 0 4px;
          }

          .price-to-wrapper {
            @extend .price-from-wrapper;

            .price-to {
              @extend .price-from;
            }
          }
        }
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
        padding: 14px 0;

        width: 100%;
        max-height: 43px;

        flex: 1;

        border-radius: 2px;
        border: 1px solid #4a4d5c;
        background: #ffffff;

        text-align: center;
        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #4a4d5c;

        &:hover {
          background: #f2f7fa;
        }
      }

      .search-link {
        @extend .extend-search-link;
        border: none;
        margin-right: 0;

        border-radius: 2px;

        background: #1768ac;

        text-transform: uppercase;
        font-family: Raleway;
        line-height: 16px;
        font-weight: 700;
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

      font-size: 15px;
      line-height: 17px;
      color: #4a4d5c;
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
