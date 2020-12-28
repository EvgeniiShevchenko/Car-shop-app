<template>
  <div class="additional">
    <div class="additional-general row no-gutters">
      <v-col class="select-wrapper col-12 pr-0 col-sm-6 pr-sm-4" :order="$vuetify.breakpoint.xs ? 1 : ''">
        <label class="select-label">Коробка передач</label>
        <SelectBtn class="select" :options="transmissionList" :value="additionalParams.transmission" label="Выбрать" :payload="true" @change="selecTtransmission($event)" />
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pl-0 pl-sm-4" :order="$vuetify.breakpoint.xs ? 5 : ''">
        <label class="select-label">Объем двигателя</label>
        <AutocompleteBtn class="select" :options="engineCapacityList" :value="additionalParams.engineCapacity" label="Выбрать" :payload="true" @change="selectEngineCapacity($event)" />
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pr-0 pr-sm-4" :order="$vuetify.breakpoint.xs ? 2 : ''">
        <label class="select-label">Привод</label>
        <SelectBtn class="select" :options="driveUnitsList" :value="additionalParams.driveUnits" label="Выбрать" :payload="true" @change="selectDriveUnits($event)" />
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pl-0 pl-sm-4" :order="$vuetify.breakpoint.xs ? 6 : ''">
        <label class="select-label">Мощность двигателя</label>
        <div class="powers-wrapper">
          <input class="powers-field" type="number" :value="additionalParams.enginePowerValue" placeholder="Мощность двигателя" @input="changeEnginePower" />
          <SelectBtn class="select" :options="enginePowersUnitList" :value="additionalParams.enginePowersUnit" label="л/с" :payload="true" @change="selectEnginePowersUnit($event)" />
        </div>
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pr-0 pr-sm-4" :order="$vuetify.breakpoint.xs ? 3 : ''">
        <label class="select-label">Топливо</label>
        <SelectBtn class="select" :options="fuelList" :value="additionalParams.fuel" label="Выбрать" :payload="true" @change="selectFuel($event)" />
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pl-0 pl-sm-4" :order="$vuetify.breakpoint.xs ? 7 : ''">
        <label class="select-label">Количество дверей</label>
        <SelectBtn class="select" :options="amountDoorsList" :value="additionalParams.amountDoors" label="Выбрать" :payload="true" @change="selectAmountDoors($event)" />
      </v-col>
      <v-col class="fuel-consumption-wrapper col-12 col-sm-6 pr-0 pr-sm-4" :order="$vuetify.breakpoint.xs ? 4 : ''">
        <label class="select-label">Расход топлива</label>
        <div class="consumption-fields-group">
          <input class="fuel-consumption-field" type="number" :value="additionalParams.consumptionCity" placeholder="Город" @input="changeConsumptionCity" />
          <input class="fuel-consumption-field ml-0 ml-sm-4" type="number" :value="additionalParams.consumptionRoad" placeholder="Трасса" @input="changeConsumptionRoad" />
          <input class="fuel-consumption-field ml-0 ml-sm-4" type="number" :value="additionalParams.consumptionCommon" placeholder="Смешанный" @input="changeConsumptionCommon" />
        </div>
      </v-col>
      <v-col class="select-wrapper col-12 col-sm-6 pl-0 pl-sm-4" :order="$vuetify.breakpoint.xs ? 8 : ''">
        <label class="select-label">Цвет</label>
        <div class="color-wrapper">
          <SelectBtn class="select" :options="colorsList" :value="additionalParams.color" label="Выбрать" :payload="true" @change="selectColor($event)" />
          <CheckBox class="check-box" :value="additionalParams.isMetallic" label="Металлик" @change="setColorMetallic" :isLabel="true" />
        </div>
      </v-col>
    </div>
    <div :class="`additional-option-wrapper ${mobileAdditionalShow === 1 ? 'is-mobile' : ''}`">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Состояние машины</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(1)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Состояние машины
      </button>
      <CheckBoxGroup
        class="check-box is-states"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="additionalParams.carStates"
        :collection="carStatesList"
        @change="selectCarStates"
        :isFixAlign="true"
        :amountEmptyStirng="carStatesList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 2 ? 'is-mobile' : ''}`">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Дополнительные опции</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(2)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Дополнительные опции
      </button>
      <CheckBoxGroup
        class="check-box is-comfort"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="additionalParams.carComfort"
        :collection="carComfortList"
        @change="selectCarComfort"
        :isFixAlign="true"
        :amountEmptyStirng="carComfortList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 3 ? 'is-mobile' : ''}`">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Мультимедиа</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(3)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Мультимедиа
      </button>
      <CheckBoxGroup
        class="check-box is-multimedia"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="additionalParams.carMultimedia"
        :collection="carMultimediaList"
        @change="selectCarMultimedia"
        :isFixAlign="true"
        :amountEmptyStirng="carMultimediaList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 4 ? 'is-mobile' : ''}`">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Безопасность</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(4)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Безопасность
      </button>
      <CheckBoxGroup
        class="check-box is-security"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="additionalParams.carSecurity"
        :collection="carSecurityList"
        @change="selectCarSecurity"
        :isFixAlign="true"
        :amountEmptyStirng="carSecurityList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 5 ? 'is-mobile' : ''}`">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Другое</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(5)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Другое
      </button>
      <CheckBoxGroup
        class="check-box"
        :value="additionalParams.carAnother"
        v-show="$vuetify.breakpoint.smAndUp"
        :collection="carAnotherList"
        @change="selectCarAnother"
        :isFixAlign="true"
        :amountEmptyStirng="carAnotherList.length"
      />
    </div>
  </div>
