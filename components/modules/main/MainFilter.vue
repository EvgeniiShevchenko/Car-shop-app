<template>
  <div :class="`filter is-${className}`">
    <form class="filter-form row no-gutters" method="POST">
      <slot name="inject" />
      <ul class="filter-tabs-bar row no-gutters">
        <li class="tabs-bar-item col col-sm-3" :key="index" v-for="(item, index) in statesList">
          <button :class="`tabs-item-btn ${defineStyleTabs(index)}`" type="button" @click="selectFilterStates(index)">{{ item }}</button>
        </li>
      </ul>
      <div class="vin-code-wrapper" v-if="className === 'catalog'">
        <CheckBox class="check-box" :value="isVinCode" label="Проверенный VIN-код" @change="selectVinCode" />
        <CheckBox class="check-box mt-3" :value="isStateNumber" :isLabel="true" @change="selectStateNumber">
          <template slot="label">
            <p class="state-number-label">UA<span class="number-label-text">Гос. номер</span></p>
          </template>
        </CheckBox>
      </div>
      <div class="category-car col-12 mb-3">
        <label class="filter-param-label">Тип транспорта</label>
        <AutocompleteBtn :options="categoryList" :value="type" label="Выбрать" :payload="true" :isReset="!isEmpty(!!type)" @change="selectCategory($event)" @reset="resetTypeField" />
      </div>
      <div class="brend-car col-sm-6 pr-sm-4 mb-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Марка</label>
        <AutocompleteBtn
          :options="brandList"
          :value="brand"
          :payload="true"
          :isPrepend="isEmpty(!!type)"
          :isReset="!isEmpty(!!brand)"
          label="Выбрать"
          prependTitle="Выберите сначало тип"
          @change="selectBrand($event)"
          @focus="checkExistType($event)"
          @reset="resetBrandField"
        />
      </div>
      <div class="model-car col-sm-6 pl-sm-4 mb-3 col-lg-6 pl-lg-4">
        <label class="filter-param-label">Модель</label>
        <AutocompleteBtn
          :options="modelList"
          :value="model"
          :payload="true"
          :isPrepend="isEmpty(!!brand)"
          :isReset="!isEmpty(!!model)"
          label="Выбрать"
          prependTitle="Выберите марку"
          @change="selectModel($event)"
          @focus="checkExistBrand($event)"
          @reset="resetModelField"
        />
      </div>
      <div class="year-begin" v-if="className === 'create-ads'">
        <label class="filter-param-label">Год выпуска</label>
        <AutocompleteBtn
          :options="createYearList"
          :value="createYear"
          :isPrepend="isEmpty(model)"
          :isReset="!isEmpty(createYear)"
          label="Выбрать"
          prependTitle="Выберите сначало модель"
          @change="selectCreateYear($event)"
          @reset="resetCreateYearField"
        />
      </div>
      <div class="modification" v-if="className === 'create-ads'">
        <label class="modification-label">Модификация</label>
        <input class="modification-input" :value="modification" type="text" @input="changeModification" />
      </div>
      <div class="carcas" v-if="/calculator|create-ads/.test(className)">
        <label class="filter-param-label">Тип кузова</label>
        <AutocompleteBtn
          :options="carcaseList"
          :value="carcase"
          :payload="true"
          :isPrepend="className === 'calculator' ? isEmpty(model) : isNull(createYear)"
          :isReset="!isEmpty(carcase)"
          label="Выбрать"
          :prependTitle="`${className === 'calculator' ? 'Выберите сначало модель' : 'Выберите сначало год'}`"
          @change="selectCarcase($event)"
          @reset="resetCarcaseField"
        />
      </div>
      <div class="fuel" v-if="className === 'calculator'">
        <label class="filter-param-label">Топливо</label>
        <SelectBtn :options="fuelList" :value="fuelId" :payload="true" :isReset="!isEmpty(fuelId)" label="Выбрать" @change="selectFuel($event)" @reset="resetFuelField" />
      </div>
      <div class="unit-box" v-if="className === 'calculator'">
        <label class="filter-param-label">КПП</label>
        <SelectBtn
          :options="transmissionList"
          :value="transmissionId"
          :payload="true"
          :isReset="!isEmpty(transmissionId)"
          label="Выбрать"
          @change="selectTransmission($event)"
          @reset="resetTransmissionField"
        />
      </div>
      <div class="location-car col-sm-6 pr-sm-4 mb-3 col-lg-6 pr-lg-4">
        <label class="filter-param-label">Регион</label>
        <AutocompleteBtn
          :options="locationsList"
          :value="location"
          :payload="true"
          :loading="isLocationsLoading"
          :isReset="!isNull(location)"
          label="Выбрать"
          @change="selectLocation($event)"
          @focus="prefetchLocations()"
          @reset="resetFieldLocation"
        />
      </div>
      <div class="city" v-if="/calculator|create-ads/.test(className)">
        <label class="filter-param-label">Город</label>
        <AutocompleteBtn
          :options="cityList"
          :value="city"
          :payload="true"
          :isReset="!isEmpty(city)"
          :isPrepend="isEmpty(location)"
          prependTitle="Выберите регион"
          label="Выбрать"
          @change="selectCity($event)"
          @reset="resetCity"
        />
      </div>
      <div class="customs" v-if="className === 'calculator'">
        <label class="filter-param-label">Растаможка</label>
        <SelectBtn :options="customsList" :value="isCustomsCleared" :payload="true" :isReset="isEmpty(isCustomsCleared)" label="Выбрать" @change="selectCustoms($event)" @reset="resetCustoms" />
      </div>
      <div class="production-year col-sm-6 pl-sm-4 mb-3 col-lg-6 pl-lg-4">
        <AcordionSingle class="acordion-year" :isOpen="0" className="simple" title="Год выпуска">
          <template slot="content">
            <label class="filter-param-label">Год</label>
            <div class="group-wrapper row no-gutters">
              <AutocompleteBtn
                class="col-6 pr-2 col-sm-6 pr-sm-2 pr-md-2 col-lg-6 pr-lg-2"
                :options="yearFromList"
                :value="fromYear"
                :isPrepend="isEmpty(!!model)"
                :isReset="!isEmpty(!!fromYear)"
                label="от"
                prependTitle="Выберите модель"
                @change="selectYearFrom($event)"
                @focus="checkExistModel($event)"
                @reset="resetFieldFrom"
              />
              <AutocompleteBtn
                class="col-6 pl-2 col-sm-6 pl-sm-2 pl-md-2 col-lg-6 pl-lg-2"
                :options="yearToList"
                :value="toYear"
                :isPrepend="isEmpty(!!model)"
                :isReset="!isEmpty(!!toYear)"
                label="до"
                prependTitle="Выберите модель"
                @change="selectYearTo($event)"
                @focus="checkExistModel($event)"
                @reset="resetFieldTo"
              />
            </div>
          </template>
        </AcordionSingle>
      </div>
      <AcordionSingle class="acordion-mileage" v-if="/catalog|calculator|create-ads/.test(this.className) && Number(states) !== 2" :isOpen="0" className="simple" title="Пробег, тыс. км">
        <template slot="content">
          <label class="filter-param-label" v-if="className !== 'catalog'">Пробег</label>
          <div class="group-mileage row no-gutters">
            <input class="mileage-from" :value="mileageFrom" type="number" :placeholder="`${className === 'create-ads' ? 'тыс. км' : 'от'}`" autocomplete @input="changeMileageFrom" />
            <input class="mileage-to" :value="mileageTo" type="number" placeholder="до" autocomplete @input="changeMileageTo" />
          </div>
        </template>
      </AcordionSingle>
      <AcordionSingle class="acordion-transmission" v-if="className === 'catalog' && transmissionList.length" :isOpen="0" className="simple" title="Коробка передач">
        <template slot="content">
          <CheckBoxGroup :value="transmission" :collection="transmissionList" :isOverflow="true" :amountShow="6" @change="selectTransmission" />
        </template>
      </AcordionSingle>
      <AcordionSingle class="acordion-fuel" v-if="className === 'catalog' && fuelList.length" :isOpen="0" className="simple" title="Топливо">
        <template slot="content">
          <CheckBoxGroup :value="fuel" :collection="fuelList" :isOverflow="true" :amountShow="6" @change="selectFuel" />
        </template>
      </AcordionSingle>
      <AcordionSingle class="acordion-drive-unit" v-if="className === 'catalog' && driveUnitList.length" :isOpen="0" className="simple" title="Тип привода">
        <template slot="content">
          <CheckBoxGroup :value="driveUnit" :collection="driveUnitList" :isOverflow="true" :amountShow="6" @change="selectDriveUnit" />
        </template>
      </AcordionSingle>
      <AcordionSingle class="acordion-customs-cleared" v-if="className === 'catalog' && Number(states) !== 2" :isOpen="0" className="simple" title="Растаможенные">
        <template slot="content">
          <ul class="customs-cleared-list" :key="reloadCustom">
            <li class="customs-cleared-item">
              <CheckBox
                class="check-box"
                :value="customsCleared === true ? true : false"
                :isDisabled="/1|2|3/.test(String(states))"
                label="Растаможенные"
                @change="selectСustomsCleared($event === true ? true : null)"
              />
            </li>
            <li class="customs-cleared-item">
              <CheckBox
                class="check-box"
                :value="customsCleared === false ? true : false"
                :isDisabled="/1|2|3/.test(String(states))"
                label="Нерастаможенные"
                @change="selectСustomsCleared($event === true ? false : null)"
              />
            </li>
          </ul>
        </template>
      </AcordionSingle>
      <AcordionSingle class="acordion-abroad" v-if="className === 'catalog' && Number(states) !== 2" :isOpen="0" className="simple" title="Наличие в Украине">
        <template slot="content">
          <ul class="abroad-list">
            <li class="abroad-item">
              <CheckBox
                class="check-box"
                :value="abroad === true ? true : false"
                :isDisabled="/1|2|3/.test(String(states))"
                label="Авто в Украине"
                @change="selectAbroad($event === true ? true : null)"
              />
            </li>
            <li class="abroad-item">
              <CheckBox
                class="check-box"
                :value="abroad === false ? true : false"
                :isDisabled="/1|2|3/.test(String(states))"
                label="Авто не в Украине"
                @change="selectAbroad($event === true ? false : null)"
              />
            </li>
          </ul>
        </template>
      </AcordionSingle>
      <ul class="additional" v-if="className === 'catalog'">
        <li>
          <label class="filter-param-label">Повреждения</label>
          <SelectBtn
            class="filter-select-field"
            :options="damageList"
            :value="damage"
            label="Выбрать"
            :payload="true"
            :isReset="!isNull(damage)"
            @change="selectDamage($event)"
            @reset="resetFieldDamage"
          />
        </li>
        <li>
          <label class="filter-param-label">Не на ходу</label>
          <SelectBtn
            class="filter-select-field"
            :options="brokenList"
            :value="broken"
            :payload="true"
            :isReset="!isNull(broken)"
            label="Выбрать"
            @change="selectBroken($event)"
            @reset="resetFieldBroken"
          />
        </li>
        <li>
          <label class="filter-param-label">Доп. опции</label>
          <AutocompleteBtn
            class="filter-select-field"
            :options="additionalOptionsList"
            :value="additionalSettings"
            :payload="true"
            :isReset="!isNull(additionalSettings)"
            label="Выбрать"
            @change="selectAdditionalSettings($event)"
            @reset="resetFieldAdditionalSettings"
          />
        </li>
        <li>
          <label class="filter-param-label">Сортировка</label>
          <SelectBtn class="filter-select-field" :options="sortList" :value="sort" label="Выбрать" :payload="true" :isReset="!!sort.length" @change="selectSort($event)" @reset="resetFieldSort" />
        </li>
        <li>
          <label class="filter-param-label">Период подачи</label>
          <SelectBtn
            class="filter-select-field"
            :options="publicationTimeList"
            :value="publicationTime"
            :isReset="!!publicationTime.length"
            :payload="true"
            label="Выбрать"
            @change="selectPublicationTime($event)"
            @reset="resetFieldPublicationTime"
          />
        </li>
      </ul>
      <div class="price-car row no-gutters col-12">
        <label class="filter-param-label">Цена</label>
        <div class="row no-gutters col-12">
          <div class="price-general-wrapper row no-gutters col-sm-12 col-lg-6 pr-lg-4">
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
            <SelectBtn class="currancy col-5 pl-4 col-sm-3 pl-sm-4 pl-md-4 col-lg-4 pl-lg-2" :value="currency" :payload="true" :options="currencyList" @change="selectCurrency($event)" />
          </div>
          <div class="price-slider-wrapper col-sm-12 col-lg-6 pl-lg-4">
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
            <div class="mobile-result-frame" v-if="className === 'catalog'">
              <p class="result-show-title">
                {{ results.count }}
                <span class="result-show-subtitle">авто</span>
              </p>
              <button class="result-show-btn" type="button" @click="$emit('show-results')">Показать</button>
            </div>
          </div>
        </div>
      </div>
      <div class="state-number-wrapper mt-3" v-if="className === 'main' && /0|1/.test(String(states))">
        <CheckBox class="check-box mr-4" :value="isVinCode" label="Проверенный VIN-код" @change="selectVinCode" />
        <CheckBox class="check-box" :value="isStateNumber" :isLabel="true" @change="selectStateNumber">
          <template slot="label">
            <p class="state-number-label">UA<span class="number-label-text">Гос. номер</span></p>
          </template>
        </CheckBox>
      </div>
      <div class="search-btn-wrapper">
        <n-link class="extend-search-link" to="/search">Расширенный поиск</n-link>
        <button class="search-link" type="button" @click="startSearch">
          Начать поиск
          <svg class="search-link-icon">
            <use xlink:href="~assets/images/sprites/main.svg#icon-search-btn" />
          </svg>
        </button>
        <button class="cost-btn" v-if="className === 'calculator'" type="button" @click="sendFilterData">Узнать стоимость авто</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// components
