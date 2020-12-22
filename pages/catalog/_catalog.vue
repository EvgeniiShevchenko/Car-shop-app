<template>
  <main class="main container">
    <div class="row no-gutters">
      <div class="history-routing col-12">
        <n-link class="routing-home-link" to="/">
          <svg class="home-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-home" />
          </svg>
        </n-link>
        <ul class="routing-list">
          <li class="routing-item">
            <n-link class="routing-item-link" to="catalog">
              <svg class="routing-link-icon">
                <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-arrow" />
              </svg>
              {{ getPagePathName }}
            </n-link>
          </li>
        </ul>
      </div>
      <h1 class="catalog-title col-11">{{ getPageTitle }}</h1>
      <CatalogSubscrible
        class="subscrible-wrapper"
        v-if="$vuetify.breakpoint.smAndDown"
        className="mobile"
        :searchResult="Object.values(searchResult)"
        @subscrible="subscrible"
        @social-subscrible="socialSubscrible"
      />
      <div class="mobile-btn-wrapper col-12" v-if="$vuetify.breakpoint.smAndDown">
        <SelectBtn
          class="mobile-sort-btn"
          :options="sortParams[1]"
          :value="sort"
          label="Сортировка"
          :payload="true"
          :isReset="!!sort.length"
          @change="sortCardsParam($event)"
          @reset="resetFieldSort"
        />
        <button class="mobile-filter-btn" type="submit" @click="displayFilter">
          <svg class="filter-btn-icon">
            <use xlink:href="~assets/images/sprites/catalog.svg#filter-btn" />
          </svg>
          Фильтры
        </button>
      </div>
      <v-row :class="`content-wrapper row no-gutters ${isMobileFilter ? 'is-filter-show' : ''}`">
        <v-col class="filter-wrapper col-0 col-md-3 pr-md-3">
          <CatalogSubscrible :searchResult="Object.values(searchResult)" @subscrible="subscrible" @social-subscrible="socialSubscrible" />
          <div class="mobile-filter-header" v-if="isMobileFilter">
            <button class="filter-close-btn" type="button" @click="hideFilterMobile">
              <svg class="filter-close-icon">
                <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
              </svg>
              Фильтры
            </button>
            <button class="filter-reset-btn" type="button" @click="resetFilterAll">Очистить</button>
          </div>
          <CatalogFilterMainTab class="mt-6" :activeTab="states" @select-tab="selectFilterTab($event)" />
          <n-link class="extend-search-link" to="search">
            Расширенный поиск
            <svg class="search-link-icon">
              <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
            </svg>
          </n-link>
          <MainFilter class="mt-6" className="catalog" @show-results="hideFilterMobile" :results="searchResult" />
          <CatalogFeedback class="mt-6" @send-rating="sendRating($event)" v-show="!isMobileFilter" />
        </v-col>
        <v-col class="general col-12 col-md-9 pl-md-3" v-show="!isMobileFilter">
          <div class="filter-manager">
            <ul class="manager-list">
              <li
                :class="`manager-item ${getQueryParams.length - 1 === index ? 'is-margin-right-0' : ''} ${typeof item[1] === 'object' ? 'is-group' : ''}`"
                :key="index"
                v-for="(item, index) in getQueryParams.filter((item) => item[2])"
              >
                <div class="manager-item-single" v-if="typeof item[1] !== 'object'">
                  <button class="item-select-btn" type="button">
                    <span>{{ !$isServer ? getFilterParamTitle(item[0]) : '' }}</span>
                  </button>
                  <button class="item-reset-btn" type="button" @click="handlerResetFilterParam(item)" v-if="!/is_ukraine|is_cleared/.test(item[0])">
                    <svg class="manager-btn-icon">
                      <use xlink:href="~assets/images/sprites/catalog.svg#clear-parametr" />
                    </svg>
                  </button>
                </div>
                <ul class="manager-item-group" v-else>
                  <li class="manager-group-item" :key="index" v-for="(param, index) in item[1]">
                    <button class="item-select-btn" type="button">
                      <span>{{ !$isServer ? getFilterParamTitle(item[0], 'hello')[index] : '' }}</span>
                    </button>
                    <button class="item-reset-btn" type="button" @click="handlerResetFilterParam(item, param, index)">
                      <svg class="manager-btn-icon">
                        <use xlink:href="~assets/images/sprites/catalog.svg#clear-parametr" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
            <div>
              <button class="rest-filter-btn" type="button" @click="resetFilterAll">Сбросить все фильтры</button>
            </div>
          </div>
          <div :class="`sort-wrapper ${!compareList.size ? 'is-align-right' : ''}`">
            <button class="compare-btn" type="button" @click="compareAds" v-show="compareList.size">
              Сравнить (<span class="compare-amount">{{ compareList.size }}</span
              >)
            </button>
            <ul class="sort-list">
              <li class="sort-item" :key="index" v-for="(item, index) in sortParams.titlesList">
                <SelectBtn
                  :options="sortParams[index]"
                  :value="index === 0 ? amountCardOnPage : index === 1 ? sort : publicationTime"
                  :isPrependInput="true"
                  :payload="true"
                  :prependInputTitle="item"
                  className="prepend"
                  @change="index === 0 ? setAmountCardOnPage($event) : index === 1 ? sortCardsParam($event) : selectSubmissionTime($event)"
                />
              </li>
            </ul>
          </div>
          <ul class="catalog-list">
            <li class="mt-3" :key="index" v-for="(item, index) in catalogList">
              <CatalogCardsPreview
                class="catalog-item"
                :collection="item"
                :compareList="compareList"
                :extends_view="true"
                :isMobile="isMobile"
                @add-bookmarks="addBookmarks"
                @add-comparison="addToCompare"
              />
              <CatalogFeedback class="mobile-feedback" v-if="index === 6 && isMobile" @send-rating="sendRating($event)" />
            </li>
          </ul>
          <div class="pagination-wrapper">
            <PaginationBar :page="page" :visibleNumber="paginationVisible" @request-data="requestPageData($event)" :amount="amountPages" @input="requestPageData($event)" />
          </div>
        </v-col>
      </v-row>
      <div class="booking-carousel-wrapper col-12" v-show="!isMobileFilter">
        <CatalogCarOrder class="booking-carousel" :collection="carOrderList" />
      </div>
    </div>
    <transition name="fade">
      <div class="pop-up-wrapper" v-show="isPopUp">
        <PopUpSubmit class="pop-up-inner-wrapper" title="Спасибо за оценку" description="Можете оставить ваш комментарий или просто отправить оценку" @close="sendComment" @submit="sendComment">
          <label class="pop-up-label" for="">Комментарий</label>
          <textarea class="pop-up-field" cols="30" rows="10" v-model="commentValue" placeholder="Текст комментария" res></textarea>
        </PopUpSubmit>
      </div>
    </transition>
    <transition name="fade">
      <div class="pop-up-success-wrapper" v-show="isSuccessPopUp">
        <PopUpSuccess class="pop-up-inner-wrapper" />
      </div>
    </transition>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