</template>

<script>
import SelectBtn from '~/components/base/SelectBtn.vue';
import AutocompleteBtn from '~/components/base/AutocompleteBtn.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
// mixins
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';

export default {
  name: 'CreateAdsAdditional',
  mixins: [transformArrayForSelectBtn],
  data() {
    return {
      transmissionList: [],
      engineCapacityList: [],
      driveUnitsList: [],
      enginePowersUnitList: [{ text: 'л/с', value: 1 }],
      fuelList: [],
      amountDoorsList: [],
      colorsList: [],
      carStatesList: [],
      carComfortList: [],
      carMultimediaList: [],
      carSecurityList: [],
      carAnotherList: [],
      additionalParams: {
        transmission: '',
        engineCapacity: '',
        driveUnits: '',
        enginePowersUnit: 1,
        enginePowerValue: null,
        fuel: '',
        amountDoors: null,
        color: '',
        isMetallic: false,
        carStates: [],
        carComfort: [],
        carMultimedia: [],
        carSecurity: [],
        carAnother: [],
        consumptionCity: null,
        consumptionRoad: null,
        consumptionCommon: null,
      },
      mobileAdditionalShow: null,
    };
  },
  watch: {
    additionalParams: {
      deep: true,
      handler() {
        this.$emit('change', this.additionalParams);
      },
    },
  },
  methods: {
    selectAdditional(additionalShowId) {
      if (additionalShowId === this.mobileAdditionalShow) {
        this.mobileAdditionalShow = null;
        document.body.classList.remove('hide-scroll-bar');
        return;
      }

      this.mobileAdditionalShow = additionalShowId;
      document.body.classList.add('hide-scroll-bar');
    },

    selecTtransmission({ text, value }) {
      this.additionalParams.transmission = value;
    },

    selectEngineCapacity({ text, value }) {
      this.additionalParams.engineCapacity = value;
    },

    selectDriveUnits({ text, value }) {
      this.additionalParams.driveUnits = value;
    },

    selectEnginePowersUnit({ text, value }) {
      this.additionalParams.enginePowersUnit = value;
    },

    selectFuel({ text, value }) {
      this.additionalParams.fuel = value;
    },

    selectColor({ text, value }) {
      this.additionalParams.color = value;
    },

    selectAmountDoors({ text, value }) {
      this.additionalParams.amountDoors = value;
    },

    setColorMetallic(selectStatus) {
      this.additionalParams.isMetallic = selectStatus;
    },

    selectCarStates(optionList) {
      this.additionalParams.carStates = optionList;
    },

    selectCarComfort(optionList) {
      this.additionalParams.carComfort = optionList;
    },

    selectCarMultimedia(optionList) {
      this.additionalParams.carMultimedia = optionList;
    },

    selectCarSecurity(optionList) {
      this.additionalParams.carSecurity = optionList;
    },

    selectCarAnother(optionList) {
      this.additionalParams.carAnother = optionList;
    },

    changeConsumptionCity(e) {
      this.additionalParams.consumptionCity = e.target.valueAsNumber;
    },

    changeConsumptionRoad(e) {
      this.additionalParams.consumptionRoad = e.target.valueAsNumber;
    },

    changeConsumptionCommon(e) {
      this.additionalParams.consumptionCommon = e.target.valueAsNumber;
    },

    changeEnginePower(e) {
      this.additionalParams.enginePowerValue = e.target.valueAsNumber;
    },
  },
  async fetch() {
    await (async () => {
      try {
        const { transmissions, fuels, driveUnits, doors, engineCapacities, colors } = (await this.$services.createAds.getAdditionalCharacteristic()).data;

        this.transmissionList = this.transformArrayForSelectBtn(transmissions);
        this.engineCapacityList = this.transformArrayForSelectBtn(engineCapacities);
        this.driveUnitsList = this.transformArrayForSelectBtn(driveUnits);
        this.fuelList = this.transformArrayForSelectBtn(fuels);
        this.amountDoorsList = this.transformArrayForSelectBtn(doors);
        this.colorsList = this.transformArrayForSelectBtn(colors);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { carCondition } = (await this.$services.createAds.getAdditionalCarCondition()).data;

        this.carStatesList = this.transformArrayForSelectBtn(carCondition);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { carComfort } = (await this.$services.createAds.getAdditionalComfortCondition()).data;

        this.carComfortList = this.transformArrayForSelectBtn(carComfort);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { carMultimedia } = (await this.$services.createAds.getAdditionalMultimediaCondition()).data;

        this.carMultimediaList = this.transformArrayForSelectBtn(carMultimedia);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { carSecurity } = (await this.$services.createAds.getAdditionalSecurityCondition()).data;

        this.carSecurityList = this.transformArrayForSelectBtn(carSecurity);
      } catch (error) {
        console.error(error);
      }
    })();

    await (async () => {
      try {
        const { carAnother } = (await this.$services.createAds.getAdditionalAnotherCondition()).data;

        this.carAnotherList = this.transformArrayForSelectBtn(carAnother);
      } catch (error) {
        console.error(error);
      }
    })();
  },
  components: {
    SelectBtn,
    CheckBox,
    CheckBoxGroup,
    AutocompleteBtn,
  },
};
</script>

