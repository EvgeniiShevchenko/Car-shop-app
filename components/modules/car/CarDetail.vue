<template>
  <div class="car-detail row no-gutters">
    <div class="car-detail-check-wrapper col-md-6 pr-md-1 pr-lg-4">
      <section class="car-detail-check">
        <h3 class="check-title">
          Проверка по реестрам МВД
          <span class="title-icon-wrapper">
            <svg class="title-icon">
              <use xlink:href="~assets/images/sprites/global.svg#info-default" />
            </svg>
          </span>
        </h3>
        <div class="check-mark-wrapper">
          <p class="state-number"><span class="country-code">UA</span>{{ collection.characteristics.number_car }}</p>
          <p class="vin-code" v-if="collection.characteristics.vin_code_verified">
            <svg class="vin-code-icon">
              <use xlink:href="~assets/images/sprites/global.svg#check-inside" />
            </svg>
            Проверенный VIN-код
          </p>
          <p class="vin-number" v-if="collection.characteristics.vin_code_verified">
            <span class="vin-icon-wrapper">
              <svg class="vin-number-icon">
                <use xlink:href="~assets/images/sprites/global.svg#check-inside" />
              </svg>
            </span>
            {{ collection.characteristics.vin_code }}
          </p>
        </div>
        <div class="check-option mt-2">
          <p class="check-option-name">Марка, модель, год</p>
          <p class="check-option-value">{{ collection.name }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Двигатель</p>
          <p class="check-option-value">{{ !!collection.engine_capacity ? `${collection.engine_capacity}л, ` : '' }}{{ collection.fuel }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Топливо</p>
          <p class="check-option-value">{{ collection.fuel }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Цвет</p>
          <p class="check-option-value is-flex"><span class="option-value-color"></span>{{ collection.characteristics.color.name }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Последняя операция</p>
          <p class="check-option-value">{{ collection.characteristics.last_operation | convertDateToFormatDDMMYYYY }} ({{ collection.characteristics.last_operation | beforeNowInPastFromDate }})</p>
        </div>
        <div class="check-option mb-0">
          <p class="check-option-name">В розыске</p>
          <p class="check-option-value">{{ !!collection.characteristics.is_search ? 'В розыске' : 'Нет' }}</p>
        </div>
        <h3 class="check-title mt-4 mt-sm-5">
          Проверка по реестрам МВД
          <span class="title-icon-wrapper">
            <svg class="title-icon">
              <use xlink:href="~assets/images/sprites/global.svg#info-default" />
            </svg>
          </span>
        </h3>
        <div class="check-option mt-3 mt-sm-4">
          <p class="check-option-name">Пробег проверен</p>
          <div class="mileage">
            <p class="check-option-value">{{ collection.mileage }} км (1 год, 10 мес. назад)</p>
            <p class="mileage-info">последний зафиксированный от 24.06.2019 источник фиксации - Архивные данные с официального аукциона в США: Copart</p>
          </div>
        </div>
        <div class="check-option is-border-default">
          <p class="check-option-name">Пробег от продавца</p>
          <p class="check-option-value">{{ collection.mileage }} км</p>
        </div>
      </section>
      <CarAbout v-if="$vuetify.breakpoint.mdAndUp" :description="collection.description" />
    </div>
    <div class="car-stats-wrapper col-md-6 pl-md-1 pl-lg-4">
      <section class="car-stats">
        <h3 class="check-title">Характеристики</h3>
        <div class="check-option mt-4 mt-sm-7">
          <p class="check-option-name">Коробка передач</p>
          <p class="check-option-value">{{ collection.transmission }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Топливо</p>
          <p class="check-option-value">{{ collection.fuel }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Расход топлива</p>
          <ul class="consumption-list">
            <li class="consumption-item">
              Трасса<span class="consumption-item-value">{{ collection.characteristics.consumption_trail / 100 }}</span>
            </li>
            <li class="consumption-item">
              Город<span class="consumption-item-value">{{ collection.characteristics.consumption_city / 100 }}</span>
            </li>
            <li class="consumption-item">
              Смешанный<span class="consumption-item-value">{{ collection.characteristics.consumption_mixed / 100 }}</span>
            </li>
          </ul>
        </div>
        <div class="check-option">
          <p class="check-option-name">Объем двигателя</p>
          <p class="check-option-value">{{ !!collection.engine_capacity ? collection.engine_capacity : '?' }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Мощность двигателя</p>
          <p class="check-option-value">{{ !!collection.characteristics.engine_power ? `${collection.characteristics.engine_power} л.c` : '?' }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Привод</p>
          <p class="check-option-value">{{ !!collection.characteristics.drive_unit ? collection.characteristics.drive_unit : '?' }}</p>
        </div>
        <div class="check-option">
          <p class="check-option-name">Количество дверей</p>
          <p class="check-option-value">{{ !!collection.characteristics.door ? collection.characteristics.door : '?' }}</p>
        </div>
        <div class="check-option is-border-default">
          <p class="check-option-name">Цвет</p>
          <p class="check-option-value"><span class="option-value-color"></span></p>
        </div>
      </section>
      <div class="options-wrapper">
        <CarComplectationList :collection="collection.options.car_security" title="Безопасность" />
        <CarComplectationList :collection="collection.options.car_multimedia" title="Мультимедиа" />
        <CarComplectationList :collection="collection.options.car_comfort" title="Комфорт" />
        <CarComplectationList :collection="collection.options.car_another" title="Другое" />
      </div>
    </div>
    <CarAbout v-if="$vuetify.breakpoint.smAndDown" :description="collection.description" />
  </div>
</template>

<script>
import CarComplectationList from '~/components/modules/car/CarComplectationList.vue';
import CarAbout from '~/components/modules/car/CarAbout.vue';

export default {
  name: 'AutoDetail',
  props: {
    collection: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  components: {
    CarComplectationList,
    CarAbout,
  },
};
</script>

<style lang="scss" scoped>
.car-detail {
  .car-detail-check-wrapper {
    .car-detail-check {
      padding: 24px;

      border-radius: 4px;
      border: 1px solid #51a9f2;

      .check-title {
        display: flex;

        font-size: 20px;
        font-weight: 500;
        line-height: 22px;
        color: #222329;

        .title-icon-wrapper {
          padding-top: 2px;
          line-height: 0;

          .title-icon {
            margin-left: 10px;

            width: 21px;
            height: 20px;
          }
        }
      }

      .check-mark-wrapper {
        display: flex;
        flex-wrap: wrap;

        margin-top: 18px;

        .state-number {
          display: flex;
          align-items: center;
          justify-content: center;

          padding-right: 8px;
          margin: 0 8px 8px 0;

          height: 24px;

          border: 1px solid #d6e1e7;
          font-size: 13px;
          line-height: 16px;
          color: #4a4d5c;

          .country-code {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0 4px;
            margin-right: 8px;

            height: 100%;

            background: #d6e1e7;
          }
        }

        .vin-code {
          @extend .state-number;

          padding: 0 6px 0 7.5px;
          margin: 0 8px 8px 0;

          border-radius: 2px 0px 0px 2px;
          box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
          background: #51a9f2;

          color: #ffffff;

          .vin-code-icon {
            margin-right: 8px;

            width: 15px;
            height: 16px;
          }
        }

        .vin-number {
          @extend .state-number;
          padding-right: 8px;

          border: 1px solid #51a9f2;

          .vin-icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;

            padding: 0 5.5px;
            margin-right: 8px;

            height: 100%;
            background: #51a9f2;

            .vin-number-icon {
              width: 15px;
              height: 16px;
            }
          }
        }
      }

      .check-option {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-bottom: 11px;
        margin-bottom: 13px;

        box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

        .check-option-name {
          font-size: 14px;
          line-height: 17px;
          color: #4a4d5c;
        }

        .check-option-value {
          @extend .check-option-name;

          .option-value-color {
            display: block;
            margin-right: 8px;

            width: 24px;
            height: 24px;

            border-radius: 2px;
            background: #4a4d5c;
          }
        }

        .is-flex {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mileage {
          .check-option-value {
            text-align: right;
          }

          .mileage-info {
            margin-top: 4px;
            max-width: 280px;

            font-size: 13px;
            line-height: 16px;
            color: #70848e;
            text-align: right;
          }
        }

        .consumption-list {
          display: flex;

          & li:first-child {
            margin-left: 0;
          }

          .consumption-item {
            display: flex;
            flex-direction: column;

            margin-left: 20px;

            font-size: 13px;
            line-height: 16px;
            color: #70848e;

            .consumption-item-value {
              margin-top: 2px;
              color: #222329;
            }
          }
        }
      }

      .is-border-default {
        box-shadow: none;
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }
    }
  }

  .car-stats-wrapper {
    @extend .car-detail-check-wrapper;

    .car-stats {
      @extend .car-detail-check;
      border: none;
      background: #f2f7fa;
    }

    .options-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 33px;

      padding: 24px;
      margin-top: 32px;

      background: #f2f7fa;
      border-radius: 4px;
    }
  }
}

@include xs {
  .car-detail {
    .car-detail-check-wrapper .car-detail-check {
      padding: 8px;

      .check-title {
        font-size: 16px;
        line-height: 18px;
      }

      .check-option {
        flex-wrap: wrap;
        padding-bottom: 6px;
        margin-bottom: 7px;

        .check-option-name {
          width: 100%;
          color: #8fa5b0;
        }

        .check-option-value {
          margin-top: 2px;
          color: #4a4d5c;
        }

        .is-flex {
          justify-content: flex-start;
        }

        .mileage {
          .check-option-value {
            text-align: left;
          }

          .mileage-info {
            text-align: left;
          }
        }
      }
    }

    .car-description {
      padding: 8px;
      margin-top: 16px;
    }

    .car-stats-wrapper {
      margin-top: 16px;

      .options-wrapper {
        margin-top: 16px;
        padding: 8px;

        gap: 16px;
      }
    }
  }
}
</style>