// components
import SelectBtn from '~/components/base/SelectBtn.vue';
import CatalogSubscrible from '~/components/modules/catalog/CatalogSubscrible.vue';
import CatalogFeedback from '~/components/modules/catalog/CatalogFeedback.vue';
import CatalogCarOrder from '~/components/modules/catalog/CatalogCarOrder.vue';
import CatalogFilter from '~/components/modules/catalog/CatalogFilter.vue';
import MainFilter from '~/components/modules/main/MainFilter.vue';
import CatalogFilterMainTab from '~/components/modules/catalog/CatalogFilterMainTab.vue';
import PaginationBar from '~/components/base/PaginationBar.vue';
import CatalogCardsPreview from '~/components/base/CatalogCardsPreview.vue';
import PopUpSubmit from '~/components/base/PopUpSubmit.vue';
import PopUpSuccess from '~/components/base/PopUpSuccess.vue';
// helpers
import sortList from '~/helpers/sortList.js';
import publicationTimeList from '~/helpers/publicationTimeList.js';
// mixins
import isEmpty from '~/mixins/isEmpty.js';
import isNull from '~/mixins/isNull.js';
import stringReplaceAll from '~/mixins/stringReplaceAll.js';
import getStatusName from '~/mixins/getStatusName.js';
import saveFilterParamNameInLocalStorage from '~/mixins/saveFilterParamNameInLocalStorage.js';
import deleteFilterParamNameInLocalStorage from '~/mixins/deleteFilterParamNameInLocalStorage.js';
import setCatalogFilterDefaultParams from '~/mixins/setCatalogFilterDefaultParams.js';

