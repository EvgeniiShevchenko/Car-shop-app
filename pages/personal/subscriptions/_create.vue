<template>
  <div class="subscriptions-form-wrapper">
    <n-link class="subscriptions-link mt-10" to="/personal/subscriptions">
      <svg class="subscriptions-link-icon">
        <use xlink:href="~assets/images/sprites/global.svg#transition-arrow" />
      </svg>
      К списку подписок
    </n-link>
    <h1 class="subscriptions-title mt-2 mt-sm-4">Создание нового профиля рассылки</h1>
    <p class="subscriptions-info mt-5 mt-sm-8">
      <svg class="info-link-icon">
        <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
      </svg>
      <span> Для создания нового профиля заполните форму ниже и сохраните настройки. После создания рассылки, мы будем отправлять Вам на почту новые предложения по мере их появления. </span>
    </p>
    <form class="subscriptions-form mt-5 mt-sm-8" method="POST">
      <AcordionSingle class="general is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
        <template slot="header">
          <AccordionHeaderWithNumber :number="1" title="Основная информация" />
        </template>
        <template slot="content">
          <div class="select-wrapper is-type">
            <SelectField
              class="select-inner-wrapper"
              :defaultValue="typeId"
              :collection="typesList"
              label="Тип транспорта"
              @change="selectType"
              :isReset="!isEmpty(!!typeId)"
              @reset-field="resetType"
            />
          </div>
          <div class="select-wrapper">
            <ul class="select-list">
              <li class="select-list-item" :key="index" v-for="(item, index) in cauntrySelectedList">
                <SelectField
                  class="select-inner-wrapper"
                  :defaultValue="item.value"
                  :collection="countryList"
                  :isAutoComplete="true"
                  label="Страна производителя"
                  @change="selectCauntry($event, item)"
                  :isReset="!isEmpty(!!item.value)"
                  @reset-field="resetCauntry(item)"
                />
                <div class="check-box-wrapper">
                  <CheckBox class="check-box" :value="item.status" :boxId="index" :isDisabled="isEmpty(item.value)" @change="changeCauntryStatus($event, item)" label="Исключить" />
                </div>
              </li>
            </ul>
            <button class="more-btn mt-4" type="button" @click="addMoreCauntries">
              <svg class="more-btn-icon">
                <use xlink:href="~/assets/images/sprites/global.svg#plus-18" />
              </svg>
              Добавить еще
            </button>
          </div>
          <div class="select-wrapper is-select-car">
            <ul class="select-list">
              <li class="select-list-item" :key="index" v-for="(item, index) in carPaternsSelectList">
                <SelectField
                  class="select-inner-wrapper"
                  :defaultValue="item.brand"
                  :collection="item.brandList"
                  :isAutoComplete="true"
                  :isPrepend="isEmpty(typeId)"
                  prependTitle="Выберите сначало тип"
                  label="Марка авто"
                  @change="selectBrand($event, item)"
                  :isReset="!isEmpty(!!item.brand)"
                  @reset-field="resetBrand(item)"
                />
                <SelectField
                  class="select-inner-wrapper"
                  :defaultValue="item.model"
                  :collection="item.modelsList"
                  :isAutoComplete="true"
                  :isPrepend="isEmpty(item.brandList)"
                  prependTitle="Выберите сначало марку"
                  label="Модель авто"
                  @change="selectModel($event, item)"
                  :isReset="!isEmpty(!!item.model)"
                  @reset-field="resetModel(item)"
                />
                <div class="check-box-wrapper">
                  <CheckBox class="check-box" :value="item.status" :isDisabled="isEmpty(item.brand) && isEmpty(item.model)" @change="changeCarPrototypeStatus($event, item)" label="Исключить" />
                </div>
              </li>
            </ul>
            <button class="more-btn mt-4" type="button" @click="addMoreCar">
              <svg class="more-btn-icon">
                <use xlink:href="~/assets/images/sprites/global.svg#plus-18" />
              </svg>
              Добавить еще
            </button>
          </div>
          <div class="select-wrapper is-production-years">
            <SelectField
              class="select-inner-wrapper mr-4"
              :defaultValue="yearFrom"
              label="Год выпуска"
              fieldLabel="от"
              :collection="productionsYearsList"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!yearFrom)"
              @change="selectYearForm"
              @reset-field="resetYearFrom"
            />
            <SelectField
              class="select-inner-wrapper ml-4"
              fieldLabel="до"
              :defaultValue="yearTo"
              :collection="productionsYearsList"
              :isAutoComplete="true"
              :isLabel="false"
              :isReset="!isEmpty(!!yearTo)"
              @change="selectYearTo"
              @reset-field="resetYearTo"
            />
          </div>
          <div class="select-wrapper is-location">
            <ul class="select-list">
              <li class="select-list-item" :key="index" v-for="(item, index) in locationSelectList">
                <SelectField
                  class="select-inner-wrapper"
                  label="Область"
                  :defaultValue="item.region"
                  :collection="regionsList"
                  :isAutoComplete="true"
                  :isReset="!isEmpty(!!item.region)"
                  @change="selectRegion($event, item)"
                  @reset-field="resetRegion(item)"
                />
                <SelectField
                  class="select-inner-wrapper"
                  label="Город"
                  :defaultValue="item.city"
                  :collection="item.cityList"
                  :isAutoComplete="true"
                  :isReset="!isEmpty(!!item.city)"
                  :loading="isCitiesLoading"
                  :isPrepend="isEmpty(!!item.region)"
                  prependTitle="Выберите сначало область"
                  @change="selectCity($event, item)"
                  @focus="handlerPrefetchCity(item)"
                  @reset-field="resetCity(item)"
                />
              </li>
            </ul>
            <button class="more-btn mt-4" type="button" @click="addMoreLocations">
              <svg class="more-btn-icon">
                <use xlink:href="~/assets/images/sprites/global.svg#plus-18" />
              </svg>
              Добавить еще
            </button>
          </div>
          <div class="select-wrapper is-price">
            <InputCustomField class="select-inner-wrapper is-price-field mr-4" label="Цена" placeholder="от" :value="priceFrom" @change-field="changePriceFrom" />
            <InputCustomField class="select-inner-wrapper is-price-field mr-4 ml-4" placeholder="до" :value="priceTo" :isLabel="false" @change-field="changePriceTo" />
            <SelectField
              class="select-inner-wrapper is-currency ml-4"
              v-if="!isEmpty(!!currency)"
              :collection="currencyList"
              :defaultValue="currency"
              :isLabel="false"
              :isAutoComplete="true"
              :isReset="currency !== 2"
              @change="selectCurrency"
              @reset-field="resetCurrency"
            />
            <div class="check-box-wrapper mt-4">
              <CheckBox class="check-box" :value="isExchangeResources" :isLabel="true" @change="setExchangeResources">
                <template slot="label">
                  <div class="check-box-label">
                    <p class="label-text">возможен обмен на недвижимость</p>
                    <svg class="check-box-label-icon">
                      <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                    </svg>
                  </div>
                </template>
              </CheckBox>
              <CheckBox class="check-box mt-4" :value="isCarExchange" :isLabel="true" @change="setCarExchange">
                <template slot="label">
                  <div class="check-box-label">
                    <p class="label-text">возможен обмен на автомобиль</p>
                    <svg class="check-box-label-icon">
                      <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                    </svg>
                  </div>
                </template>
              </CheckBox>
            </div>
          </div>
        </template>
      </AcordionSingle>
      <AcordionSingle class="technical is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
        <template slot="header">
          <AccordionHeaderWithNumber :number="2" title="Технические характеристики" />
        </template>
        <template slot="content">
          <div class="technical-inner-wrapper">
            <h3 class="consumption-title">Расход топлива, л</h3>
            <RadioButtonGroup class="radio-button-group" :collection="consumptionOptions" :value="consumptionAreaId" @change="changeConsumptionArea" />
            <div class="technical-field-wrapper is-price-field mt-4">
              <InputCustomField class="technical-field mr-4" placeholder="от" :value="getConsumptionValueFrom" :isLabel="false" @change-field="changeConsumptionFrom(consumptionAreaId, $event)" />
              <InputCustomField class="technical-field ml-4" placeholder="до" :value="getConsumptionValueTo" :isLabel="false" @change-field="changeConsumptionTo(consumptionAreaId, $event)" />
            </div>
          </div>
          <div class="technical-inner-wrapper is-technical-stats is-grid">
            <SelectField
              class="technical-field mr-8"
              label="Объем двигателя, л"
              fieldLabel="от"
              :collection="engineCapacitiesList"
              :defaultValue="stats.engineValueFrom"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!stats.engineValueFrom)"
              :isPrepend="isEmpty(!!typeId)"
              prependTitle="Выберите сначало тип"
              @change="changeEngineValueFrom"
              @reset-field="resetEngineValueFrom"
            />
            <SelectField
              class="technical-field is-bottom-align"
              fieldLabel="до"
              :isLabel="false"
              :collection="engineCapacitiesList"
              :defaultValue="stats.engineValueTo"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!stats.engineValueTo)"
              :isPrepend="isEmpty(!!typeId)"
              prependTitle="Выберите сначало тип"
              @change="changeEngineValueTo"
              @reset-field="resetEngineValueTo"
            />
            <SelectField
              class="technical-field"
              fieldLabel="от"
              label="Мощность двигателя, л/с"
              :collection="enginePowersList"
              :defaultValue="stats.enginePowerFrom"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!stats.enginePowerFrom)"
              :isPrepend="isEmpty(!!typeId)"
              prependTitle="Выберите сначало тип"
              @change="changeEnginePowerFrom"
              @reset-field="resetEnginePoserFrom"
            />
            <SelectField
              class="technical-field is-bottom-align"
              fieldLabel="до"
              :isLabel="false"
              :collection="enginePowersList"
              :defaultValue="stats.enginePowerTo"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!stats.enginePowerTo)"
              :isPrepend="isEmpty(!!typeId)"
              prependTitle="Выберите сначало тип"
              @change="changeEnginePowerTo"
              @reset-field="resetEnginePoserTo"
            />
            <InputCustomField class="technical-field is-bottom-align" placeholder="от" type="number" label="Пробег, тыс. км" :value="stats.mileageFrom" @change-field="changeMileageFrom" />
            <InputCustomField class="technical-field is-bottom-align" placeholder="от" type="number" :isLabel="false" :value="stats.mileageTo" @change-field="changeMileageTo" />
            <SelectField
              class="technical-field is-bottom-align"
              label="Тип кузова"
              :multiple="true"
              :collection="carcaseList"
              :defaultValue="stats.carcase"
              :isAutoComplete="true"
              :isReset="!isEmpty(stats.carcase)"
              :isPrepend="isEmpty(!!this.typeId)"
              prependTitle="Выберите сначало тип"
              @change="selectCarcase"
              @reset-field="resetCarcase"
            />
          </div>
          <div class="technical-inner-wrapper is-technical-characteristic is-grid-3x" v-if="transmissionsList.length">
            <div class="checkbox-group">
              <h3 class="checkbox-group-title">Коробка передач</h3>
              <CheckBoxGroup class="check-box" :value="stats.transmission" :isOverflow="true" :collection="transmissionsList" @change="selectTransmissions" />
            </div>
            <div class="checkbox-group">
              <h3 class="checkbox-group-title">Цвет</h3>
              <CheckBoxGroup class="check-box" :value="stats.color" :isOverflow="true" :collection="colorsList" @change="selectColor" />
            </div>
          </div>
          <div class="technical-inner-wrapper is-technical-characteristic is-grid-3x is-none-border" v-if="fuelsList.length">
            <div class="checkbox-group">
              <h3 class="checkbox-group-title">Топливо</h3>
              <CheckBoxGroup class="check-box" :value="stats.fuel" :isOverflow="true" :collection="fuelsList" @change="selectFuel" />
            </div>
            <div class="checkbox-group">
              <h3 class="checkbox-group-title">Тип привода</h3>
              <CheckBoxGroup class="check-box" :value="stats.driveUnit" :isOverflow="true" :collection="driveUnitsList" @change="selectDriveUnit" />
            </div>
          </div>
        </template>
      </AcordionSingle>
      <AcordionSingle class="additional is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
        <template slot="header">
          <AccordionHeaderWithNumber :number="3" title="Дополнительные параметры" />
        </template>
        <template slot="content">
          <div :class="`additional-inner-wrapper is-select-wrapper ${$vuetify.breakpoint.xs ? 'is-none-border' : ''}`">
            <SelectField
              class="additional-field"
              label="Растаможка"
              :collection="customsClearanceList"
              :defaultValue="additional.customsClearance"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.customsClearance)"
              @change="changeCustomsClearance"
              @reset-field="resetCustomsClearance"
            />
            <SelectField
              class="additional-field"
              label="Повреждения"
              :collection="damageList"
              :defaultValue="additional.damage"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.damage)"
              @change="changeDamage"
              @reset-field="resetDamage"
            />
            <SelectField
              class="additional-field"
              label="Кредит"
              :collection="creditList"
              :defaultValue="additional.credit"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.credit)"
              @change="changeCredit"
              @reset-field="resetCredit"
            />
            <SelectField
              class="additional-field"
              label="Пригнан из"
              :collection="countryList"
              :defaultValue="additional.imported"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.imported)"
              @change="changeImported"
              @reset-field="resetImported"
            />
            <SelectField
              class="additional-field"
              label="Авто не в Украине"
              :collection="ukraineList"
              :defaultValue="additional.isUkraine"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.isUkraine)"
              @change="changeIsUkraine"
              @reset-field="resetIsUkraine"
            />
            <SelectField
              class="additional-field"
              label="Продавец"
              :collection="sellerList"
              :defaultValue="additional.seller"
              :isAutoComplete="true"
              :isReset="!isEmpty(!!additional.seller)"
              @change="changeSeller"
              @reset-field="resetSeller"
            />
          </div>
          <div class="additional-inner-wrapper is-none-border" v-if="!isEmpty(!!typeId)">
            <CarAdditionalStats
              class="additional-options"
              className="subscriptions"
              :carType="typeId"
              :carStates="additional.carStates"
              :carComfort="additional.carComfort"
              :carMultimedia="additional.carMultimedia"
              :carSecurity="additional.carSecurity"
              :carAnother="additional.carAnother"
              @change-states="changeStates"
              @change-comfort="changeComfort"
              @change-multimedia="changeMultimedia"
              @change-security="changeSecurity"
              @change-another="changeAnother"
            />
          </div>
        </template>
      </AcordionSingle>
      <AcordionSingle class="subscription is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
        <template slot="header">
          <AccordionHeaderWithNumber :number="4" title="Получение рассылки" />
        </template>
        <template slot="content">
          <div class="subscription-info">
            <svg class="info-icon">
              <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
            </svg>
            <p class="info-inner-wrapper">
              <span class="info-text">Ориентировочное количество добавленных объявлений в день на сайт autosill.ua по указанным Вами параметрам составит:</span>
              <span class="info-similar-ads">129 объявлений</span>
              <span class="info-hint">Если по активному профилю рассылки нет новых предложений, письмо отправляться не будет.</span>
            </p>
          </div>
          <div class="subscription-social-wrapper row no-guter">
            <div class="subscription-social col-12 col-sm-6 pr-sm-16">
              <h3 class="subscription-social-title">Получение рассылки</h3>
              <CheckBoxGroup class="subscription-social-list" :value="subscriptionResource" :collection="subscriptionResourceList" @change="selectSubscriptionResource" />
            </div>
            <div class="subscription-social col-12 col-sm-6 pr-sm-16">
              <h3 class="subscription-social-title">Время рассылки</h3>
              <CheckBoxGroup class="subscription-social-list" :value="subscriptionTime" :collection="subscriptionTimeList" @change="selectSubscriptionTime" />
            </div>
          </div>
          <InputCustomField class="technical-field" placeholder="mail@mail.com" type="email" label="Email для получения" :value="email" @change-field="changeEmail" />
          <button class="subscription-save-btn mt-8" type="button" @click="addSubscription">Сохранить рассылку</button>
        </template>
      </AcordionSingle>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