import SelectBtn from '~/components/base/SelectBtn.vue';
import AutocompleteBtn from '~/components/base/AutocompleteBtn.vue';
import DragSlider from '~/components/base/DragSlider.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
import AcordionSingle from '~/components/base/AcordionSingle.vue';
// helpers
import sortList from '~/helpers/sortList.js';
import publicationTimeList from '~/helpers/publicationTimeList.js';
// mixins
import saveFilterParamNameInLocalStorage from '~/mixins/saveFilterParamNameInLocalStorage.js';
import deleteFilterParamNameInLocalStorage from '~/mixins/deleteFilterParamNameInLocalStorage.js';
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';
import isNull from '~/mixins/isNull.js';
import isEmpty from '~/mixins/isEmpty.js';

export default {
  name: 'MainFilter',
  mixins: [saveFilterParamNameInLocalStorage, deleteFilterParamNameInLocalStorage, transformArrayForSelectBtn, isNull, isEmpty],
  data() {
    return {
      statesList: ['Все', 'Б/у', 'Новые', this.$i18n.t('под-пригон')],
      locationsList: [],
      currencyList: [],
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
      transmissionList: [],
      fuelList: [],
      driveUnitList: [],
      additionalOptionsList: [],
      customsClearedList: ['Растаможенные', 'Нерастаможенные'],
      abroadList: ['Авто в Украине', 'Авто не в Украине'],
      damageList: [
        { text: 'Битые', value: true },
        { text: 'Не битые', value: false },
      ],
      brokenList: [
        { text: 'Только не на ходу', value: true },
        { text: 'Скрыть не на ходу', value: false },
      ],
      sortList: sortList,
      publicationTimeList: publicationTimeList,
      cityList: [],
      carcase: '',
      carcaseList: [],
      fuelId: '',
      transmissionId: '',
      isCustomsCleared: true,
      customsList: [
        { text: 'растаможен', value: true },
        { text: 'Не растаможен', value: false },
      ],
      createYear: null,
      createYearList: [],
      modification: '',
      reloadCustom: false,
    };
  },
  computed: {
    ...mapState({
      states: (state) => state.filter.filter.states,
      type: (state) => state.filter.filter.type,
      brand: (state) => state.filter.filter.brand,
      model: (state) => state.filter.filter.model,
      currency: (state) => state.filter.filter.currency,
      fromYear: (state) => state.filter.filter.productionYearFrom,
      toYear: (state) => state.filter.filter.productionYearTo,
      location: (state) => state.filter.filter.location,
      fixedMaxPrice: (state) => state.filter.defaultValues.priceRange.max,
      fixedMinPrice: (state) => state.filter.defaultValues.priceRange.min,
      maxPrice: (state) => state.filter.filter.priceMax,
      minPrice: (state) => state.filter.filter.priceMin,
      mileageFrom: (state) => state.filter.filter.mileageFrom,
      mileageTo: (state) => state.filter.filter.mileageTo,
      transmission: (state) => state.filter.filter.transmission,
      fuel: (state) => state.filter.filter.fuel,
      driveUnit: (state) => state.filter.filter.driveUnit,
      broken: (state) => state.filter.filter.broken,
      damage: (state) => state.filter.filter.damage,
      additionalSettings: (state) => state.filter.filter.additionalSettings,
      sort: (state) => state.filter.filter.sort,
      isVinCode: (state) => state.filter.filter.isVinCode,
      isStateNumber: (state) => state.filter.filter.isStateNumber,
      publicationTime: (state) => state.filter.filter.publicationTime,
      categoryList: (state) => state.filter.collections.categoryList,
      brandList: (state) => state.filter.collections.brandList,
      modelList: (state) => state.filter.collections.modelList,
      yearFromList: (state) => state.filter.collections.yearFromList,
      yearToList: (state) => state.filter.collections.yearToList,
      abroad: (state) => state.filter.filter.abroad,
      customsCleared: (state) => state.filter.filter.customsCleared,
      city: (state) => state.filter.filter.city,
    }),
  },
  methods: {
    selectСustomsCleared(selectOption) {
      this.setCustomsCleared(selectOption);
    },

    resetСustomsCleared() {
      this.resetCustomsCleared();
    },

    selectAbroad(selectOption) {
      this.setAbroad(selectOption);
    },

    resetAbroad() {
      this.resetAbroad();
    },

    sendFilterData() {
      const filterData = {
        is_cleared: this.isCustomsCleared,
        car_type_id: this.type,
        car_mark_id: this.brand,
        car_model_id: this.model,
        region_id: this.location,
        city_id: this.city,
        transmission_id: this.transmissionId ? [this.transmissionId] : [],
        fuel_id: this.fuelId ? [this.fuelId] : [],
      };

      this.$emit('send-data', filterData);
    },

    selectVinCode(e) {
      if (e) {
        this.saveFilterParamNameInLocalStorage('vin_code_verified', 'Проверенный VIN-код');

        this.setVinCode(e);
        return;
      }

      this.deleteFilterParamNameInLocalStorage(['vin_code_verified']);
      this.resetVinCode();
    },

    selectStateNumber(e) {
      if (e) {
        this.saveFilterParamNameInLocalStorage('number_car', 'Гос. номер');

        this.setStateNumber(e);
        return;
      }

      this.deleteFilterParamNameInLocalStorage(['number_car']);
      this.resetStateNumber(e);
    },

    changeMileageFrom(e) {
      const value = Number(e.target.value);

      this.setMileageFrom(value);

      if (!this.isEmpty(this.mileageFrom) && this.mileageTo < this.mileageFrom) {
        this.setMileageTo(this.mileageFrom);

        this.saveFilterParamNameInLocalStorage('mileage_to', `Пробег. до ${this.mileageTo}тыс.`);
      }

      this.saveFilterParamNameInLocalStorage('mileage_from', `Пробег. от ${this.mileageFrom}тыс.`);
    },

    changeMileageTo(e) {
      const value = Number(e.target.value);

      this.setMileageTo(value);

      if (!this.isEmpty(this.mileageTo) && this.isEmpty(this.mileageFrom)) {
        this.setMileageFrom(1);

        this.saveFilterParamNameInLocalStorage('mileage_from', `Пробег. от ${this.mileageFrom}тыс.`);
      }

      this.saveFilterParamNameInLocalStorage('mileage_to', `Пробег. до ${this.mileageTo}тыс.`);
    },

    resetTypeField() {
      this.resetType();
      this.resetFieldBrand();
      this.resetFieldModel();
      this.resetFieldsFromAndTo();
      this.deleteFilterParamNameInLocalStorage(['car_type_id', 'car_mark_id', 'car_model_id', 'year_from', 'year_to']);

      if (this.className === 'calculator') this.resetCarcase();
      if (this.className === 'create-ads') {
        this.resetCarcase();
        this.resetCreateYearField();
      }
    },

    resetBrandField() {
      this.resetBrand();
      this.resetFieldModel();
      this.resetFieldsFromAndTo();
      this.deleteFilterParamNameInLocalStorage(['car_mark_id', 'car_model_id', 'year_from', 'year_to']);

      if (this.className === 'calculator') this.resetCarcase();
      if (this.className === 'create-ads') {
        this.resetCarcase();
        this.resetCreateYearField();
      }
    },

    resetModelField() {
      this.resetModel();
      this.resetFieldsFromAndTo();
      this.deleteFilterParamNameInLocalStorage(['car_model_id', 'year_from', 'year_to']);

      if (this.className === 'calculator') this.resetCarcase();
      if (this.className === 'create-ads') {
        this.resetCarcase();
        this.resetCreateYearField();
      }
    },

    resetCarcaseField() {
      this.carcase = '';

      this.$emit('change-carcase', null);
    },

    resetCreateYearField() {
      this.createYear = null;
      this.createYearList = [];
      this.resetCarcase();

      this.$emit('change-year', null);
    },

    resetFuelField() {
      this.fuelId = '';
    },

    resetTransmissionField() {
      this.transmissionId = '';
    },

    resetCarcase() {
      this.carcase = '';
      this.carcaseList = [];

      this.$emit('change-carcase', null);
    },

    resetFieldFrom() {
      this.resetFilterProductionYearFrom();
      this.deleteFilterParamNameInLocalStorage(['year_from']);
    },

    resetFieldTo() {
      this.resetFilterProductionYearTo();
      this.deleteFilterParamNameInLocalStorage(['year_to']);
    },

    resetFieldLocation() {
      this.resetLocation();
      this.deleteFilterParamNameInLocalStorage(['location_id']);

      if (/calculator|createAds/.test(this.className)) {
        this.resetFilterCity();
        this.cityList = [];
      }
    },

    resetCity() {
      this.resetFilterCity();
    },

    resetFieldBroken() {
      this.resetBroken();
      this.deleteFilterParamNameInLocalStorage(['is_not_go']);
    },

    resetFieldDamage() {
      this.resetDamage();
      this.deleteFilterParamNameInLocalStorage(['is_broken']);
    },

    resetFieldAdditionalSettings() {
      this.resetAdditionalSettings();
      this.deleteFilterParamNameInLocalStorage(['car_comfort_id']);
    },

    resetFieldSort() {
      this.resetSort();
      this.deleteFilterParamNameInLocalStorage(['sort']);
    },

    resetFieldPublicationTime() {
      this.resetPublicationTime();
      this.deleteFilterParamNameInLocalStorage(['date']);
    },

    selectTransmission(optionList) {
      if (this.className === 'calculator') {
        this.transmissionId = optionList.value;

        return;
      }

      this.saveFilterParamNameInLocalStorage(
        'transmission_id',
        optionList.map((item) => this.transmissionList.find((param) => param.value === item).text)
      );

      this.setTransmission(optionList);
    },

    selectFuel(optionList) {
      if (this.className === 'calculator') {
        this.fuelId = optionList.value;

        return;
      }

      this.saveFilterParamNameInLocalStorage(
        'fuel_id',
        optionList.map((item) => this.fuelList.find((param) => param.value === item).text)
      );

      this.setFuel(optionList);
    },

    selectDriveUnit(optionList) {
      this.saveFilterParamNameInLocalStorage(
        'drive_unit_id',
        optionList.map((item) => this.driveUnitList.find((param) => param.value === item).text)
      );

      this.setDriveUnit(optionList);
    },

    selectPublicationTime({ text, value }) {
      this.saveFilterParamNameInLocalStorage('date', text);

      this.setPublicationTime(value);
    },

    selectSort({ text, value }) {
      this.saveFilterParamNameInLocalStorage('sort', text);

      this.setSort(value);
    },

    selectAdditionalSettings({ text, value }) {
      this.saveFilterParamNameInLocalStorage('car_comfort_id', text);

      this.setAdditionalSettings(value);
    },

    selectDamage({ text, value }) {
      this.saveFilterParamNameInLocalStorage('is_broken', text);
      this.setDamage(value);
    },

    selectBroken({ text, value }) {
      this.saveFilterParamNameInLocalStorage('is_not_go', text);
      this.setBroken(value);
    },

    changePriceFrom(e) {
      const value = e.target.value;

      if (/^\d*$/.test(value) && Number(value) < this.maxPrice) {
        this.setPriceMin(Number(value));

        this.minPrice !== this.fixedMinPrice ? this.saveFilterParamNameInLocalStorage('price_min', `Мин. цена ${this.minPrice}`) : this.deleteFilterParamNameInLocalStorage(['price_min']);

        return;
      }

      e.target.value = this.minPrice;
    },

    changePriceTo(e) {
      const value = e.target.value;

      if (/^\d*$/.test(value) && Number(value) < this.fixedMaxPrice) {
        this.setPriceMax(Number(value));

        this.maxPrice !== this.fixedMaxPrice ? this.saveFilterParamNameInLocalStorage('price_max', `Макс. цена ${this.maxPrice}`) : this.deleteFilterParamNameInLocalStorage(['price_max']);

        return;
      }

      e.target.value = this.maxPrice;
    },

    startSearch() {
      this.$router.push(
        `catalog?status=${this.states}&car_type_id=${this.type}&car_mark_id=${this.brand}&car_model_id=${this.model}&location=${this.location}&year_from=${this.fromYear}&year_to=${this.toYear}&currency_id=${this.currency}&price_max=${this.maxPrice}&price_min=${this.minPrice}`
      );
    },

    defineStyleTabs(index) {
      let className = '';

      if (index === Number(this.states)) className = 'is-select ';
      return index === 0 ? className + ' is-border-left' : index === 3 ? className + ' is-border-right' : className;
    },

    selectFilterStates(typeIndex) {
      this.setFilterStates(typeIndex);
    },

    async selectCategory(param) {
      this.saveFilterParamNameInLocalStorage('car_type_id', param.text);

      if (this.brand) {
        this.resetFieldBrand();
        this.resetFieldModel();
        this.resetFieldsFromAndTo();
      }

      this.setType(param.value);

      try {
        const { data } = await this.$axios.$get(`filters/marks?type=${param.value}`, { method: 'GET' });

        this.setBrandList(this.transformArrayForSelectBtn(data.marks));
      } catch (error) {
        console.error(error);
      }

      try {
        const { transmissions, driveUnits, fuels } = (await this.$axios.$get(`filters/characteristic?type=${param.value}`)).data;

        this.transmissionList = this.transformArrayForSelectBtn(transmissions);
        this.fuelList = this.transformArrayForSelectBtn(fuels);
        this.driveUnitList = this.transformArrayForSelectBtn(driveUnits);
      } catch (error) {
        console.error(error);
      }

      try {
        this.additionalOptionsList = this.transformArrayForSelectBtn((await this.$axios.$get(`filters/carAnother?type=${this.type}`)).data.carAnother);
      } catch (error) {
        console.error(error);
      }
    },

    async selectBrand({ text, value }) {
      this.saveFilterParamNameInLocalStorage('car_mark_id', text);

      if (this.model) {
        this.resetFieldModel();
        this.resetFieldsFromAndTo();
      }

      this.setBrand(value);

      try {
        const { data } = await this.$axios.$get(`filters/models?type=${this.type}&mark=${value}`, { method: 'GET' });

        this.setModelList(this.transformArrayForSelectBtn(data.models));
      } catch (error) {
        console.error(error);
      }
    },

    resetFieldBrand() {
      this.resetBrand();
      this.resetBrandList();
    },

    checkExistType() {
      if (!this.type.length) {
        this.hasType = true;

        return;
      }

      this.hasType = false;
    },

    async selectModel({ text, value }) {
      this.saveFilterParamNameInLocalStorage('car_model_id', text);

      if (this.yearFromList.length || this.yearToList.length) this.resetFieldsFromAndTo();

      this.setModel(value);

      try {
        const { data } = await this.$axios.$get(`filters/years?type=${this.type}&model=${value}`, { method: 'GET' });

        this.setYearFromList(this.transformArrayForSelectBtn(data.years));
        this.setYearToList(this.transformArrayForSelectBtn(data.years));
      } catch (error) {
        console.error(error);
      }

      if (this.className === 'calculator') {
        this.carcase = '';

        try {
          const { data } = await this.$axios.$get(`filters/series?type=${this.type}&model=${this.model}&year=${this.collection.year_begin}`);

          this.carcaseList = this.transformArrayForSelectBtn(data.series);
        } catch (error) {
          console.error(error);
        }
      }

      if (this.className === 'create-ads') {
        try {
          this.createYearList = (await this.$axios.$get(`filters/generations?car_type_id=${this.type}&car_model_id=${this.model}`)).data.generations
            .filter((item) => !this.isNull(item.year_begin))
            .map((item) => item.year_begin)
            .sort();
        } catch (error) {
          console.error(error);
        }
      }
    },

    selectCarcase({ text, value }) {
      this.carcase = value;

      this.$emit('change-carcase', value);
    },

    async selectCreateYear(year) {
      this.createYear = year;
      this.$emit('change-year', year);

      try {
        this.carcaseList = this.transformArrayForSelectBtn((await this.$axios.$get(`filters/series?type=${this.type}&model=${this.model}&year=${year}`)).data.series);
      } catch (error) {
        console.error(error);
      }
    },

    changeModification(e) {
      this.modification = e.target.value;

      this.$emit('change-modification', this.modification);
    },

    resetCreateYear() {
      this.createYear = null;

      this.$emit('change-year', null);
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
      this.resetModelList();
    },

    async selectLocation({ text, value }) {
      this.saveFilterParamNameInLocalStorage('location_id', text);
      this.setLocation(value);

      if (/calculator|create-ads/.test(this.className)) {
        try {
          const { data } = await this.$axios.$get(`filters/cities?region=${value}`);

          this.cityList = this.transformArrayForSelectBtn(data.cities);
        } catch (error) {
          console.error(error);
        }
      }
    },

    selectCity({ value }) {
      this.setFilterCity(value);
    },

    selectCustoms({ value }) {
      this.isCustomsCleared = value;
    },

    resetCustoms() {
      this.isCustomsCleared = true;
    },

    async prefetchLocations() {
      if (this.locationsList.length) return;

      try {
        this.isLocationsLoading = true;

        const { data } = await this.$axios.$get(`filters/regions`, { method: 'GET' });

        this.locationsList = this.transformArrayForSelectBtn(data.regions);

        this.isLocationsLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    selectYearFrom(year) {
      this.saveFilterParamNameInLocalStorage('year_from', year);

      this.setFilterProductionYearFrom(year);
    },

    selectYearTo(year) {
      this.saveFilterParamNameInLocalStorage('year_to', year);

      this.setFilterProductionYearTo(year);
    },

    checkExistModel() {
      if (!this.modelList.length) {
        this.hasModel = true;

        return;
      }

      this.hasModel = false;
    },

    resetFieldsFromAndTo() {
      this.resetFilterProductionYearFrom();
      this.resetFilterProductionYearTo();
      this.resetYearFromList();
      this.resetYearToList();
    },

    async selectCurrency(currency) {
      try {
        const { data } = await this.$axios.$get(`filters/prices?currency=${currency.value}`, { method: 'GET' });
        const { min, max } = data;

        this.setFixedMinPrice(min);
        this.setFixedMaxPrice(max);
        this.setPriceMin(min);
        this.setPriceMax(max);

        this.updateSlaider = !this.updateSlaider;
      } catch (error) {
        console.error(error);
      }

      this.setCurrency(currency.value);
      this.saveFilterParamNameInLocalStorage('currency_id', currency.text);
    },

    handlerDragSlider(value) {
      if (value[1] === this.maxPrice && value[0] !== this.minPrice) {
        this.setPriceMin(value[0]);

        this.minPrice !== this.fixedMinPrice ? this.saveFilterParamNameInLocalStorage('price_min', `Мин. цена ${this.minPrice}`) : this.deleteFilterParamNameInLocalStorage(['price_min']);
      } else {
        this.setPriceMax(value[1]);

        this.maxPrice !== this.fixedMaxPrice ? this.saveFilterParamNameInLocalStorage('price_max', `Макс. цена ${this.maxPrice}`) : this.deleteFilterParamNameInLocalStorage(['price_max']);
      }
    },

    ...mapActions({
      setFilterStates: 'filter/setFilterStates',
      setType: 'filter/setFilterType',
      resetType: 'filter/resetFilterType',
      setBrand: 'filter/setFilterBrand',
      resetBrand: 'filter/resetFilterBrand',
      setModel: 'filter/setFilterModel',
      resetModel: 'filter/resetFilterModel',
      setLocation: 'filter/setFilterLocation',
      resetLocation: 'filter/resetFilterLocation',
      setFilterProductionYearFrom: 'filter/setFilterProductionYearFrom',
      resetFilterProductionYearFrom: 'filter/resetFilterProductionYearFrom',
      setFilterProductionYearTo: 'filter/setFilterProductionYearTo',
      resetFilterProductionYearTo: 'filter/resetFilterProductionYearTo',
      setCurrency: 'filter/setFilterCurrency',
      setDefaultCurrency: 'filter/setDefaultCurrency',
      setFixedMaxPrice: 'filter/setFilterPriceRangeMax',
      setFixedMinPrice: 'filter/setFilterPriceRangeMin',
      setPriceMax: 'filter/setPriceMax',
      setPriceMin: 'filter/setPriceMin',
      setVinCode: 'filter/setVinCode',
      resetVinCode: 'filter/resetVinCode',
      setStateNumber: 'filter/setStateNumber',
      resetStateNumber: 'filter/resetStateNumber',
      setMileageFrom: 'filter/setMileageFrom',
      resetMileageFrom: 'filter/resetMileageFrom',
      setMileageTo: 'filter/setMileageTo',
      resetMileageTo: 'filter/resetMileageTo',
      setBroken: 'filter/setBroken',
      resetBroken: 'filter/resetBroken',
      setCategoryList: 'filter/setCategoryList',
      resetCategoryList: 'filter/resetCategoryList',
      setBrandList: 'filter/setBrandList',
      resetBrandList: 'filter/resetBrandList',
      setModelList: 'filter/setModelList',
      resetModelList: 'filter/resetModelList',
      setYearFromList: 'filter/setYearFromList',
      resetYearFromList: 'filter/resetYearFromList',
      setYearToList: 'filter/setYearToList',
      resetYearToList: 'filter/resetYearToList',
      setTransmission: 'filter/setTransmission',
      resetTransmission: 'filter/resetTransmission',
      setFuel: 'filter/setFuel',
      resetFuel: 'filter/resetFuel',
      setBroken: 'filter/setBroken',
      resetBroken: 'filter/resetBroken',
      setDamage: 'filter/setDamage',
      resetDamage: 'filter/resetDamage',
      setSort: 'filter/setSort',
      resetSort: 'filter/resetSort',
      setPublicationTime: 'filter/setPublicationTime',
      resetPublicationTime: 'filter/resetPublicationTime',
      setDriveUnit: 'filter/setDriveUnit',
      setAdditionalSettings: 'filter/setAdditionalSettings',
      resetAdditionalSettings: 'filter/resetAdditionalSettings',
      initialFilterPriceRange: 'filter/initialFilterPriceRange',
      setFilterCity: 'filter/setFilterCity',
      resetFilterCity: 'filter/resetFilterCity',
      resetAbroad: 'filter/resetAbroad',
      setAbroad: 'filter/setAbroad',
      setCustomsCleared: 'filter/setCustomsCleared',
      resetCustomsCleared: 'filter/resetCustomsCleared',
    }),
  },
  async mounted() {
    try {
      (async () => {
        const { data } = await this.$axios.$get(`filters/types`, { method: 'GET' });

        this.setCategoryList(this.transformArrayForSelectBtn(data.types));
      })();

      (async () => {
        const { data } = await this.$axios.$get(`filters/prices`, { method: 'GET' });
        const { min, max } = data;

        if (this.className !== 'catalog') {
          this.setPriceMin(min);
          this.setPriceMax(max);
        } else {
          this.initialFilterPriceRange({ minPrice: min, maxPrice: max });
        }

        this.setFixedMinPrice(min);
        this.setFixedMaxPrice(max);
      })();
    } catch (error) {
      console.log(error);
    }

    (async () => {
      const { data } = await this.$axios.$get(`filters/currencies`, { method: 'GET' });

      this.currencyList = this.transformArrayForSelectBtn(data.currencies);

      this.setDefaultCurrency(data.current_default.id);

      if (this.className !== 'catalog') {
        this.setCurrency(data.current_default.id);
      }
    })();

    if (/catalog|calculator/.test(this.className)) {
      if (this.className === 'calculator' && !this.isEmpty(this.model)) {
        try {
          const { data } = await this.$axios.$get(`filters/series?type=${this.type}&model=${this.model}&year=${this.collection.year_begin}`);

          this.carcaseList = this.transformArrayForSelectBtn(data.series);
        } catch (error) {
          console.error(error);
        }
      }
    }

    this.$nextTick(async () => {
      if (this.type) {
        try {
          const { data } = await this.$axios.$get(`filters/marks?type=${this.type}`, { method: 'GET' });

          this.setBrandList(this.transformArrayForSelectBtn(data.marks));
        } catch (error) {
          console.error(error);
        }

        try {
          const { transmissions, driveUnits, fuels } = (await this.$axios.$get(`filters/characteristic?type=${this.type}`)).data;

          this.transmissionList = this.transformArrayForSelectBtn(transmissions);
          this.fuelList = this.transformArrayForSelectBtn(fuels);
          this.driveUnitList = this.transformArrayForSelectBtn(driveUnits);
        } catch (error) {
          console.error(error);
        }

        try {
          this.additionalOptionsList = this.transformArrayForSelectBtn((await this.$axios.$get(`filters/carAnother?type=${this.type}`)).data.carAnother);
        } catch (error) {
          console.error(error);
        }
      }

      if (this.brand) {
        try {
          const { data } = await this.$axios.$get(`filters/models?type=${this.type}&mark=${this.brand}`, { method: 'GET' });

          this.setModelList(this.transformArrayForSelectBtn(data.models));
        } catch (error) {
          console.error(error);
        }
      }

      if (this.model) {
        try {
          const { data } = await this.$axios.$get(`filters/years?type=${this.type}&model=${this.model}`, { method: 'GET' });

          this.setYearFromList(this.transformArrayForSelectBtn(data.years));
          this.setYearToList(this.transformArrayForSelectBtn(data.years));
        } catch (error) {
          console.error(error);
        }

        if (className === 'create-ads') {
          try {
            this.createYearList = (await this.$axios.$get(`filters/generations?car_type_id=${this.type}&car_model_id=${this.model}`)).data.generations.map((item) => item.year_begin);
          } catch (error) {
            console.error(error);
          }
        }
      }

      if (this.createYear) {
        try {
          this.carcaseList = (await this.$axios.$get(`filters/series?type=${this.type}&model=${this.model}&year=${this.createYear}`)).data.series.map((item) => ({ text: item.name, value: item.id }));
        } catch (error) {
          console.error(error);
        }
      }
    });
  },
  props: {
    className: {
      type: String,
      default: 'main',
    },
    results: {
      type: Object,
    },
    collection: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AutocompleteBtn,
    AcordionSingle,
    SelectBtn,
    DragSlider,
    CheckBox,
    CheckBoxGroup,
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

    .vin-code-wrapper {
      padding-bottom: 16px;
      margin-bottom: 16px;

      width: 100%;
      box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);

      .state-number-label {
        display: flex;
        align-items: center;

        margin-bottom: 0;
        padding: 0 1px 0 4px;

        height: 24px;

        border-radius: 2px;
        background: #d6e1e7;
        font-size: 13px;
        line-height: 16px;

        .number-label-text {
          padding: 3px 8px;
          margin-left: 4px;

          background: #ffffff;
          font-size: 13px;
          line-height: 16px;
        }
      }
    }

    .state-number-wrapper {
      display: flex;

      .state-number-label {
        display: flex;
        align-items: center;

        margin-bottom: 0;
        padding: 0 1px 0 4px;

        height: 24px;

        border-radius: 2px;
        background: #d6e1e7;
        font-size: 13px;
        line-height: 16px;

        .number-label-text {
          padding: 3px 8px;
          margin-left: 4px;

          background: #ffffff;
          font-size: 13px;
          line-height: 16px;
        }
      }
    }

    .acordion-mileage {
      order: 3;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }

      .group-mileage {
        display: flex;
        justify-content: space-between;

        margin-top: 12px;

        .mileage-from {
          margin-top: 6px;
          padding-left: 8px;
          outline: none;

          width: calc(50% - 8px);
          height: 36px;

          border-radius: 2px;
          border: 1px solid #8fa5b0;
          background: #ffffff;

          &::placeholder {
            color: #8fa5b0;
          }

          &:focus {
            border: 1px solid #51a9f2;
          }
        }

        .mileage-to {
          @extend .mileage-from;
        }
      }
    }

    .acordion-transmission {
      order: 4;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }
    }

    .acordion-fuel {
      order: 5;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }

      .fuel-list {
        margin-top: 12px;

        & li:first-child {
          margin-top: 0;
        }

        .fuel-item {
          margin-top: 12px;
        }
      }
    }

    .acordion-drive-unit {
      order: 6;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }

      .fuel-list {
        margin-top: 12px;

        & li:first-child {
          margin-top: 0;
        }

        .fuel-item {
          margin-top: 12px;
        }
      }
    }

    .acordion-customs-cleared {
      order: 7;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }

      .customs-cleared-list {
        margin-top: 12px;

        & li:first-child {
          margin-top: 0;
        }

        .customs-cleared-item {
          margin-top: 12px;
        }
      }
    }

    .acordion-abroad {
      order: 8;

      & ::v-deep .v-expansion-panel-header {
        .accordion-title {
          color: #4a4d5c;
        }
      }

      .abroad-list {
        margin-top: 12px;

        & li:first-child {
          margin-top: 0;
        }

        .abroad-item {
          margin-top: 12px;
        }
      }
    }

    .modification {
      padding-right: 16px;
      margin-top: 16px;

      max-width: calc(100% / 2);
      width: 100%;
      order: 9;

      .modification-label {
        display: block;
        color: #4a4d5c !important;
      }

      .modification-input {
        margin-top: 6px;
        width: 100%;

        @extend .input-text-classic;
      }
    }

    .additional {
      width: 100%;
      order: 9;

      .filter-param-label {
        margin-top: 16px;
      }

      .filter-select-field {
        padding: 0;
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

      .price-slider-wrapper {
        .mobile-result-frame {
          position: absolute;
          display: none;
          align-items: center;
          justify-content: space-between;

          padding: 0 12px;
          margin: 0 -12px 0 -12px;

          top: 0;
          left: 0;
          bottom: 0;
          right: 0;

          background: #ffffff;
          z-index: 100;

          .result-show-title {
            margin-bottom: 0;

            font-size: 14px;
            font-weight: 500;
            line-height: 17px;
            color: #222329;

            .result-show-subtitle {
              margin-left: 4px;
              font-weight: normal;
            }
          }

          .result-show-btn {
            padding: 10px 27px;

            border-radius: 2px;
            background: #1768ac;

            font-size: 15px;
            font-weight: 500;
            line-height: 15px;
            color: #ffffff;

            &:hover {
              background: #0e4c80;
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

      .cost-btn {
        @extend .search-link;
        font-family: Rubik;
        font-weight: 500;
        line-height: 15px;
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

.is-main .filter-form {
  .production-year {
    .acordion-year {
      ::v-deep .v-expansion-panel {
        padding: 0;
        border: none;
        background: none;
        box-shadow: none;

        &::before {
          content: none;
        }

        .v-expansion-panel-header {
          display: none;
        }

        .v-expansion-panel-content__wrap {
          padding: 0;
        }
      }
    }
  }
}

.is-catalog {
  padding: 16px 12px;
  background: #f2f7fa;

  &::before {
    content: none;
  }

  .filter-form {
    .filter-tabs-bar {
      display: none;
    }

    .search-btn-wrapper {
      display: none;
    }

    .brend-car {
      flex: none;
      padding: 0 !important;
      max-width: 100%;
    }

    .model-car {
      flex: none;
      padding: 0 !important;
      max-width: 100%;
    }

    .location-car {
      flex: none;
      padding: 0 0 16px 0 !important;
      max-width: 100%;

      box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);
    }

    .production-year {
      flex: none;
      padding: 0 !important;
      margin-bottom: 0 !important;
      max-width: 100%;

      order: 2;

      .filter-param-label {
        display: none;
      }

      .group-wrapper {
        margin-top: 12px;
      }
    }

    .price-car {
      flex: none;
      padding: 0 0 22px 0 !important;

      max-width: 100%;

      box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);

      order: 1;

      .price-general-wrapper {
        flex: none;
        padding: 0 !important;

        max-width: 100%;
      }

      .price-slider-wrapper {
        flex: none;
        margin-top: 17px;
        padding: 0 !important;

        max-width: 100%;

        ::v-deep .vue-slider {
          .vue-slider-process {
            background-color: #4cad33;
          }

          .slider-dot {
            border: 7px solid #4cad33;
          }
        }
      }
    }
  }
}

.is-calculator {
  @extend .is-main;
  padding: 0;
  background: none;

  &::before {
    content: none;
  }

  .filter-form {
    .category-car {
      max-width: calc(100% / 2);
      padding-right: 16px;

      order: 1;
    }

    .brend-car {
      margin-top: 12px;

      order: 5;
    }

    .model-car {
      padding-left: 0 !important;
      padding-right: 16px;

      order: 7;
    }

    .carcas {
      max-width: calc(100% / 2);
      width: 100%;
      padding-right: 16px;

      order: 3;
    }

    .fuel {
      padding-left: 16px;
      max-width: calc(100% / 2);
      width: 100%;

      order: 8;
    }

    .unit-box {
      padding-left: 16px;
      margin-top: 12px;

      max-width: calc(100% / 2);
      width: 100%;

      order: 6;
    }

    .location-car {
      padding-right: 0 !important;
      padding-left: 16px;

      order: 2;
    }

    .city {
      max-width: calc(100% / 2);
      width: 100%;
      padding-left: 16px;

      order: 4;
    }

    .production-year {
      padding-left: 0 !important;
      padding-right: 16px;

      order: 9;
    }

    .acordion-mileage {
      max-width: calc(100% / 2);
      padding-left: 16px;

      order: 10;

      ::v-deep .accordion {
        padding: 0;
        box-shadow: none;

        .v-expansion-panel-header {
          display: none;
        }

        .v-expansion-panel-content {
          margin-top: 0;

          .filter-param-label {
            margin-bottom: 0;
          }

          .group-mileage {
            margin-top: 0;
          }
        }
      }
    }

    .filter-tabs-bar {
      display: none;
    }

    .price-car {
      display: none;
    }

    .customs {
      max-width: calc(100% / 2);
      width: 100%;
      padding-right: 16px;

      order: 11;
    }

    .search-btn-wrapper {
      padding-left: 16px;
      max-width: calc(100% / 2);
      width: 100%;

      order: 12;

      .extend-search-link {
        display: none;
      }

      .search-link {
        display: none;
      }
    }
  }
}

.is-create-ads {
  @extend .is-calculator;
}

@include sm {
  .filter::before {
    background: #f2f7fa;
    border-radius: 0;
  }
}

@include xs {
  .is-calculator .filter-form {
    .category-car {
      max-width: 100%;
      padding: 0;
    }

    .model-car {
      padding: 0;
      margin-top: 12px;
    }

    .carcas {
      max-width: 100%;
      padding: 0;
    }

    .fuel {
      max-width: 100%;
      padding: 0;
    }

    .unit-box {
      padding: 0;
      margin-top: 0;
      max-width: 100%;
    }

    .location-car {
      padding: 0;
    }

    .city {
      padding: 0;
      margin-top: 12px;
      max-width: 100%;
    }

    .customs {
      padding: 0;
      margin-top: 12px;
      max-width: 100%;
    }

    .production-year {
      padding: 0;
      margin-top: 12px;
    }

    .acordion-mileage {
      max-width: 100%;
      padding: 0;
    }

    .search-btn-wrapper {
      padding: 0;
      max-width: max-content;

      .cost-btn {
        padding: 14px 20px;
      }
    }
  }

  .is-create-ads .filter-form {
    .category-car {
      max-width: 100%;
      padding: 0;
    }

    .model-car {
      padding: 0;
      margin-top: 12px;
    }

    .carcas {
      max-width: 100%;
      padding: 0;
    }

    .fuel {
      max-width: 100%;
      padding: 0;
    }

    .unit-box {
      padding: 0;
      margin-top: 0;
      max-width: 100%;
    }

    .location-car {
      padding: 0;
    }

    .city {
      padding: 0;
      margin-top: 12px;
      max-width: 100%;
    }

    .customs {
      padding: 0;
      margin-top: 12px;
      max-width: 100%;
    }

    .production-year {
      padding: 0;
      margin-top: 12px;
    }

    .acordion-mileage {
      max-width: 100%;
      padding: 0;
    }

    .search-btn-wrapper {
      padding: 0;
      max-width: max-content;

      .cost-btn {
        padding: 14px 20px;
      }
    }
  }

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

@include md {
  .is-catalog .filter-form .price-car {
    .currancy {
      padding-left: 8px !important;

      max-width: 40%;
      flex: 0 0 40%;
    }

    .price-wrapper {
      max-width: 60%;
    }
  }
}
</style>
