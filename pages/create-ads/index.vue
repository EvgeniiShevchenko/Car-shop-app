<template>
  <main class="main container">
    <div class="advertising row no-gutters">
      <form class="advertising-form col-md-12 col-lg-10 pr-md-0 pr-lg-4">
        <div class="bread-crumb"></div>
        <div>
          <h1 class="advertising-title">Добавление нового объявления</h1>
          <p class="advertising-subtitle">
            При добавлении нового объявления, пожалуйста, указывайте корректную информацию о вашем транспортном средстве. Это поможет быстрее совершить прожажу на нашей площадке.
          </p>
          <AcordionSingle class="general is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
            <template slot="header">
              <AccordionHeader :number="1" :title="`${$vuetify.breakpoint.xs ? 'Основное' : 'Основная информация'}`" />
            </template>
            <template slot="content">
              <div class="general-info">
                <svg class="general-info-icon">
                  <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                </svg>
                <p>Обязательные поля для заполнения помечены звездочкой -&#160;<span class="info-mobile-mark" v-if="$vuetify.breakpoint.xs">*</span></p>
              </div>
              <MainFilter class="filter-wrapper" className="create-ads" @change-carcase="carcase = $event" @change-year="createYear = $event" @change-modification="modification = $event" />
              <div class="vin-code">
                <h3 class="vin-code-title">Авто со статусом «Проверений VIN-код» продаются вдвое быстрее</h3>
                <p class="vin-code-subtitle">Авто со статусом «Проверений VIN-код» продаются вдвое быстрее</p>
                <label class="vin-code-label">VIN-код&#160;</label>
                <input class="vin-code-input" :value="vinCode" type="text" placeholder="VIN-код" @input="changeVinCode" />
              </div>
            </template>
          </AcordionSingle>
        </div>
        <AcordionSingle class="price is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
          <template slot="header">
            <AccordionHeader :number="2" title="Стоимость" />
          </template>
          <template slot="content">
            <label class="price-label">Цена</label>
            <div class="price-fiel-wrapper row no-gutters">
              <input class="price-field" :value="price" type="number" maxlength="20" @input="changePrice" />
              <SelectBtn
                class="price-select"
                :options="currencyList"
                :value="currency"
                :payload="true"
                :isReset="currency !== currencyDefault"
                @change="selectCurrency($event)"
                @reset="resetFildCurrency"
              />
            </div>
            <div class="check-box-wrapper">
              <Tooltip :isHover="true" text="Эта функция позволяет общаться с потенциальными покупателями на странице объявления. Комментарии будут доступны для просмотра всем посетителям страницы.">
                <template slot="activator">
                  <CheckBox class="check-box" :value="isComment" label="комментарий" @change="setComment" :isLabel="true">
                    <template slot="label">
                      <p class="check-box-label">
                        комментарий
                        <svg class="check-box-label-icon">
                          <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                        </svg>
                      </p>
                    </template>
                  </CheckBox>
                </template>
              </Tooltip>
            </div>
            <div class="check-box-wrapper">
              <CheckBox class="check-box" :value="isCustomsCleared" label="комментарий" @change="setCustomsCleared" :isLabel="true">
                <template slot="label">
                  <p class="check-box-label">
                    автомобиль не расстаможен
                    <svg class="check-box-label-icon">
                      <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                    </svg>
                  </p>
                </template>
              </CheckBox>
              <div class="current-location" v-if="isCustomsCleared">
                <RadioButtonGroup :collection="customsOptions" :value="isUkraine" @change="changeCustoms" />
                <label class="country-label">{{ isUkraine === 1 ? 'Пригнан из' : 'Пригоню с' }}</label>
                <SelectBtn
                  class="select-country"
                  :options="countryList"
                  :value="importedCountry"
                  :payload="true"
                  :loading="isCountriesLoading"
                  :isReset="!isNull(importedCountry)"
                  label="Выбрать"
                  @change="selectCountry($event)"
                  @focus="prefetchCountries()"
                  @reset="resetCountryField"
                />
              </div>
            </div>
            <div class="check-box-wrapper">
              <Tooltip :isHover="true" text="Включите эту функцию, если хотите договориться о цене с покупателем">
                <template slot="activator">
                  <CheckBox class="check-box" :value="isBargain" label="комментарий" @change="setBargain" :isLabel="true">
                    <template slot="label">
                      <p class="check-box-label">
                        возможен торг
                        <svg class="check-box-label-icon">
                          <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                        </svg>
                      </p>
                    </template>
                  </CheckBox>
                </template>
              </Tooltip>
            </div>
            <div class="check-box-wrapper">
              <Tooltip :isHover="true" text="Включите эту функцию, если хотите договориться о цене с покупателем">
                <template slot="activator">
                  <CheckBox class="check-box" :value="isExchangeResources" label="комментарий" @change="setExchangeResources" :isLabel="true">
                    <template slot="label">
                      <div class="check-box-label">
                        <p class="label-text">возможен обмен на недвижимость</p>
                        <svg class="check-box-label-icon">
                          <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                        </svg>
                      </div>
                    </template>
                  </CheckBox>
                </template>
              </Tooltip>
            </div>
            <div class="check-box-wrapper">
              <Tooltip :isHover="true" text="Включите эту функцию, если хотите обменять автомобиль на другой">
                <template slot="activator">
                  <CheckBox class="check-box" :value="isCarExchange" label="комментарий" @change="setCarExchange" :isLabel="true">
                    <template slot="label">
                      <div class="check-box-label">
                        <p class="label-text">возможен обмен на автомобиль</p>
                        <svg class="check-box-label-icon">
                          <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
                        </svg>
                      </div>
                    </template>
                  </CheckBox>
                </template>
              </Tooltip>
            </div>
          </template>
        </AcordionSingle>
        <AcordionSingle class="drop-box-wrapper is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
          <template slot="header">
            <AccordionHeader :number="3" title="Добавление фотографий" />
          </template>
          <template slot="content">
            <DropZone class="drop-box" :style="`display: ${isServer ? 'none' : ''}`" @change-image="changeImageList" />
          </template>
        </AcordionSingle>
        <AcordionSingle class="description is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
          <template slot="header">
            <AccordionHeader :number="4" title="Описание" />
          </template>
          <template slot="content">
            <p class="description-info">
              <svg class="description-info-icon">
                <use xlink:href="~assets/images/sprites/global.svg#info-default-w-16" />
              </svg>
              Опишите ваше транспортное средство, какими особенностями он обладает, что нужно знать потенциальному покупателю перед его покупкой. Честное и развернутое описание увеличивает вероятность
              продажи вашего транспортного средства.
            </p>
            <label class="description-label">Описание транспортного средства</label>
            <textarea
              class="description-field"
              :value="description"
              cols="30"
              rows="10"
              maxlength="2000"
              placeholder="Детально опишите особенности вашего транспортного средства"
              @input="changeDescription"
            ></textarea>
            <p class="description-hint">Доступно символов: 2000</p>
          </template>
        </AcordionSingle>
        <AcordionSingle class="additional-wrapper is-accordion" className="simple" :isCustomizingMark="true" :sizeMark="30" colorMark="#1768AC" :isOpen="0">
          <template slot="header">
            <AccordionHeader :number="5" title="Дополнительные характеристики" />
          </template>
          <template slot="content">
            <CreateAdsAdditional @change="additionalcollection = $event" :transportType="type" v-if="!isEmpty(!!type)" />
          </template>
        </AcordionSingle>
        <div class="agree">
          <CheckBox class="check-box" :value="agreement" :isLabel="true" @change="changeAgreement">
            <template slot="label">
              <p class="check-box-label">Я согласен с условиями<a class="agree-ref" href="#" @click.prevent.stop="goToAgree">cоглашения об использовании сервиса AutoSill</a></p>
            </template>
          </CheckBox>
        </div>
        <button class="add-advertising-btn" type="button" @click="createAds">Разместить объявление</button>
      </form>
      <div class="advertising-block-wrapper col-md-12 col-lg-2 pl-md-0 pl-lg-4"></div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