// components
import AcordionSingle from '~/components/base/AcordionSingle.vue';
import AccordionHeaderWithNumber from '~/components/base/AccordionHeaderWithNumber.vue';
import SelectField from '~/components/base/SelectField.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import InputCustomField from '~/components/base/InputCustomField.vue';
import RadioButtonGroup from '~/components/base/RadioButtonGroup.vue';
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
import CarAdditionalStats from '~/components/base/CarAdditionalStats.vue';
// mixins
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';
import getRouteNameFromPath from '~/mixins/getRouteNameFromPath.js';
import isEmpty from '~/mixins/isEmpty.js';
import isNull from '~/mixins/isNull.js';

export default {
  name: 'SubscriptionsCreate',
  mixins: [transformArrayForSelectBtn, isEmpty, isNull, getRouteNameFromPath],
  layout: 'personal',
  data() {
    return {
      mobileAdditionalShow: null,
      typesList: [],
      countryList: [],
      carBrandList: [],
      productionsYearsList: [],
      cauntrySelectedList: [{ id: 1, value: null, status: null }],
      carPaternsSelectList: [{ id: 1, brand: null, brandList: [], model: null, modelsList: [], status: null }],
      locationSelectList: [{ id: 1, city: null, cityList: [], region: null }],
      regionsList: [],
      typeId: null,
      yearFrom: null,
      yearTo: null,
      isCitiesLoading: false,
      priceList: [],
      currencyList: [],
      currency: null,
      isExchangeResources: null,
      isCarExchange: null,
      priceFrom: '',
      priceTo: '',
      consumptionAreaId: 1,
      consumption: {
        cityFrom: null,
        cityTo: null,
        roadFrom: null,
        roadTo: null,
        mixedFrom: null,
        mixedTo: null,
      },
      stats: {
        engineValueFrom: null,
        engineValueTo: null,
        enginePowerFrom: null,
        enginePowerTo: null,
        mileageFrom: null,
        mileageTo: null,
        carcase: [],
        transmission: [],
        color: [],
        fuel: [],
        driveUnit: [],
      },
      consumptionOptions: [
        { text: 'Город', value: 1 },
        { text: 'Трасса', value: 2 },
        { text: 'Смешанный', value: 3 },
      ],
      carcaseList: [],
      driveUnitsList: [],
      transmissionsList: [],
      fuelsList: [],
      colorsList: [],
      engineCapacitiesList: [],
      enginePowersList: [],
      additional: {
        customsClearance: null,
        damage: null,
        credit: null,
        imported: null,
        isUkraine: null,
        seller: null,
        carStates: [],
        carComfort: [],
        carMultimedia: [],
        carSecurity: [],
        carAnother: [],
      },
      customsClearanceList: [
        { text: 'Растаможенные', value: '1' },
        { text: 'Нерастаможенные', value: '0' },
      ],
      damageList: [
        { text: 'Битые', value: '1' },
        { text: 'Небитые', value: '0' },
      ],
      creditList: [
        { text: 'Кредитные', value: '1' },
        { text: 'Не кредитные', value: '0' },
      ],
      ukraineList: [
        { text: 'Показать', value: '1' },
        { text: 'Скрыть', value: '0' },
      ],
      sellerList: [],
      carConditionList: [],
      carComfortList: [],
      carMultimediaList: [],
      carSecurityList: [],
      carAnotherList: [],
      email: null,
      subscriptionResourceList: [
        { text: 'Email', value: 'email' },
        { text: 'Viber', value: 'viber' },
        { text: 'Telegram', value: 'telegram' },
      ],
      subscriptionResource: [],
      subscriptionTimeList: [
        { text: '8:00 - 10:00', value: 8 },
        { text: '12:00 - 14:00', value: 12 },
        { text: '16:00 - 18:00', value: 16 },
      ],
      subscriptionTime: [],
    };
  },
  computed: {
    getConsumptionValueFrom() {
      return this.consumptionAreaId === 1 ? this.consumption.cityFrom : this.consumptionAreaId === 2 ? this.consumption.roadFrom : this.consumption.mixedFrom;
    },

    getConsumptionValueTo() {
      return this.consumptionAreaId === 1 ? this.consumption.cityTo : this.consumptionAreaId === 2 ? this.consumption.roadTo : this.consumption.mixedTo;
    },
  },
  methods: {
    async addSubscription() {
      const serverData = {
        car_type_id: this.typeId,
        country: this.cauntrySelectedList.map((item) => ({ id: item.value, status: !!item.status })).filter((item) => !this.isNull(item.id)),
        mark_model: this.carPaternsSelectList.map((item) => ({ car_mark_id: item.brand, car_model_id: item.model, status: item.status })).filter((item) => !this.isNull(item.car_mark_id)),
        year_from: this.yearFrom,
        year_to: this.yearTo,
        region_id: this.locationSelectList.map((item) => item.region).filter((item) => !this.isNull(item)),
        city_id: this.locationSelectList.map((item) => item.city).filter((item) => !this.isNull(item)),
        currency_id: this.currency,
        price_min: Number(this.priceFrom),
        price_max: Number(this.priceTo),
        is_bargain: !!this.isExchangeResources,
        is_exchange_car: !!this.isCarExchange,
        consumption_city_from: this.consumption.cityFrom,
        consumption_city_to: this.consumption.cityTo,
        consumption_trail_from: this.consumption.roadFrom,
        consumption_trail_to: this.consumption.roadTo,
        consumption_mixed_from: this.consumption.mixedFrom,
        consumption_mixed_to: this.consumption.mixedTo,
        engine_capacity_from: this.stats.engineValueFrom,
        engine_capacity_to: this.stats.engineValueTo,
        engine_power_from: this.stats.enginePowerFrom,
        engine_power_to: this.stats.enginePowerTo,
        mileage_from: this.stats.mileageFrom,
        mileage_to: this.stats.mileageTo,
        car_serie_id: this.stats.carcase,
        transmission_id: this.stats.transmission,
        fuel_id: this.stats.fuel,
        drive_unit_id: this.stats.driveUnit,
        color_id: this.stats.color,
        is_cleared: this.isNull(this.additional.customsClearance) ? '' : this.additional.customsClearance,
        is_ukraine: this.isNull(this.additional.isUkraine) ? '' : this.additional.isUkraine,
        is_broken: this.isNull(this.additional.damage) ? '' : this.additional.damage,
        is_credit: this.isNull(this.additional.credit) ? '' : this.additional.credit,
        type_user_id: this.additional.seller,
        drive_id: this.additional.imported,
        car_condition_id: this.additional.carStates,
        car_comfort_id: this.additional.carComfort,
        car_multimedia_id: this.additional.carMultimedia,
        car_security_id: this.additional.carSecurity,
        car_another_id: this.additional.carAnother,
        service: this.subscriptionResource.length ? this.subscriptionResource[0] : '',
        time_from: this.subscriptionTime.length ? String(this.subscriptionTime[0]) : '',
        email: this.email,
      };

      let prepareData = {};

      for (let item in serverData) {
        if (/is_cleared|is_ukraine|is_broken|is_credit/.test(item) === true) {
          prepareData[item] = Number(serverData[item]);

          continue;
        }

        if (!this.isEmpty(serverData[item])) {
          prepareData[item] = serverData[item];
        }
      }

      try {
        const { data } = await this.$services.user.addUserSubscriptions(prepareData);
      } catch (error) {
        console.error(error);
      }
    },

    selectSubscriptionTime(selectList) {
      this.subscriptionTime = selectList;
    },

    selectSubscriptionResource(selectList) {
      this.subscriptionResource = selectList;
    },

    changeEmail(value) {
      this.email = value;
    },

    changeAnother(selectList) {
      this.additional.carAnother = selectList;
    },

    changeSecurity(selectList) {
      this.additional.carSecurity = selectList;
    },

    changeMultimedia(selectList) {
      this.additional.carMultimedia = selectList;
    },

    changeComfort(selectList) {
      this.additional.carComfort = selectList;
    },

    changeStates(selectList) {
      this.additional.carStates = selectList;
    },

    changeSeller(value) {
      this.additional.seller = value;
    },

    resetSeller() {
      this.additional.seller = null;
    },

    changeIsUkraine(value) {
      this.additional.isUkraine = value;
    },

    resetIsUkraine() {
      this.additional.isUkraine = null;
    },

    changeImported(value) {
      this.additional.imported = value;
    },

    resetImported() {
      this.additional.imported = null;
    },

    changeCredit(value) {
      this.additional.credit = value;
    },

    resetCredit() {
      this.additional.credit = null;
    },

    changeDamage(value) {
      this.additional.damage = value;
    },

    resetDamage() {
      this.additional.damage = null;
    },

    changeCustomsClearance(value) {
      this.additional.customsClearance = value;
    },

    resetCustomsClearance() {
      this.additional.customsClearance = null;
    },

    selectDriveUnit(optionList) {
      this.stats.driveUnit = optionList;
    },

    selectFuel(optionList) {
      this.stats.fuel = optionList;
    },

    selectColor(optionList) {
      this.stats.color = optionList;
    },

    selectTransmissions(optionList) {
      this.stats.transmission = optionList;
    },

    selectCarcase(optionList) {
      this.stats.carcase = optionList;
    },

    resetCarcase() {
      this.stats.carcase = [];
    },

    changeMileageFrom(value) {
      this.stats.mileageFrom = value;
    },

    changeMileageTo(value) {
      this.stats.mileageTo = value;
    },

    changeEnginePowerFrom(value) {
      this.stats.enginePowerFrom = value;
    },

    resetEnginePoserFrom() {
      this.stats.enginePowerFrom = null;
    },

    changeEnginePowerTo(value) {
      this.stats.enginePowerTo = value;
    },

    resetEnginePoserTo() {
      this.stats.enginePowerTo = null;
    },

    changeEngineValueFrom(value) {
      this.stats.engineValueFrom = value;
    },

    resetEngineValueFrom() {
      this.stats.engineValueFrom = null;
    },

    changeEngineValueTo(value) {
      this.stats.engineValueTo = value;
    },

    resetEngineValueTo() {
      this.stats.engineValueTo = null;
    },

    changeConsumptionFrom(areaId, value) {
      switch (areaId) {
        case 1:
          this.consumption.cityFrom = value;
          break;
        case 2:
          this.consumption.roadFrom = value;
          break;
        default:
          this.consumption.mixedFrom = value;
          break;
      }
    },

    changeConsumptionTo(areaId, value) {
      switch (areaId) {
        case 1:
          this.consumption.cityTo = value;
          break;
        case 2:
          this.consumption.roadTo = value;
          break;
        default:
          this.consumption.mixedTo = value;
          break;
      }
    },

    changeConsumptionArea(selectOption) {
      this.consumptionAreaId = selectOption;
    },

    selectCurrency(value) {
      this.currency = value;
    },

    resetCurrency() {
      this.currency = 2;
    },

    changePriceTo(value) {
      this.priceTo = value;
    },

    changePriceFrom(value) {
      this.priceFrom = value;
    },

    setExchangeResources(selectStatus) {
      this.isExchangeResources = selectStatus;
    },

    setCarExchange(selectStatus) {
      this.isCarExchange = selectStatus;
    },

    addMoreLocations() {
      const id = this.locationSelectList.length + 1;

      this.locationSelectList = [...this.locationSelectList, { id: id, city: null, cityList: [], region: null }];
    },

    selectCity(cityId, target) {
      this.locationSelectList = this.locationSelectList.map((item) => {
        if (item.id === target.id) {
          return { ...item, city: cityId };
        }

        return item;
      });
    },

    resetCity({ id }) {
      this.locationSelectList = this.locationSelectList.map((item) => {
        if (item.id === id) {
          return { ...item, city: null };
        }

        return item;
      });
    },

    async handlerPrefetchCity({ id, region }) {
      if (this.isEmpty(!!region)) return;

      try {
        this.isCitiesLoading = true;

        const cities = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCities(region)).data.cities);

        this.locationSelectList = this.locationSelectList.map((item) => {
          if (item.id === id) {
            return { ...item, cityList: cities };
          }

          return item;
        });
        this.isCitiesLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    selectRegion(regionId, target) {
      this.locationSelectList = this.locationSelectList.map((item) => {
        if (item.id === target.id) {
          return { ...item, region: regionId, city: null, cityList: [] };
        }

        return item;
      });
    },

    resetRegion({ id }) {
      this.locationSelectList = this.locationSelectList.map((item) => {
        if (item.id === id) {
          return { ...item, region: null, city: null, cityList: [] };
        }

        return item;
      });
    },

    selectYearTo(yearTo) {
      this.yearTo = yearTo;
    },

    resetYearTo() {
      this.yearTo = null;
    },

    selectYearForm(yearFrom) {
      this.yearFrom = yearFrom;
    },

    resetYearFrom() {
      this.yearFrom = null;
    },

    selectModel(modelId, target) {
      this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
        if (item.id === target.id) {
          return { ...item, model: modelId };
        }

        return item;
      });
    },

    resetModel({ id }) {
      this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
        if (item.id === id) {
          return { ...item, model: null };
        }

        return item;
      });
    },

    changeCarPrototypeStatus(value, target) {
      this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
        if (item.id === target.id) {
          return { ...item, status: value };
        }

        return item;
      });
    },

    addMoreCar() {
      const id = this.carPaternsSelectList.length + 1;

      this.carPaternsSelectList = [...this.carPaternsSelectList, { id: id, brand: null, brandList: this.carBrandList, model: null, modelsList: [], status: null }];
    },

    async selectBrand(brandId, target) {
      try {
        const models = this.transformArrayForSelectBtn((await this.$services.filter.getFilterModel(this.typeId, brandId)).data.models);

        this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
          if (item.id === target.id) {
            return { ...item, brand: brandId, modelsList: models };
          }

          return item;
        });
      } catch (error) {
        console.error(error);
      }
    },

    resetBrand({ id }) {
      this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
        if (item.id === id) {
          return { ...item, brand: null, model: null, modelsList: [], status: null };
        }

        return item;
      });
    },

    async selectType(typeId) {
      this.typeId = typeId;

      await (async () => {
        try {
          this.carBrandList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterBrand(typeId)).data.marks);

          this.carPaternsSelectList = this.carPaternsSelectList.map((item) => {
            if (item.id === 1) {
              return { ...item, brandList: this.carBrandList };
            }

            return item;
          });
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          this.carcaseList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarcase(this.typeId)).data.series);
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          const { transmissions, driveUnits, fuels, engineCapacities, enginePowers, colors } = (await this.$services.filter.getFilterCharacteristic(this.typeId)).data;

          this.transmissionsList = this.transformArrayForSelectBtn(transmissions);
          this.driveUnitsList = this.transformArrayForSelectBtn(driveUnits);
          this.fuelsList = this.transformArrayForSelectBtn(fuels);
          this.colorsList = this.transformArrayForSelectBtn(colors);
          this.engineCapacitiesList = this.transformArrayForSelectBtn(engineCapacities);
          this.enginePowersList = this.transformArrayForSelectBtn(enginePowers);
        } catch (error) {
          console.error(error);
        }
      })();
    },

    resetType() {
      this.typeId = null;
      this.carConditionList = [];
      this.carcaseList = [];
      this.carPaternsSelectList = [{ id: 1, brand: null, brandList: [], model: null, modelsList: [], status: null }];
    },

    selectCauntry(value, target) {
      this.cauntrySelectedList = this.cauntrySelectedList.map((item) => {
        if (item.id === target.id) {
          return { ...item, value: value };
        }

        return item;
      });
    },

    changeCauntryStatus(value, target) {
      this.cauntrySelectedList = this.cauntrySelectedList.map((item) => {
        if (item.id === target.id) {
          return { ...item, status: value };
        }

        return item;
      });
    },

    resetCauntry({ id }) {
      this.cauntrySelectedList = this.cauntrySelectedList.map((item) => {
        if (item.id === id) {
          return { ...item, value: null, status: null };
        }

        return item;
      });
    },

    addMoreCauntries() {
      const id = this.cauntrySelectedList.length + 1;

      this.cauntrySelectedList = [...this.cauntrySelectedList, { id: id, value: null, status: true }];
    },

    initializationEdit(paramsList) {
      const prepareData = {};

      for (let item in paramsList) {
        if (!this.isEmpty(paramsList[item])) prepareData[item] = paramsList[item];
      }

      const setRegion = async (regions, cities) => {
        let regionList = [];
        let citiesList = [];
        let id = 1;

        for (let item of regions) {
          try {
            citiesList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCities(item.id)).data.cities);
          } catch (error) {
            console.log(error);
          }

          regionList = [...regionList, { id: id, city: null, cityList: citiesList, region: item.id }];
          id += 1;
        }

        for (let item of cities) {
          const findRegion = regionList.find((target) => item.region_id === target.region && this.isNull(target.city));

          if (!!findRegion) {
            regionList = regionList.map((target) => {
              if (target.id === findRegion.id) return { ...target, city: item.id };

              return target;
            });
          }
        }

        this.locationSelectList = regionList;
      };

      const setCountry = (countries) => {
        let countriesList = [];
        let id = 1;

        for (let item of countries) {
          countriesList = [...countriesList, { id: id, value: item.pivot.country_id, status: !!item.pivot.status }];

          id += 1;
        }
        this.$nextTick(() => {
          this.cauntrySelectedList = [...countriesList];
        });
      };

      for (let item in prepareData) {
        switch (item) {
          case 'car_type_id':
            this.typeId = paramsList[item];
            this.selectType(paramsList[item]);
            break;
          case 'country':
            setCountry(paramsList[item]);
            break;
          case 'car_mark':
            this.carPaternsSelectList = paramsList[item];
            break;
          case 'car_model':
            this.carPaternsSelectList = paramsList[item];
            break;
          case 'year_from':
            this.yearFrom = paramsList[item];
            break;
          case 'year_to':
            this.yearTo = paramsList[item];
            break;
          case 'region':
            setRegion(paramsList[item], paramsList['city']);
            break;
          case 'currency_id':
            this.currency = paramsList[item];
            break;
          case 'price_min':
            this.priceFrom = paramsList[item];
            break;
          case 'price_max':
            this.priceTo = paramsList[item];
            break;
          case 'is_bargain':
            this.isExchangeResources = !!paramsList[item];
            break;
          case 'car_serie':
            this.stats.carcase = paramsList[item].map((item) => item.id);
            break;
          case 'is_exchange_car':
            this.isCarExchange = !!paramsList[item];
            break;
          case 'consumption_city_from':
            this.consumption.cityFrom = paramsList[item];
            break;
          case 'consumption_city_to':
            this.consumption.cityTo = paramsList[item];
            break;
          case 'consumption_trail_from':
            this.consumption.roadFrom = paramsList[item];
            break;
          case 'consumption_trail_to':
            this.consumption.roadTo = paramsList[item];
            break;
          case 'consumption_mixed_from':
            this.consumption.mixedFrom = paramsList[item];
            break;
          case 'consumption_mixed_to':
            this.consumption.mixedTo = paramsList[item];
            break;
          case 'engine_capacity_from':
            this.stats.engineValueFrom = paramsList[item];
            break;
          case 'engine_capacity_to':
            this.stats.engineValueTo = paramsList[item];
            break;
          case 'engine_power_from':
            this.stats.enginePowerFrom = paramsList[item];
            break;
          case 'engine_power_to':
            this.stats.enginePowerTo = paramsList[item];
            break;
          case 'mileage_from':
            this.stats.mileageFrom = paramsList[item];
            break;
          case 'mileage_to':
            this.stats.mileageTo = paramsList[item];
            break;
          case 'transmission':
            this.stats.transmission = paramsList[item].map((item) => item.id);
            break;
          case 'fuels':
            this.stats.fuel = paramsList[item].map((item) => item.id);
            break;
          case 'drive_unit':
            this.stats.driveUnit = paramsList[item].map((item) => item.id);
            break;
          case 'colors':
            this.stats.color = paramsList[item].map((item) => item.id);
            break;
          case 'is_cleared':
            this.additional.customsClearance = String(paramsList[item]);
            break;
          case 'is_ukraine':
            this.additional.isUkraine = String(paramsList[item]);
            break;
          case 'is_broken':
            this.additional.damage = String(paramsList[item]);
            break;
          case 'is_credit':
            this.additional.credit = String(paramsList[item]);
            break;
          case 'type_user_id':
            this.additional.seller = paramsList[item];
            break;
          case 'drive_id':
            this.additional.imported = paramsList[item];
            break;
          case 'car_condition':
            this.additional.carStates = paramsList[item].map((item) => item.id);
            break;
          case 'car_comfort':
            this.additional.carComfort = paramsList[item].map((item) => item.id);
            break;
          case 'car_multimedia':
            this.additional.carMultimedia = paramsList[item].map((item) => item.id);
            break;
          case 'car_security':
            this.additional.carSecurity = paramsList[item].map((item) => item.id);
            break;
          case 'car_another':
            this.additional.carAnother = paramsList[item].map((item) => item.id);
            break;
          case 'service':
            this.subscriptionResource = [paramsList[item]];
            break;
          case 'time_from':
            this.subscriptionTime = [Number(paramsList[item])];
            break;
          case 'email':
            this.email = paramsList[item];
            break;
        }
      }
    },
  },
  async mounted() {
    this.productionsYearsList = [...new Array(moment().format('YYYY') - 1899).keys()].map((item, index) => 1900 + index);

    await (async () => {
      try {
        this.typesList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterTransportTypes()).data.types);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        this.countryList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCountries()).data.countries);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        this.regionsList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterRegions()).data.regions);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { currencies, current_default } = (await this.$services.filter.getFilterCurrencies()).data;
        this.currencyList = currencies.map((item) => ({ text: item.symbol, value: item.id }));
        this.currency = current_default.id;
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        this.sellerList = this.transformArrayForSelectBtn((await this.$services.auth.getUserRole()).data.type_user);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      if (/edit/.test(this.$route.path)) {
        const subscriptionId = this.$route.path.match(/\b\d+\b$/)[0];

        try {
          const { newsletter } = (await this.$services.user.getUserSubscription(subscriptionId)).data;

          this.initializationEdit(newsletter);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  },
  components: {
    AcordionSingle,
    AccordionHeaderWithNumber,
    SelectField,
    CheckBox,
    InputCustomField,
    RadioButtonGroup,
    CheckBoxGroup,
    CarAdditionalStats,
  },
};
</script>