<style lang="scss" scoped>
.additional {
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

  .additional-general {
    margin-top: 14px;

    & .select-wrapper:first-child {
      margin-top: 0;
    }

    .select-wrapper {
      margin-top: 12px;

      .select-label {
        display: inline-block;
        color: #4a4d5c;
      }

      .select {
        margin-top: 6px;
      }

      .powers-wrapper {
        display: flex;
        margin-top: 6px;

        .powers-field {
          @extend .input-text-classic;
          margin-right: 16px;
          max-width: 363px;
          width: 100%;

          &::placeholder {
            font-weight: normal;
          }
        }

        .select {
          margin-top: 0;
          flex: 1;
        }
      }

      .color-wrapper {
        display: flex;
        align-items: center;
        margin-top: 6px;

        .select {
          max-width: 348px;
          width: 100%;
          margin-right: 16px;
          margin-top: 0;
        }
      }
    }

    .fuel-consumption-wrapper {
      margin-top: 12px;

      .select-label {
        display: inline-block;
        color: #4a4d5c;
      }

      .consumption-fields-group {
        display: flex;
        margin-top: 6px;

        .fuel-consumption-field {
          @extend .input-text-classic;
          width: 100%;

          &::placeholder {
            font-weight: normal;
          }
        }
      }
    }
  }

  .additional-option-wrapper {
    margin-top: 20px;

    .additional-option-title {
      @extend .title-l;
    }

    .additional-mobile-btn {
      display: none;
      align-items: center;
      justify-content: left;

      padding: 11px 0;
      width: 100%;
      box-shadow: 0 -1px 0 0 rgba(34, 35, 41, 0.1);

      .additional-btn-icon {
        display: none;
        margin: 0 9px;
        width: 7px;
        height: 12px;
        transform: rotate(180deg);
      }
    }

    .check-box {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 12px 10px;

      max-height: 135px;

      & ::v-deep .check-box-item {
        margin-top: 0;
        max-width: calc((100% - 36px) / 4);
        width: 100%;

        .v-label {
          display: inline-block;

          width: 100%;

          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
      }
    }

    .is-comfort {
      max-height: 560px;
    }

    .is-multimedia {
      max-height: 1300px;
    }

    .is-security {
      max-height: 360px;
    }
  }

  .is-mobile {
    position: fixed;

    top: 0;
    left: 0;
    padding: 11px 16px;
    margin-top: 0;

    width: 100%;
    height: 100vh;

    background: #ffffff;
    overflow-y: auto;
  }
}

@include sm {
  .additional .additional-option-wrapper {
    .check-box {
      ::v-deep .check-box-item {
        max-width: calc((100% - 24px) / 3);
      }
    }

    .is-comfort {
      max-height: 750px;
    }

    .is-multimedia {
      max-height: 1700px;
    }

    .is-security {
      max-height: 500px;
    }
  }
}

@include xs {
  .additional {
    .additional-general .fuel-consumption-wrapper .consumption-fields-group {
      flex-wrap: wrap;
      gap: 16px 0;
    }

    .additional-option-wrapper {
      .additional-option-title {
        display: none;
      }

      .additional-mobile-btn {
        display: flex;
      }

      .check-box {
        display: none;
      }

      .check-box {
        ::v-deep .check-box-item {
          max-width: calc((100% - 12px) / 2);
        }
      }

      .is-states {
        max-height: 250px;
      }

      .is-comfort {
        max-height: 1100px;
      }

      .is-multimedia {
        max-height: 2500px;
      }

      .is-security {
        max-height: 750px;
      }
    }

    .is-mobile {
      .additional-mobile-btn {
        padding: 2px 0 11px 0;
        box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

        .additional-btn-icon {
          display: block;
        }
      }

      .check-box {
        display: flex !important;
        flex-wrap: nowrap;
        margin-top: 24px;

        ::v-deep .check-box-item {
          max-width: max-content;
        }
      }
    }
  }
}
</style>