// components
import AcordionSingle from '~/components/base/AcordionSingle.vue';
import SelectBtn from '~/components/base/SelectBtn.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import RadioButtonGroup from '~/components/base/RadioButtonGroup.vue';
import DropZone from '~/components/base/DropZone.vue';
import Tooltip from '~/components/base/Tooltip.vue';
import AccordionHeader from '~/components/modules/create-ads/AccordionHeader.vue';
import CreateAdsAdditional from '~/components/modules/create-ads/CreateAdsAdditional.vue';
import MainFilter from '~/components/modules/main/MainFilter.vue';
// mixins
import isNull from '~/mixins/isNull.js';
import isEmpty from '~/mixins/isEmpty.js';
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';

export default {
  name: 'CreateAds',
  mixins: [isNull, isEmpty, transformArrayForSelectBtn],
  data() {
    return {
      currencyDefault: null,
      currency: null,
      currencyList: [],
      isComment: false,
      isCustomsCleared: false,
      isBargain: false,
      isExchangeResources: false,
      isCarExchange: false,
      additionalcollection: {},
      description: '',
      agreement: null,
      price: null,
      modification: '',
      vinCode: '',
      productionYear: null,
      isUkraine: 1,
      customsOptions: [
        { text: 'Авто в Украине', value: 1 },
        { text: 'Авто не в Украине', value: 2 },
      ],
      countryList: [],
      importedCountry: null,
      isCountriesLoading: false,
      carcase: null,
      createYear: null,
      imageList: [],
      mainImage: null,
    };
  },
  computed: {
    isServer() {
      return this.$isServer;
    },

    ...mapState({
      type: (state) => state.filter.filter.type,
      brand: (state) => state.filter.filter.brand,
      model: (state) => state.filter.filter.model,
      location: (state) => state.filter.filter.location,
      mileage: (state) => state.filter.filter.mileageFrom,
      city: (state) => state.filter.filter.city,
    }),
  },
  methods: {
    async createAds() {
      const serverData = {
        car_type_id: this.type,
        car_mark_id: this.brand,
        car_model_id: this.model,
        region_id: this.location,
        city_id: this.city,
        mileage: this.mileage,
        year_begin: this.productionYear,
        modification: this.modification,
        price: this.price,
        comment: this.isComment,
        cleared: this.isCustomsCleared,
        bargain: this.isBargain,
        exchange_real_estate: this.isExchangeResources,
        exchange_car: this.isCarExchange,
        vin_code: this.vinCode,
        images: this.imageList,
        is_main: this.mainImage,
        description: this.description,
        transmission_id: this.additionalcollection.transmission,
        drive_unit_id: this.additionalcollection.driveUnits,
        fuel_id: this.additionalcollection.fuel,
        consumption_city: this.additionalcollection.consumptionCity,
        consumption_trail: this.additionalcollection.consumptionRoad,
        consumption_mixed: this.additionalcollection.consumptionCommon,
        engine_capacity_id: this.additionalcollection.engineCapacity,
        engine_power_id: this.additionalcollection.enginePowerValue,
        door_id: this.additionalcollection.amountDoors,
        color_id: this.additionalcollection.color,
        is_metallic: this.additionalcollection.isMetallic,
        car_condition_id: this.additionalcollection.carStates,
        car_comfort_id: this.additionalcollection.carComfort,
        car_multimedia_id: this.additionalcollection.carMultimedia,
        car_security_id: this.additionalcollection.carSecurity,
        car_another_id: this.additionalcollection.carAnother,
      };
      let prepareData = {};

      for (let item in serverData) {
        if (!this.isEmpty(serverData[item])) {
          prepareData[item] = serverData[item];
        }
      }

      try {
        const { data } = await this.$services.createAds.postAdditionalNewAds(prepareData);
        console.log('🚀 ~ file: index.vue ~ line 315 ~ createAds ~ data', data);
      } catch (error) {
        console.error(error);
      }
    },

    changeImageList({ images, main }) {
      this.imageList = images.map((item) => item.dataURL);
      this.mainImage = main;
    },

    goToAgree() {
      window.location = '/agree';
    },

    selectCurrency({ text, value }) {
      this.currency = value;
    },

    resetFildCurrency() {
      this.currency = this.currencyDefault;
    },

    setComment(selectStatus) {
      this.isComment = selectStatus;
    },

    setCustomsCleared(selectStatus) {
      this.isCustomsCleared = selectStatus;

      if (!selectStatus) this.isUkraine = 1;
    },

    setBargain(selectStatus) {
      this.isBargain = selectStatus;
    },

    setExchangeResources(selectStatus) {
      this.isExchangeResources = selectStatus;
    },

    setCarExchange(selectStatus) {
      this.isCarExchange = selectStatus;
    },

    changeDescription(e) {
      this.description = e.target.value;
    },

    changeAgreement(isSelect) {
      this.agreement = isSelect;
    },

    changePrice(e) {
      this.price = e.target.valueAsNumber;
    },

    changeVinCode(e) {
      this.vinCode = e.target.value;
    },

    changeProductionYear(e) {
      this.productionYear = e.target.valueAsNumber;
    },

    changeCustoms(selectOption) {
      this.isUkraine = selectOption;
    },

    selectCountry({ text, value }) {
      this.importedCountry = value;
    },

    async prefetchCountries() {
      if (this.countryList.length) return;

      try {
        this.isCountriesLoading = true;

        const { regions } = (await this.$services.createAds.getAdditionalTest()).data;

        this.countryList = this.transformArrayForSelectBtn(regions);
        this.isCountriesLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    resetCountryField() {
      this.importedCountry = null;
    },
  },
  mounted() {
    (async () => {
      try {
        const { currencies, current_default } = (await this.$services.createAds.getAdditionalCurrenciesList()).data;

        this.currencyList = currencies.map((item) => ({ text: item.symbol, value: item.id }));
        this.currency = current_default.id;
        this.currencyDefault = current_default.id;
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const { data } = await this.$services.createAds.getAdditionalDraft();
        console.log('🚀 ~ file: index.vue ~ line 372 ~ data', data);
      } catch (error) {
        console.error(error);
      }
    })();
  },
  components: {
    AcordionSingle,
    AccordionHeader,
    MainFilter,
    SelectBtn,
    CheckBox,
    CreateAdsAdditional,
    DropZone,
    Tooltip,
    RadioButtonGroup,
  },
};
</script>

<style lang="scss" scoped>
.main {
  @include init-font;

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
  .title-m {
    @include init-title(#70848e, 14px, 400, 17px);
  }

  .advertising {
    .advertising-form {
      .bread-crumb {
      }

      .advertising-title {
        margin-top: 25px;
        @extend .title-xxxl;
      }

      .advertising-subtitle {
        @extend .title-m;
        margin-top: 32px;
      }

      .general {
        margin-top: 24px;

        .general-info {
          display: flex;
          align-items: center;

          @extend .title-m;
          margin-top: 23px;

          &::after {
            content: '*';
            color: #e8515b;
          }

          .general-info-icon {
            margin-right: 10px;

            min-width: 18px;
            width: 18px;
            height: 18px;
          }

          .info-mobile-mark {
            margin-left: 2px;
            color: #e8515b;
          }
        }

        .filter-wrapper {
          margin-top: 16px;

          ::v-deep .filter-form {
            .fuel {
              display: none;
            }

            .unit-box {
              display: none;
            }

            .customs {
              display: none;
            }

            .production-year {
              display: none;
            }

            .acordion-mileage {
              .mileage-from {
                width: 100%;
              }

              .mileage-to {
                display: none;
              }
            }

            .search-btn-wrapper {
              display: none;
            }

            .category-car {
              margin-bottom: 0 !important;
              order: 1;
            }

            .carcas {
              padding-right: 0;
              padding-left: 16px;
              order: 2;
            }

            .brend-car {
              order: 3;
            }

            .model-car {
              order: 5;
            }

            .location-car {
              order: 6;
            }

            .city {
              order: 8;
            }

            .modification {
              order: 9;
            }

            .year-begin {
              padding-right: 16px;
              width: calc(100% / 2);
              order: 7;
            }

            .acordion-mileage {
              margin-top: 12px;
              order: 4;
            }

            .filter-param-label {
              &::after {
                content: '*';
                margin-left: 2px;
                color: #f05156;
              }
            }
          }
        }

        .vin-code {
          padding: 24px;
          margin-top: 16px;

          background: #f2f7fa;
          border-radius: 4px;

          .vin-code-title {
            @extend .title-l;
          }

          .vin-code-subtitle {
            margin-top: 16px;

            @extend .title-m;
            color: #222329;
          }

          .vin-code-label {
            display: block;
            margin-top: 16px;

            &::after {
              content: '*';
              color: #f05156;
            }
          }

          .vin-code-input {
            @extend .input-text-classic;
            max-width: 444px;
            width: 100%;
            margin-top: 6px;

            line-height: 17px;
            font-weight: 400;
          }
        }
      }

      .price {
        margin-top: 24px;

        .price-label {
          display: inline-block;
          margin-top: 16px;

          &::after {
            margin-left: 2px;
            content: '*';
            color: #f05156;
          }
        }

        .price-fiel-wrapper {
          display: flex;
          flex-wrap: nowrap;
          padding-right: 16px;
          margin-top: 6px;
          max-width: calc(100% / 2);
          width: 100%;

          .price-field {
            @extend .input-text-classic;
            margin-right: 16px;
            max-width: 383px;
            width: 100%;
          }

          .price-select {
            flex: 1;
          }
        }

        .check-box-wrapper {
          margin-top: 16px;

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

          .current-location {
            .country-label {
              display: block;
              margin-top: 12px;

              font-size: 15px;
              line-height: 17px;
              color: #4a4d5c;
            }

            .select-country {
              margin-top: 6px;
              padding-right: 16px;
              max-width: calc(100% / 2);
            }
          }
        }
      }

      .drop-box-wrapper {
        position: relative;
        z-index: 0;

        .drop-box {
          margin-top: 16px;
        }

        .drop-box-list {
          display: flex;

          margin-top: 24px;

          .drop-box-item {
            .item-preview-wrapper {
              .item-preview {
              }
            }

            .item-check-box {
            }

            .item-btn-delete {
            }
          }
        }
      }

      .description {
        .description-info {
          @extend .title-m;
          display: flex;

          margin-top: 16px;
          max-width: 786px;

          .description-info-icon {
            margin-right: 10px;

            min-width: 18px;
            width: 18px;
            height: 18px;
          }
        }

        .description-label {
          display: block;
          margin-top: 16px;
        }

        .description-field {
          padding: 8px 8px;
          margin-top: 6px;

          max-height: 62px;
          max-width: 468px;
          width: 100%;

          border-radius: 2px;
          border: 1px solid #8fa5b0;
          resize: none;
          outline: none;
          line-height: 17px;
          color: #4a4d5c;

          &:focus {
            border: 1px solid #51a9f2;
          }

          &::placeholder {
            color: #8fa5b0;
          }
        }

        .description-hint {
          margin-top: 4px;

          font-size: 13px;
          line-height: 16px;
          color: #8fa5b0;
        }
      }

      .additional-wrapper {
      }

      .is-accordion {
        margin-top: 24px;

        ::v-deep .is-simple {
          padding: 0;
          box-shadow: none;
        }
      }

      .agree {
        display: flex;
        align-items: center;

        margin-top: 26px;
        padding-top: 24px;

        box-shadow: 0 -2px 0 -1px rgba(34, 35, 41, 0.1);

        .check-box {
          ::v-deep .v-input__slot {
            .v-input--selection-controls__input {
              align-self: flex-start;
              height: 20px;
              width: 20px;

              .v-icon {
                font-size: 26px;
                width: 20px;
                height: 20px;

                &::before {
                  width: 20px;
                  height: 20px;
                }
              }

              .mdi-checkbox-marked {
                &::before {
                  width: auto;
                  height: auto;
                }
              }
            }

            .v-label {
              font-size: 14px;
              color: #70848e;
            }
          }
        }

        .check-box-label {
          white-space: nowrap;

          .agree-ref {
            white-space: normal;
          }
        }

        .agree-ref {
          @extend .title-m;
          margin-left: 8px;
          color: #51a9f2;
        }
      }

      .add-advertising-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 20px;

        padding: 20px;
        height: 43px;

        background: #4cad33;
        border-radius: 2px;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #ffffff;

        &:hover {
          background: #2ca00d;
        }
      }
    }
  }
}

@include md {
  .main .advertising .advertising-block-wrapper {
    margin-top: 20px;
    height: 130px;
  }
}

@include xs {
  .main {
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

    .advertising .advertising-form {
      .advertising-title {
        margin-top: 0;
      }

      .advertising-subtitle {
        margin-top: 24px;
      }

      .price .price-fiel-wrapper {
        max-width: 100%;
        padding-right: 0;
      }

      .general {
        .general-info {
          .general-info-icon {
            align-self: flex-start;
          }

          &::after {
            content: none;
          }
        }

        .vin-code {
          padding: 16px 12px;

          .vin-code-subtitle {
            margin-top: 8px;
          }

          .vin-code-label {
            margin-top: 8px;
          }
        }

        .filter-wrapper {
          ::v-deep .filter-form {
            display: flex;
            flex-direction: column;

            .category-car {
              margin-top: 0;
            }

            .carcas {
              margin-top: 12px;
              padding-left: 0;
              order: 6;
            }

            .location-car {
              margin-top: 12px;
              order: 8;
            }

            .brend-car {
              order: 2;
            }

            .model-car {
              margin-top: 0;
              order: 3;
            }

            .modification {
              padding: 0;
              margin-top: 12px;
              max-width: 100%;
              order: 5;
            }

            .year-begin {
              padding: 0;
              width: 100%;
              order: 4;
            }

            .acordion-mileage {
              margin-top: 12px;
              order: 7;
            }

            .city {
              margin-top: 0;
              order: 9;
            }
          }
        }
      }

      .agree {
        margin-top: 0;
      }
    }
  }
}
</style>