<style lang="scss" scoped>
.subscriptions-form-wrapper {
  padding-bottom: 70px;
  width: 100%;
  @include init-font;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }
  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }

  .subscriptions-link {
    display: flex;
    align-items: center;
    @include init-title(#8fa5b0, 13px, 400, 16px);

    .subscriptions-link-icon {
      margin-right: 13px;
      width: 4px;
      height: 8px;
      fill: #8fa5b0;
    }
  }

  .subscriptions-title {
    @extend .title-xxxl;
  }

  .subscriptions-info {
    display: flex;
    max-width: 690px;
    @include init-title(#70848e, 14px, 400, 17px);

    .info-link-icon {
      margin-right: 10px;
      min-width: 18px;
      width: 18px;
      height: 18px;
    }
  }

  .subscriptions-form {
    .is-none-border {
      padding-bottom: 0 !important;
      box-shadow: none !important;
      margin-bottom: 0 !important;
    }

    .general {
      .select-wrapper {
        padding-bottom: 20px;
        margin-bottom: 24px;
        box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

        .select-inner-wrapper {
          margin-top: 0;
          max-width: 268px;
          width: 100%;
        }

        .check-box-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-self: flex-end;
          height: 36px;

          .check-box {
            .check-box-label {
              display: flex;
              align-items: center;
              width: 100%;

              .label-text {
                display: inline-block;

                width: calc(100% - 68px);
                max-width: max-content;

                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .check-box-label-icon {
                margin-left: 6px;
                margin-top: 1px;

                width: 18px;
                height: 18px;
              }
            }
          }
        }

        .select-list {
          display: flex;
          flex-direction: column;
          gap: 12px 0;

          .select-list-item {
            display: flex;
            gap: 0 32px;
          }
        }

        .more-btn {
          display: flex;
          justify-content: center;
          align-items: center;

          padding-left: 24px;

          @extend .button-outline-classic;

          .more-btn-icon {
            margin-right: 13px;
            width: 18px;
            height: 18px;
            fill: #4a4d5c;
          }
        }
      }

      .is-type {
        margin-top: 24px;

        .select-inner-wrapper {
          max-width: 568px;
        }
      }

      .is-production-years {
        display: flex;

        .select-inner-wrapper {
        }

        & .select-inner-wrapper:last-child {
          align-self: flex-end;
        }
      }

      .is-price {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 0;
        margin-top: 24px;
        margin-bottom: 0;
        box-shadow: none;

        .select-inner-wrapper {
          align-self: flex-end;
        }

        .is-price-field {
          flex-basis: 200px;
          flex: 1;
        }

        .is-currency {
          align-self: flex-end;
          margin-top: 0;
          max-width: 70px;
        }

        .check-box-wrapper {
          width: 100%;
          height: auto;
        }
      }
    }

    .technical {
      .technical-inner-wrapper {
        padding-bottom: 20px;
        margin: 24px 0;
        box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

        .consumption-title {
        }

        .checkbox-group {
          .checkbox-group-title {
            @extend .title-xl;
          }

          .check-box {
            margin-top: 16px;
          }
        }

        .technical-field {
          margin-top: 0;
          max-width: 268px;
          width: 100%;
        }

        .is-bottom-align {
          align-self: flex-end;
        }

        .technical-field-wrapper {
          display: flex;
        }

        .radio-button-group {
          ::v-deep .v-input--radio-group__input {
            flex-direction: row;

            .v-radio:not(:last-child):not(:only-child) {
              margin-bottom: 0;
              margin-right: 60px;
            }
          }
        }
      }

      .is-grid {
        display: grid;
        grid-template-columns: repeat(2, 268px);
        gap: 20px 32px;
      }

      .is-grid-3x {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .additional {
      .additional-inner-wrapper {
        padding-bottom: 20px;
        margin: 24px 0;
        box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);
      }

      .is-select-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 24px;
        gap: 20px 32px;
        width: 100%;

        .additional-field {
          margin-top: 0;
        }
      }
    }

    .subscription {
      z-index: 0;

      .subscription-info {
        display: flex;
        margin-top: 38px;
        max-width: 740px;

        .info-icon {
          margin-right: 10px;
          min-width: 18px;
          width: 18px;
          height: 18px;
        }

        .info-inner-wrapper {
          .info-text {
            display: block;
            @include init-title(#70848e, 14px, 400, 17px);
          }

          .info-similar-ads {
            display: block;

            padding: 2px 4px;
            margin-top: 10px;

            max-width: max-content;

            @include init-title(#4a4d5c, 13px, 400, 16px);
            background: #d5ebfd;
            border-radius: 2px;
          }

          .info-hint {
            margin-top: 10px;
            @extend .info-text;
          }
        }
      }

      .subscription-social-wrapper {
        display: flex;
        margin-top: 38px;

        .subscription-social {
          .subscription-social-title {
            @extend .title-xl;
          }

          .subscription-social-list {
            margin-top: 16px;
          }
        }
      }

      .technical-field {
        margin-top: 22px;
        max-width: 268px;
      }

      .subscription-save-btn {
        max-width: max-content;
        padding: 0 20px;
        @extend .accept-green-btn;
      }
    }

    .is-accordion {
      margin-top: 24px;

      ::v-deep .is-simple {
        padding: 0;
        box-shadow: none;
      }
    }
  }
}

@include xs {
  .subscriptions-form-wrapper {
    .title-xxxl {
      font-size: 22px;
      line-height: 24px;
    }

    .title-xl {
      font-size: 16px;
      line-height: 18px;
    }

    .subscriptions-link {
      display: none;
    }

    .subscriptions-form {
      .is-accordion {
        margin-top: 20px;
      }

      .general {
        .is-price {
          .is-price-field {
            max-width: 268px !important;
          }

          .is-currency {
            max-width: 70px !important;
          }
        }

        .select-wrapper .select-inner-wrapper {
          max-width: none;
        }
      }

      .technical {
        .technical-inner-wrapper .technical-field {
          max-width: none;
        }

        .is-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
      }

      .additional {
        .is-select-wrapper {
          grid-template-columns: repeat(2, 1fr);
          margin-top: 20px;
          gap: 16px 18px;
        }

        .additional-inner-wrapper {
          margin-top: 20px;

          .additional-options {
            ::v-deep .additional-option-wrapper {
              margin-top: 0;
              padding-bottom: 0;
              box-shadow: none;
            }

            ::v-deep .is-mobile {
              .check-box-list {
                flex-wrap: nowrap;

                .check-box-item {
                  max-width: 100%;
                }
              }
            }
          }
        }
      }

      .subscription {
        margin-top: 20px;

        .subscription-info {
          margin-top: 20px;
        }

        .subscription-social-wrapper {
          margin-top: 20px;
        }

        .technical-field {
          margin-top: 20px;
        }

        .subscription-save-btn {
          margin-top: 20px !important;
        }
      }
    }
  }
}

@include small {
  .subscriptions-form-wrapper .subscriptions-form {
    .general {
      .select-wrapper .select-list .select-list-item {
        display: block;

        .check-box-wrapper {
          margin-top: 16px;
          height: max-content;
        }
      }

      .is-production-years {
        display: block;

        & div:last-child {
          margin: 16px 0 0 0 !important;
        }
      }

      .is-location {
        .select-list .select-list-item {
          div:nth-child(2) {
            margin-top: 16px;
          }
        }
      }

      .is-price {
        flex-direction: column;
        flex-wrap: nowrap;

        div:nth-child(2) {
          margin-top: 16px !important;
        }

        div:nth-child(3) {
          margin: 16px 0 0 0 !important;
          align-self: flex-start;
        }

        .is-price-field {
          max-width: 100% !important;
          margin: 0 !important;
        }
      }

      .is-select-car {
        .select-list .select-list-item {
          div:nth-child(2) {
            margin-top: 16px;
          }
        }
      }
    }

    .technical {
      .technical-inner-wrapper {
        flex-direction: column;
        margin: 20px 0;

        .is-price-field {
          flex-direction: column;

          & div:last-child {
            margin: 16px 0 0 0 !important;
          }
        }

        .radio-button-group {
          ::v-deep .v-input--radio-group__input {
            flex-direction: column;
            gap: 16px;
          }
        }
      }

      .is-technical-stats {
        grid-template-columns: repeat(1, 1fr);
      }

      .is-technical-characteristic {
        grid-template-columns: repeat(1, 1fr);

        & div:last-child {
          margin: 16px 0 0 0 !important;
        }
      }
    }

    .additional .additional-inner-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