export default {
  name: 'Index',
  mixins: [isEmpty, deleteFilterParamNameInLocalStorage, saveFilterParamNameInLocalStorage, isNull, stringReplaceAll, setCatalogFilterDefaultParams, getStatusName],
  data() {
    return {
      filterParams: [],
      catalogList: [],
      carOrderList: [],
      compareList: new Set(),
      searchResult: {},
      paginationVisible: 6,
      isPopUp: false,
      isSuccessPopUp: false,
      commentValue: '',
      ratingValue: '',
      page: 1,
      currentPage: 1,
      amountPages: 1,
      amountCardOnPage: '10',
      sortParams: {
        titlesList: ['Показывать по:', 'Сортировка:', 'Период подачи:'],
        0: ['10', '20', '30', '40'],
        1: sortList,
        2: publicationTimeList,
      },
      isMobileFilter: false,
      isMobile: false,
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      const paternIgnore = new RegExp(
        /initialFilterParams|setBrandList|setFilterPriceRangeMin|setFilterPriceRangeMax|setDefaultCurrency|setCategoryList|setModelList|setYearFromList|setYearToList|initialFilterPriceRange/
      );

      if (!paternIgnore.test(mutation.type)) {
        this.setQueryParams();
        this.$nextTick(() => {
          this.requestPageData();
        });
      }
    });
  },
  computed: {
    getPagePathName() {
      return this.getStatusName(this.states);
    },

    getPageTitle() {
      switch (Number(this.states)) {
        case 3:
          return 'Поиск авто за рубежом';

        default:
          return 'Поиск авто в Украине';
      }
    },

    routeName() {
      return this.$route.name;
    },

    getQueryParams() {
      const { currency: defaultCurrency, priceRange } = this.defaultValues;
      const { amountCardOnPage, currentPage } = this.$data;

      const filterParams = [
        ['status', this.states, Number(this.states) !== 0, this.resetFilterStates],
        ['car_type_id', this.type, true, this.resetFilterType],
        ['car_mark_id', this.brand, true, this.resetFilterBrand],
        ['car_model_id', this.model, true, this.resetFilterModel],
        ['price_min', this.priceMin, priceRange.min !== this.priceMin, this.resetPriceMin],
        ['price_max', this.priceMax, priceRange.max !== this.priceMax, this.resetPriceMax],
        ['location_id', this.location, true, this.resetFilterLocation],
        ['currency_id', this.currency, defaultCurrency !== this.currency, this.resetFilterCurrency],
        ['year_from', this.productionYearFrom, true, this.resetFilterProductionYearFrom],
        ['year_to', this.productionYearTo, true, this.resetFilterProductionYearTo],
        ['vin_code_verified', this.isVinCode, true, this.resetVinCode],
        ['number_car', this.isStateNumber, true, this.resetStateNumber],
        ['mileage_from', this.mileageFrom, true, this.resetMileageFrom],
        ['mileage_to', this.mileageTo, true, this.resetMileageTo],
        ['transmission_id', this.transmission, true, this.resetTransmission],
        ['fuel_id', this.fuel, true, this.resetFuel],
        ['drive_unit_id', this.driveUnit, true, this.resetDriveUnit],
        ['is_not_go', !this.isNull(this.broken), !this.isNull(this.broken), this.resetBroken],
        ['is_broken', !this.isNull(this.damage), !this.isNull(this.damage), this.resetDamage],
        ['is_cleared', this.customsCleared, true, this.resetCustomsCleared],
        ['is_ukraine', this.abroad, !!this.abroad, this.resetAbroad],
        ['car_comfort_id', this.additionalSettings, true, this.resetAdditionalSettings],
        ['sort', this.sort, true, this.resetSort],
        ['date', this.publicationTime, true, this.resetPublicationTime],
        ['paginate', amountCardOnPage, false],
        ['page', currentPage, false],
      ];

      return filterParams.filter((item) => {
        if (item[0] === 'is_cleared' && item[1] === false) return true;
        if (item[0] === 'is_ukraine' && item[1] === false) return true;

        return !this.isEmpty(item[1]);
      });
    },

    ...mapState({
      states: (state) => state.filter.filter.states,
      type: (state) => state.filter.filter.type,
      brand: (state) => state.filter.filter.brand,
      model: (state) => state.filter.filter.model,
      priceMin: (state) => state.filter.filter.priceMin,
      priceMax: (state) => state.filter.filter.priceMax,
      location: (state) => state.filter.filter.location,
      currency: (state) => state.filter.filter.currency,
      productionYearFrom: (state) => state.filter.filter.productionYearFrom,
      productionYearTo: (state) => state.filter.filter.productionYearTo,
      isVinCode: (state) => state.filter.filter.isVinCode,
      isStateNumber: (state) => state.filter.filter.isStateNumber,
      mileageFrom: (state) => state.filter.filter.mileageFrom,
      mileageTo: (state) => state.filter.filter.mileageTo,
      transmission: (state) => state.filter.filter.transmission,
      fuel: (state) => state.filter.filter.fuel,
      driveUnit: (state) => state.filter.filter.driveUnit,
      broken: (state) => state.filter.filter.broken,
      damage: (state) => state.filter.filter.damage,
      customsCleared: (state) => state.filter.filter.customsCleared,
      abroad: (state) => state.filter.filter.abroad,
      sort: (state) => state.filter.filter.sort,
      publicationTime: (state) => state.filter.filter.publicationTime,
      additionalSettings: (state) => state.filter.filter.additionalSettings,
      locales: (state) => state.locales,
      defaultValues: (state) => state.filter.defaultValues,
    }),
  },
  methods: {
    compareAds() {
      console.log('compareAds -> compareAds');
    },

    addToCompare(id) {
      if (this.compareList.has(id)) {
        this.compareList.delete(id);
        this.compareList = new Set(this.compareList);

        return;
      }

      this.compareList = new Set(this.compareList.add(id));
    },

    addBookmarks(bookmarksId) {
      try {
        this.$axios.$post(`auth/one_car/wishlist/${bookmarksId}`, { method: 'POST' });
      } catch (error) {
        console.error(error);
      }
    },

    displayFilter() {
      this.isMobileFilter = true;
    },

    hideFilterMobile() {
      this.isMobileFilter = false;
    },

    resetFilterAll() {
      this.resetAll();
    },

    getQueryString() {
      let queryString = '';

      const convertArrayToString = (item) => {
        return item[1].map((value) => `${item[0]}[]=${value}`).join('&');
      };

      this.getQueryParams.forEach((item, index) => {
        queryString += index === 0 ? `?${item[0]}=${item[1]}` : `&${Array.isArray(item[1]) ? convertArrayToString(item) : item[0] + '=' + item[1]}`;
      });

      return this.stringReplaceAll({ true: '1', false: '0' }, queryString);
    },

    deletePropertyNameFromLocalStorage(keyName, propertyName) {
      let filterParamNames = JSON.parse(localStorage.getItem('filterParamsName'));

      if (filterParamNames[keyName].length === 1) {
        delete filterParamNames[keyName];

        localStorage.setItem('filterParamsName', JSON.stringify(filterParamNames));

        return;
      }

      localStorage.setItem('filterParamsName', JSON.stringify({ ...filterParamNames, [keyName]: filterParamNames[keyName].filter((item, index) => index !== propertyName) }));
    },

    getFilterParamTitle(key, test) {
      if (localStorage.getItem('filterParamsName') === null) return localStorage.setItem('filterParamsName', JSON.stringify({}));

      const filterParamTitles = JSON.parse(localStorage.getItem('filterParamsName'));

      return filterParamTitles[key];
    },

    selectFilterTab(tabIndex) {
      this.setFilterStates(String(tabIndex));
      this.setCatalogFilterDefaultParams(Number(this.states));
    },

    sendRating(appraisal) {
      this.isPopUp = true;
      this.ratingValue = appraisal;
    },

    async sendComment() {
      this.isPopUp = false;

      try {
        const { status } = await this.$axios.$post(`catalog/rating`, { method: 'POST', rating: this.ratingValue, comment: this.commentValue });

        if (status === 'ok') {
          this.isSuccessPopUp = true;

          setTimeout(() => {
            this.isSuccessPopUp = false;
          }, 2000);
        }
      } catch (error) {
        console.error(error);
      }
    },

    requestPageData(pageNumber) {
      if (pageNumber) this.currentPage = pageNumber;

      this.setQueryParams();

      setTimeout(async () => {
        try {
          const { data } = await this.$axios.$get(`catalog/main${this.getQueryString()}`, { method: 'GET' });
          const { products, subscription } = data;

          this.catalogList = products.data;
          this.amountPages = products.last_page;
          this.searchResult = subscription;
        } catch (error) {
          console.error(error);
        }
      }, 0);
    },

    async subscrible(email) {
      const prepareData = { email: email, type: 'email' };

      this.getQueryParams.forEach((item) => {
        prepareData[item[0]] = item[1];
      });

      try {
        await this.$axios.$post(`catalog/subscription`, { method: 'POST', ...prepareData });
      } catch (error) {
        console.error(error);
      }
    },

    async socialSubscrible(socialName) {
      const prepareData = { type: socialName };

      this.getQueryParams.forEach((item) => {
        prepareData[item[0]] = item[1];
      });

      try {
        await this.$axios.$post(`catalog/subscription`, { method: 'POST', ...prepareData });
      } catch (error) {
        console.error(error);
      }
    },

    handlerResetFilterParam(params, id, index) {
      switch (params[0]) {
        case 'car_type_id':
          this.resetFilterType();
          this.resetFilterBrand();
          this.resetFilterModel();
          this.resetFilterProductionYearFrom();
          this.resetFilterProductionYearTo();
          this.resetBrandList();
          this.resetModelList();
          this.resetYearFromList();
          this.resetYearToList();

          this.deleteFilterParamNameInLocalStorage(['car_type_id', 'car_mark_id', 'car_model_id', 'year_from', 'year_to']);
          break;
        case 'car_mark_id':
          this.resetFilterBrand();
          this.resetFilterModel();
          this.resetFilterProductionYearFrom();
          this.resetFilterProductionYearTo();
          this.resetModelList();
          this.resetYearFromList();
          this.resetYearToList();

          this.deleteFilterParamNameInLocalStorage(['car_mark_id', 'car_model_id', 'year_from', 'year_to']);
          break;
        case 'car_model_id':
          this.resetFilterModel();
          this.resetFilterProductionYearFrom();
          this.resetFilterProductionYearTo();
          this.resetYearFromList();
          this.resetYearToList();

          this.deleteFilterParamNameInLocalStorage(['car_model_id', 'year_from', 'year_to']);
          break;

        case 'transmission_id':
          this.deleteTransmission(id);
          this.deletePropertyNameFromLocalStorage('transmission_id', index);
          break;

        case 'fuel_id':
          this.deleteFuel(id);
          this.deletePropertyNameFromLocalStorage('fuel_id', index);
          break;

        case 'drive_unit_id':
          this.deleteDriveUnit(id);
          this.deletePropertyNameFromLocalStorage('drive_unit_id', index);
          break;

        default:
          params[3]();
          this.deleteFilterParamNameInLocalStorage([params[0]]);
          break;
      }
    },

    resetFieldSort() {
      this.resetSort();
      this.deleteFilterParamNameInLocalStorage(['sort']);
    },

    setAmountCardOnPage(numberShownCards) {
      this.amountCardOnPage = numberShownCards;

      this.requestPageData();
    },

    resetAmountCardOnPage() {
      this.amountCardOnPage = 10;
    },

    sortCardsParam({ text, value }) {
      this.saveFilterParamNameInLocalStorage('sort', text);

      this.setSort(value);
    },

    resetSortCardsParam() {
      this.deleteFilterParamNameInLocalStorage(['sort']);

      this.resetSort();
    },

    selectSubmissionTime({ text, value }) {
      this.saveFilterParamNameInLocalStorage('date', text);

      this.setPublicationTime(value);
    },

    resetSubmissionTime() {
      this.deleteFilterParamNameInLocalStorage(['date']);

      this.resetPublicationTime();
    },

    setQueryParams() {
      let queryString = 'catalog';

      this.getQueryParams.forEach((item, index) => {
        queryString += index === 0 ? `?${item[0]}=${item[1]}` : `&${item[0]}=${item[1]}`;
      });

      this.$router.replace({ path: queryString }).catch((err) => {});
    },

    initializationData() {
      const queryParams = [];
      let initialChangeOptions = {};

      for (let item in this.$route.query) {
        if (this.$route.query[item]) queryParams.push([item, this.$route.query[item]]);
      }

      for (let item of queryParams) {
        switch (item[0]) {
          case 'status':
            initialChangeOptions = this.setCatalogFilterDefaultParams(Number(item[1]), initialChangeOptions);
            initialChangeOptions['states'] = Number(item[1]);
            break;
          case 'car_type_id':
            initialChangeOptions['type'] = Number(item[1]);
            break;
          case 'car_mark_id':
            initialChangeOptions['brand'] = Number(item[1]);
            break;
          case 'car_model_id':
            initialChangeOptions['model'] = Number(item[1]);
            break;
          case 'location_id':
            initialChangeOptions['location'] = Number(item[1]);
            break;
          case 'price_min':
            initialChangeOptions['priceMin'] = Number(item[1]);
            break;
          case 'price_max':
            initialChangeOptions['priceMax'] = Number(item[1]);
            break;
          case 'currency_id':
            initialChangeOptions['currency'] = Number(item[1]);
            break;
          case 'year_from':
            initialChangeOptions['productionYearFrom'] = Number(item[1]);
            break;
          case 'year_to':
            initialChangeOptions['productionYearTo'] = Number(item[1]);
            break;
          case 'mileage_from':
            initialChangeOptions['mileageFrom'] = Number(item[1]);
            break;
          case 'mileage_to':
            initialChangeOptions['mileageTo'] = Number(item[1]);
            break;
          case 'vin_code_verified':
            initialChangeOptions['isVinCode'] = item[1] === 'true';
            break;
          case 'number_car':
            initialChangeOptions['isStateNumber'] = item[1] === 'true';
            break;
          case 'transmission_id':
            initialChangeOptions['transmission'] = item[1].split(',').map((item) => Number(item));
            break;
          case 'fuel_id':
            initialChangeOptions['fuel'] = item[1].split(',').map((item) => Number(item));
            break;
          case 'drive_unit_id':
            initialChangeOptions['driveUnit'] = item[1].split(',').map((item) => Number(item));
            break;
          case 'is_cleared':
            initialChangeOptions['customsCleared'] = item[1] === 'true';
            break;
          case 'is_ukraine':
            initialChangeOptions['abroad'] = item[1] === 'true';
            break;
          case 'car_comfort_id':
            initialChangeOptions['additionalSettings'] = Number(item[1]);
            break;
          case 'is_not_go':
            initialChangeOptions['broken'] = item[1] === 'true';
            break;
          case 'is_broken':
            initialChangeOptions['damage'] = item[1] === 'true';
            break;
          case 'paginate':
            this.amountCardOnPage = item[1];
            break;
          case 'sort':
            initialChangeOptions['sort'] = item[1];
            break;
          case 'date':
            initialChangeOptions['publicationTime'] = item[1];
            break;
        }
      }

      this.initialFilterParams(initialChangeOptions);
    },

    initialLocalStore() {
      this.saveFilterParamNameInLocalStorage('is_ukraine', this.abroad ? 'Авто в Украине' : 'Авто не в Украине');
      this.saveFilterParamNameInLocalStorage('is_cleared', this.customsCleared ? 'Растаможенные' : 'Нерастаможенные');
      Number(this.states) !== 0 ? this.saveFilterParamNameInLocalStorage('status', 'Под пригон автомобили') : this.deleteFilterParamNameInLocalStorage(['status']);
    },

    ...mapActions({
      resetFilterStates: 'filter/resetFilterStates',
      resetFilterType: 'filter/resetFilterType',
      resetFilterBrand: 'filter/resetFilterBrand',
      resetFilterModel: 'filter/resetFilterModel',
      resetPriceMin: 'filter/resetPriceMin',
      resetPriceMax: 'filter/resetPriceMax',
      resetFilterCurrency: 'filter/resetFilterCurrency',
      resetFilterProductionYearFrom: 'filter/resetFilterProductionYearFrom',
      resetFilterProductionYearTo: 'filter/resetFilterProductionYearTo',
      resetVinCode: 'filter/resetVinCode',
      resetStateNumber: 'filter/resetStateNumber',
      resetMileageFrom: 'filter/resetMileageFrom',
      resetMileageTo: 'filter/resetMileageTo',
      resetBroken: 'filter/resetBroken',
      resetDamage: 'filter/resetDamage',
      resetTransmission: 'filter/resetTransmission',
      resetFuel: 'filter/resetFuel',
      resetDriveUnit: 'filter/resetDriveUnit',
      resetCustomsCleared: 'filter/resetCustomsCleared',
      resetAbroad: 'filter/resetAbroad',
      resetBrandList: 'filter/resetBrandList',
      resetModelList: 'filter/resetModelList',
      resetYearFromList: 'filter/resetYearFromList',
      resetYearToList: 'filter/resetYearToList',
      setFilterStates: 'filter/setFilterStates',
      setFilterType: 'filter/setFilterType',
      setFilterBrand: 'filter/setFilterBrand',
      setFilterModel: 'filter/setFilterModel',
      setFilterLocation: 'filter/setFilterLocation',
      setPriceMax: 'filter/setPriceMax',
      setPriceMin: 'filter/setPriceMin',
      setFilterProductionYearFrom: 'filter/setFilterProductionYearFrom',
      setFilterProductionYearTo: 'filter/setFilterProductionYearTo',
      setVinCode: 'filter/setVinCode',
      setStateNumber: 'filter/setStateNumber',
      setFilterCurrency: 'filter/setFilterCurrency',
      setTransmission: 'filter/setTransmission',
      deleteTransmission: 'filter/deleteTransmission',
      setFuel: 'filter/setFuel',
      deleteFuel: 'filter/deleteFuel',
      setDriveUnit: 'filter/setDriveUnit',
      deleteDriveUnit: 'filter/deleteDriveUnit',
      setCustomsCleared: 'filter/setCustomsCleared',
      setAbroad: 'filter/setAbroad',
      setMileageFrom: 'filter/setMileageFrom',
      setMileageTo: 'filter/setMileageTo',
      setBroken: 'filter/setBroken',
      setDamage: 'filter/setDamage',
      setSort: 'filter/setSort',
      resetSort: 'filter/resetSort',
      setPublicationTime: 'filter/setPublicationTime',
      resetPublicationTime: 'filter/resetPublicationTime',
      resetAll: 'filter/resetAll',
      setAdditionalSettings: 'filter/setAdditionalSettings',
      resetAdditionalSettings: 'filter/resetAdditionalSettings',
      setFilterLocation: 'filter/setFilterLocation',
      resetFilterLocation: 'filter/resetFilterLocation',
      initialFilterParams: 'filter/initialFilterParams',
    }),
  },
  mounted() {
    if (this.$vuetify.breakpoint.xs) this.paginationVisible = 3;

    this.initialLocalStore();

    this.$nextTick(() => {
      this.isMobile = this.$vuetify.breakpoint.xs;
      setTimeout(() => {
        this.setQueryParams();
      }, 0);
    });
  },
  async fetch() {
    this.initializationData();
    const token = this.getAuthToken() ? this.getAuthToken() : '';
    let data;
    if (token) {
      data = await this.$axios.$get(`catalog/main${this.getQueryString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).data;
    } else {
      data = await this.$axios.$get(`catalog/main${this.getQueryString()}`).data;
    }
    const { products, car_order, subscription } = data;

    this.catalogList = products.data;
    this.carOrderList = car_order;
    this.amountPages = products.last_page;
    this.searchResult = subscription;
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  components: {
    SelectBtn,
    CatalogCardsPreview,
    PaginationBar,
    CatalogCarOrder,
    CatalogSubscrible,
    CatalogFeedback,
    PopUpSubmit,
    CatalogFilter,
    MainFilter,
    CatalogFilterMainTab,
    PopUpSuccess,
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include init-font;
  margin-top: 25px;

  flex: 1;

  .history-routing {
    display: flex;
    align-items: center;

    .routing-home-link {
      font-size: 4px;

      .home-link-icon {
        width: 14px;
        height: 14px;
      }
    }

    .routing-list {
      .routing-item {
        display: flex;
        align-items: center;
        margin-left: 15px;

        .routing-item-link {
          display: flex;
          align-items: center;

          font-size: 13px;
          line-height: 16px;
          color: #b1c4cd;

          .routing-link-icon {
            margin-right: 13px;

            width: 4px;
            height: 8px;
          }
        }
      }
    }
  }

  .catalog-title {
    margin-top: 24px;
    font-size: 32px;
    font-weight: 500;
    line-height: 35px;
    color: #222329;
  }

  .subscrible-wrapper {
    margin-top: 20px;
  }

  .mobile-btn-wrapper {
    display: flex;
    margin-top: 20px;

    .mobile-sort-btn {
      width: min-content;

      ::v-deep .select-inner-wrapper {
        fieldset {
          border-color: #4a4d5c;
        }

        .v-label {
          left: 0px;
          right: auto;

          color: #4a4d5c;
        }

        .select-mark {
          margin-left: 5px;
          fill: #4a4d5c;
        }
      }
    }

    .mobile-filter-btn {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0 20px;
      margin-left: 16px;

      height: 36px;

      border-radius: 2px;
      background: #4cad33;

      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: #ffffff;

      &:hover {
        background: #2ca00d;
      }

      .filter-btn-icon {
        margin-right: 12px;

        width: 20px;
        height: 20px;
      }
    }
  }

  .content-wrapper {
    margin-top: 32px;
    margin-bottom: 56px;

    .filter-wrapper {
      .mobile-filter-header {
        display: flex;
        justify-content: space-between;

        padding: 17px 12px;
        box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.1);

        .filter-close-btn {
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: 16px;
          font-weight: 500;
          line-height: 18px;
          color: #222329;

          .filter-close-icon {
            margin-right: 12px;

            transform: rotate(90deg);

            width: 12px;
            height: 8px;
          }
        }

        .filter-reset-btn {
          padding: 2px 0;

          border-bottom: 1px dashed #4a4d5c;

          font-size: 14px;
          line-height: 17px;
        }
      }

      .extend-search-link {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        padding: 0 40px;

        height: 44px;

        background: #1768ac;
        border-radius: 2px;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #ffffff;

        &:hover {
          background: #0e4c80;
        }

        .search-link-icon {
          margin-left: 18px;

          width: 12px;
          height: 8px;
          transform: rotate(-90deg);
          fill: #ffffff;
        }
      }
    }

    .general {
      .filter-manager {
        display: flex;
        justify-content: space-between;

        margin-bottom: 11px;

        .manager-list {
          display: flex;
          flex-wrap: wrap;

          .manager-item {
            .manager-item-single {
              position: relative;
              display: flex;
              align-items: center;

              margin-bottom: 9px;
              margin-right: 18px;

              padding: 2px 4px;

              border-radius: 2px;
              background: #b9e3ae;
            }

            .manager-item-group {
              display: flex;

              margin-right: 18px;

              & li:first-child {
                margin-left: 0;
              }

              .manager-group-item {
                display: flex;
                align-items: center;

                margin-bottom: 9px;
                margin-left: 18px;

                padding: 2px 4px;

                border-radius: 2px;
                background: #b9e3ae;
              }
            }

            .item-select-btn {
              margin-right: 5px;
              font-size: 13px;
              line-height: 16px;
              color: #4a4d5c;
            }

            .item-reset-btn {
              position: relative;
              top: 1px;
              font-size: 0;

              &:hover .manager-btn-icon {
                fill: #ff0000;
              }

              .manager-btn-icon {
                width: 8px;
                height: 8px;

                fill: #4a4d5c;
              }
            }
          }

          .is-margin-right-0 {
            margin-right: 0;
          }
        }

        .rest-filter-btn {
          border-bottom: dashed;
          border-bottom-width: 1px;

          white-space: nowrap;
          font-size: 14px;
          line-height: 17px;
          color: #4a4d5c;
        }
      }

      .sort-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 21px 0 17px 0;
        box-shadow: 0 -2px 0 -1px rgba(34, 35, 41, 0.1);

        .compare-btn {
          font-size: 14px;
          line-height: 17px;
          color: #70848e;

          &:hover {
            color: #51a9f2;
          }

          .compare-amount {
            color: #4a4d5c;
          }
        }

        .sort-list {
          display: flex;
          justify-content: flex-end;

          & li:first-child {
            margin-left: 0;
          }

          .sort-item {
            margin-left: 30px;

            ::v-deep .v-select__selection {
              max-width: 120px;
            }
          }
        }
      }

      .is-align-right {
        justify-content: flex-end;
      }

      .catalog-list {
        margin-bottom: 24px;

        & li:first-child {
          margin-top: 0;
        }

        .catalog-item {
          margin-top: 16px;

          ::v-deep .general {
            .stats {
              & > div {
                flex: 1;
              }
            }
          }
        }

        .mobile-feedback {
          margin-top: 16px;
        }
      }

      .pagination-wrapper {
      }
    }
  }

  .is-filter-show {
    .filter-wrapper {
      position: absolute;
      display: block !important;

      top: 0;
      left: 0;

      background: #ffffff;
      z-index: 1;

      .acordion-wrapper {
        display: none;
      }

      ::v-deep .filter-tabs-list {
        & li:last-child {
          grid-column: span 1;
          max-width: 100%;
        }
      }

      ::v-deep .filter {
        .price-car {
          padding: 0 !important;
          box-shadow: none;

          .price-slider-wrapper {
            position: relative;
            height: 56px;

            & div:first-child {
              display: none;
            }

            .mobile-result-frame {
              display: flex;
            }
          }
        }
      }
    }
  }

  .booking-carousel-wrapper {
    .booking-carousel {
    }
  }

  .pop-up-wrapper {
    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;

    background: rgba(255, 255, 255, 0.6);
    z-index: 1;

    .pop-up-inner-wrapper {
      top: 50%;
      margin: 0 auto;

      max-width: 568px;
      width: 100%;

      transform: translateY(-50%);

      .pop-up-label {
        font-size: 15px;
        line-height: 17px;
      }

      .pop-up-field {
        padding: 8px;
        margin-top: 6px;
        outline: none;
        resize: none;

        height: 100%;
        max-height: 82px;

        border-radius: 2px;
        border: 1px solid #8fa5b0;

        font-size: 15px;
        font-weight: 500;
        line-height: 17px;
        color: #4a4d5c;

        &:focus {
          border: 1px solid #51a9f2;
        }

        &::placeholder {
          font-size: 15px;
          line-height: 17px;
          color: #8fa5b0;
        }
      }
    }
  }

  .pop-up-success-wrapper {
    @extend .pop-up-wrapper;
    background: none;

    .pop-up-inner-wrapper {
      max-width: max-content;
    }
  }
}

@include sm {
  .main {
    .history-routing {
      display: none;
    }

    .content-wrapper {
      .filter-wrapper {
        display: none;
      }

      .is-show {
        display: block;
      }

      .general {
        padding-left: 0 !important;
        max-width: 100%;
        flex: 0 0 100%;

        .filter-manager {
          display: none;
        }

        .sort-wrapper {
          display: none;
        }
      }
    }
  }
}

@include xs {
  .main {
    .catalog-title {
      margin: 0;
    }

    .content-wrapper {
      margin-top: 20px;
      .general {
        .catalog-list {
          margin-bottom: 35px;

          & li:first-child {
            margin-top: 0 !important;

            .catalog-item {
              margin-top: 0;
            }
          }

          .catalog-item {
            position: relative;
            flex-direction: column;
            max-height: max-content;
            height: 100%;

            ::v-deep .preview-wrapper {
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

            ::v-deep .general {
              position: initial;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;

              border-radius: 0 4px 4px 4px;
              border-left: 1px solid #b1c4cd;
              border-top: 0;

              .id {
                display: none;
              }

              .stats {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                .icon-wrapper {
                  width: 20px;
                }

                & div:first-child {
                  margin-top: 0;
                }

                & > div {
                  margin-top: 9px;
                }
              }

              .vin {
                left: auto;
                right: 8px;
              }
            }
          }
        }

        .pagination-wrapper {
          ::v-deep .pagination {
            justify-content: center;

            .prev-btn {
              display: none;
            }

            .v-pagination {
              .v-pagination__navigation {
                border-radius: 2px;
                border: 1px solid #222329;
                box-shadow: none;

                .v-icon {
                  color: #222329;
                }
              }

              & li:first-child {
                display: flex;

                .v-pagination__navigation {
                  margin-left: 0;
                  margin-top: 0;
                  margin-bottom: 0;
                }
              }

              & li:last-child {
                display: flex;

                .v-pagination__navigation {
                  margin-right: 0;
                  margin-top: 0;
                  margin-bottom: 0;
                }
              }
            }

            .next-btn {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
