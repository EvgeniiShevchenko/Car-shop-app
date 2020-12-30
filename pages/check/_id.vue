<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1 class="mt-3">Проверка автомобиля</h1>
      <div class="d-flex auto_info">
        <div class="auto_info-car">
          <div class="tags d-flex">
            <div>Виды проверок:</div>
            <a v-for="check in checkInfo.type_check" :key="check.id" href="#">
              <span>{{ check.name }}</span>
            </a>
          </div>
          <catalog-cards-preview v-if="checkInfo.product" :collection="checkInfo.product" :extends_view="true" :isMobile="$vuetify.breakpoint.xs" class="catalog-item" />
        </div>
        <square-banner v-if="!$vuetify.breakpoint.smAndDown" class="square_banner" />
      </div>
      <div class="checks">
        <div class="checks-current" v-for="(check, i) in checkInfo.check" :key="check.id">
          <div class="d-flex checks-current-title">
            <h2>{{ check.name }}</h2>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="#DADADA" size="20" dark v-bind="attrs" v-on="on"> mdi-alert-circle-outline </v-icon>
              </template>
              <span v-html="check.description"></span>
            </v-tooltip>
          </div>
          <table>
            <tbody>
              <tr v-if="check.packages[0].name">
                <td class="check_name" v-for="rowName in check.packages" :key="rowName.id">{{ rowName.name }}</td>
                <td>Перечень услуг</td>
              </tr>
              <tr>
                <td class="download" v-for="rowName in check.packages" :key="rowName.id">
                  <div>
                    <a :href="rowName.report"
                      ><span>{{ $vuetify.breakpoint.smAndDown ? 'Скачать' : 'Скачать пример отчета' }}</span></a
                    >
                    <span><v-icon size="16" color="#000000">mdi-download</v-icon></span>
                  </div>
                </td>
                <td>PDF пример отчета</td>
              </tr>
              <tr v-for="service in check.services" :key="service.name">
                <td v-for="(pack, index) in service.package.filter((pack) => pack.type === 'checkbox')" :key="pack.service_price">
                  <v-checkbox color="#4CAD33" :ripple="false" hide-details class="check-box" @change="addService(pack, i, index)" :label="`${pack.service_price} грн`"> </v-checkbox>
                </td>
                <td v-for="(pack, index) in service.package.filter((pack) => pack.type === 'check' && pack.status === 1)" :key="pack.service_id + index">
                  <v-icon class="status_icon" size="22" color="#4CAD33">mdi-check</v-icon>
                </td>
                <td v-for="(pack, index) in service.package.filter((pack) => pack.type === 'check' && pack.status === 0)" :key="pack.service_price + index">
                  <v-icon class="status_icon" size="22" color="#F05156">mdi-close</v-icon>
                </td>
                <td>{{ service.name }}</td>
              </tr>
              <tr>
                <td class="price" v-for="rowName in check.packages" :key="rowName.id">
                  <div v-if="rowName.type === 'check'">{{ rowName.price }} грн</div>
                  <div v-else>{{ rowName.total }} грн</div>
                </td>
                <td>Стоимость</td>
              </tr>
              <tr>
                <td class="order_check" v-for="rowName in check.packages" :key="rowName.id" @click="orderCheck(rowName, i, rowName.id)">
                  <div>{{ $vuetify.breakpoint.smAndDown ? 'Заказать' : 'Заказать проверку' }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <v-layout v-if="checkInfo.page" class="contacts">
        <v-flex xl8 lg8 md8 class="contacts-info">
          <h2>{{ checkInfo.page.name }}</h2>
          <p>{{ checkInfo.page.description }}</p>
          <div>
            <v-list class="d-flex contacts-info">
              <v-list-item v-for="manager in checkInfo.manager" :key="manager.id">
                <v-list-item-avatar height="76px" width="76px" min-width="76px">
                  <img v-if="manager.avatar" :src="manager.avatar" alt="avatar" />
                  <img v-else src="~assets/images/user_placeholder.png" alt="avatar" />
                </v-list-item-avatar>
                <div class="profile">
                  <span>{{ manager.status }}</span>
                  <span>{{ `${manager.last_name} ${manager.first_name}` }}</span>
                  <span>{{ manager.phone }}</span>
                </div>
              </v-list-item>
            </v-list>
          </div>
        </v-flex>
        <v-flex xl4 lg4 md4 class="contacts-form">
          <h2>Обратный звонок</h2>
          <v-form ref="form" lazy-validation>
            <span> Номер телефона </span><span class="required">*</span>
            <v-text-field
              v-model="contacts.phone"
              outlined
              dense
              placeholder="+38 050 333 22 11"
              height="36px"
              :rules="[(v) => !!v || 'Это поле является обязательным', (v) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(v) || 'Телефон должен содержать только цыфры']"
              required
            >
            </v-text-field>
            <span> Время для звонка </span>
            <v-select v-model="contacts.time" color="#4CAD33" :items="timePeriods" item-value="id" height="36" item-text="title" outlined dense> </v-select>
            <v-alert icon="mdi-checkbox-marked-circle-outline" v-if="isSucceeded" type="success"> Сообщение было отправленно администратору. </v-alert>
            <v-alert v-if="isSucceeded === false" type="error"> Сообщение не было отправленно, что-то пошло не так. </v-alert>
            <v-btn class="accept-green-btn send_call_btn" @click="send" depressed color="#1768AC" height="43">Заказать обратный звонок</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </main>
</template>

<script>
//Components
import CatalogCardsPreview from '@/components/base/CatalogCardsPreview';
import SquareBanner from '@/components/modules/banners/SquareBanner';
//Mixins
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  name: 'CheckAuto',
  components: { CatalogCardsPreview, SquareBanner },
  mixins: [getAuthToken],
  async asyncData({ params, $services }) {
    try {
      const checkInfo = (await $services.ads.getCheckByAuto(params.id)).data.data;
      checkInfo.check.map((check) => {
        check.packages.map((pack) => {
          if (pack.type === 'checkbox') {
            pack.services = [];
            pack.total = 0;
          }
          return pack;
        });
        return check;
      });
      return { checkInfo };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  data() {
    return {
      checkInfo: {},
      isSucceeded: null,
      contacts: {
        phone: '',
        time: 1,
      },
      timePeriods: [],
    };
  },
  mounted() {
    this.getPeriods();
  },
  methods: {
    async send() {
      if (!this.$refs.form.validate()) return;
      try {
        const payload = {
          time_rain_id: this.contacts.time,
          phone: this.contacts.phone,
        };
        await this.$services.user.orderCall(payload);
      } catch (e) {
        console.log(e);
      }
    },
    async getPeriods() {
      try {
        this.timePeriods = (await this.$services.user.getCallPeriods()).data.data.time_rain;
        this.timePeriods = this.timePeriods.map((period) => {
          return {
            title: `с ${period.time_from} до ${period.time_to}`,
            id: period.id,
          };
        });
      } catch (e) {
        console.log(e);
      }
    },
    async orderCheck(obj, index, id) {
      let payload = {
        product_id: this.checkInfo.product.id,
        package_id: id,
      };
      if (obj.type === 'checkbox' && obj.services && obj.services.length)
        payload.service_id = obj.services.map((item) => {
          return item.id;
        });
      if (obj.type === 'checkbox' && (!obj.services || !obj.services.length)) return;
      console.log(payload, 'payload');
      try {
        await this.$services.user.orderCheckAuto(payload, this.getAuthToken());
      } catch (error) {
        console.log(error);
      }
    },
    addService(obj, i, index) {
      let isAdd = this.checkInfo.check[i].packages[index].services.find((item) => item.id === obj.service_id);
      if (isAdd) {
        const itemIndex = this.checkInfo.check[i].packages[index].services.findIndex((item) => item.id === obj.service_id);
        this.checkInfo.check[i].packages[index].services.splice(itemIndex, 1);
      } else {
        this.checkInfo.check[i].packages[index].services.push({ id: obj.service_id, price: obj.service_price });
      }
      this.checkInfo.check[i].packages[index].total = this.checkInfo.check[i].packages[index].services.reduce((sum, current) => {
        return sum + current.price;
      }, 0);
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .outer-wrap {
    .checks {
      &-current {
        h2 {
          margin: 72px 0 32px 0;
          @include sm {
            font-size: 18px;
            margin: 27px 0 19px 0;
          }
        }
        &-title {
          align-items: baseline;
          i {
            margin-left: 12px;
            @include sm {
              margin-left: 6px;
            }
          }
        }
        table {
          border-collapse: collapse;
          width: 100%;
          td {
            border: 1px solid #d6e1e7;
            padding: 8px;
            height: 44px;
            color: #4a4d5c;
            font-size: 15px;
            line-height: 110%;
            width: 25%;
            @include sm {
              font-size: 13px;
            }
            &:last-child {
              width: 100%;
            }
            .check-box {
              width: 90px;
              margin: 0 auto;
              @include sm {
                width: 75px;
                ::v-deep .v-input--selection-controls__input {
                  margin-right: 4px;
                }
              }
              ::v-deep label {
                color: #222329 !important;
                line-height: 110%;
                @include sm {
                  font-size: 13px;
                }
              }
              ::v-deep .v-input--selection-controls__input {
                width: 22px;
                height: 22px;
              }
              ::v-deep i {
                width: 22px;
                height: 22px;
              }
            }
            .status_icon {
              display: block;
              width: fit-content;
              margin: 0 auto;
            }
          }
          .price {
            text-align: center;
            color: #4a4d5c;
            font-weight: 500;
            font-size: 18px;
            line-height: 110%;
            width: 25% !important;
            @include sm {
              font-size: 12px;
            }
          }
          .order_check {
            background-color: #4cad33;
            font-size: 15px;
            font-weight: 500;
            line-height: 110%;
            color: #ffffff;
            cursor: pointer;
            width: 25% !important;
            div {
              margin: 0 auto;
              width: fit-content;
            }
          }
          .download {
            background-color: #f2f7fa;
            cursor: pointer;
            div {
              display: flex;
              font-weight: 500;
              font-size: 15px;
              line-height: 110%;
              color: #4a4d5c;
              justify-content: center;
              @include sm {
                font-size: 13px;
              }
              span:last-child {
                margin-left: 10px;
                @include sm {
                  margin-left: 4px;
                }
              }
            }
          }
          .check_name {
            text-align: center;
            font-weight: 500;
            font-size: 18px;
            line-height: 110%;
            color: #4a4d5c;
            @include sm {
              font-size: 12px;
            }
          }
        }
      }
    }
    .auto_info {
      align-items: flex-end;
      margin-top: 32px;
      .tags {
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 35px;
        @include xs {
          display: none !important;
        }
        div {
          font-weight: 500;
          font-size: 18px;
          line-height: 110%;
          color: #4a4d5c;
          margin-right: 20px;
        }
        a {
          border-bottom: 0.7px dashed #1768ac;
          margin-right: 20px;
          span {
            font-size: 14px;
            line-height: 125%;
            color: #1768ac;
          }
        }
      }
      .catalog-item {
        width: 100%;
        ::v-deep .preview-wrapper {
          max-width: 268px;
          @include xs {
            max-width: 100%;
          }
        }
      }
      .square_banner {
        margin-left: 32px;
      }
      &-car {
        width: 100%;
      }
    }
    .contacts {
      flex-direction: row;
      align-items: center;
      height: fit-content;
      margin: 50px 0 72px 0;
      @include sm {
        flex-direction: column;
        & > div {
          width: 100%;
        }
      }
      &-info {
        background-color: #f2f7fa;
        padding: 32px 132px 32px 32px;
        height: fit-content;
        @include sm {
          padding: 16px 12px;
        }
        h2 {
          margin-bottom: 16px;
          color: #222329;
          @include xs {
            font-size: 18px;
          }
        }
        p {
          font-size: 15px;
          line-height: 110%;
          color: #222329;
          margin-bottom: 24px;
          @include xs {
            font-size: 14px;
            line-height: 125%;
          }
        }
        .v-list {
          padding: 0;
          @include xs {
            flex-direction: column;
            .v-avatar {
              width: 68px !important;
              height: 68px !important;
            }
          }
          &-item {
            padding: 0;
            .profile {
              span {
                display: block;
              }
              span:first-child {
                font-size: 13px;
                line-height: 120%;
                color: #70848e;
              }
              span:nth-child(2) {
                font-weight: 500;
                font-size: 20px;
                line-height: 110%;
                color: #222329;
                margin-top: 4px;
                @include xs {
                  font-size: 16px;
                }
              }
              span:nth-child(3) {
                font-weight: 500;
                font-size: 15px;
                line-height: 110%;
                color: #222329;
                margin-top: 16px;
                @include xs {
                  font-size: 14px;
                  line-height: 125%;
                  margin-top: 12px;
                }
              }
            }
          }
        }
      }
      &-form {
        background-color: #d5ebfd;
        padding: 32px;
        border-radius: 4px;
        @include sm {
          margin-top: 24px;
          padding: 16px 12px;
        }
        h2 {
          margin-bottom: 20px;
        }
        .v-form {
          .v-input {
            margin-top: 6px;
            ::v-deep .v-input__slot {
              background-color: #ffffff;
            }
          }
        }
        .send_call_btn {
          letter-spacing: 0;
          ::v-deep span {
            color: #ffffff;
          }
        }
      }
    }
  }
  @include xs {
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
}
</style>
