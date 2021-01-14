<template>
  <div class="additional">
    <div class="additional-general row no-gutters">
      <v-col class="select-wrapper col-12 mt-0 pr-0 col-sm-6 pr-sm-4" :order="$vuetify.breakpoint.xs ? 1 : ''">
        <label class="select-label">Коробка передач</label>
        <SelectBtn class="select" :options="transmissionList" :value="additionalParams.transmission" label="Выбрать" :payload="true" @change="selecTtransmission($event)" />
      </v-col>
      <v-col class="select-wrapper col-12 mt-3 mt-sm-0 col-sm-6 pl-0 pl-sm-4" :order="$vuetify.breakpoint.xs ? 5 : ''">
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
    <CarAdditionalStats
      :carType="transportType"
      :carStates="additionalParams.carStates"
      :carComfort="additionalParams.carComfort"
      :carMultimedia="additionalParams.carMultimedia"
      :carSecurity="additionalParams.carSecurity"
      :carAnother="additionalParams.carAnother"
      @change-states="selectCarStates"
      @change-comfort="selectCarComfort"
      @change-multimedia="selectCarMultimedia"
      @change-security="selectCarSecurity"
      @change-another="selectCarAnother"
    />
  </div>
</template>

<script>
import SelectBtn from '~/components/base/SelectBtn.vue';
import AutocompleteBtn from '~/components/base/AutocompleteBtn.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
import CarAdditionalStats from '~/components/base/CarAdditionalStats.vue';
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
        const { transmissions, fuels, driveUnits, doors, engineCapacities, colors } = (await this.$services.createAds.getAdditionalCharacteristic(this.transportType)).data;

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
  },
  props: {
    transportType: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    SelectBtn,
    CheckBox,
    CheckBoxGroup,
    AutocompleteBtn,
    CarAdditionalStats,
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
}

@include xs {
  .additional {
    .additional-general .fuel-consumption-wrapper .consumption-fields-group {
      flex-wrap: wrap;
      gap: 16px 0;
    }
  }
}
</style>
