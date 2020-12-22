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
      <v-layout class="contacts">
        <v-flex xl8 lg8 md8 class="contacts-info">
          <h2>Возникли вопросы?</h2>
          <p>Если вы хотите больше узнать о том, как происходит проверка автомобиля через сервис AutoSill - напишите нам или перезвоните.</p>
          <div>
            <v-list class="d-flex contacts-info">
              <v-list-item>
                <v-list-item-avatar height="76px" width="76px" min-width="76px">
                  <img src="~assets/images/user_placeholder.png" alt="avatar" />
                </v-list-item-avatar>
                <div class="profile">
                  <span>Менеджер по проверкам</span>
                  <span>Бовтяр Олег</span>
                  <span>+38 050 526 25 25</span>
                </div>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar height="76px" width="76px" min-width="76px">
                  <img src="~assets/images/user_placeholder.png" alt="avatar" />
                </v-list-item-avatar>
                <div class="profile">
                  <span>Менеджер по проверкам</span>
                  <span>Калиниченко Иван</span>
                  <span>+38 050 526 25 25</span>
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
              height="36px"
              :rules="[(v) => !!v || 'Это поле является обязательным', (v) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(v) || 'Телефон должен содержать только цыфры']"
              required
            >
            </v-text-field>
            <span> Время для звонка </span>
            <v-select v-model="contacts.time" color="#4CAD33" :items="timePeriods" item-value="value" height="36" item-text="title" outlined dense> </v-select>
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
import CatalogCardsPreview from '@/components/base/CatalogCardsPreview';
import SquareBanner from '@/components/modules/banners/SquareBanner';

export default {
  name: 'CheckAuto',
  components: { CatalogCardsPreview, SquareBanner },
  data() {
    return {
      checkInfo: {},
      isSucceeded: null,
      contacts: {
        phone: '',
        time: 'с 9:00 до 12:00',
      },
      timePeriods: ['с 9:00 до 12:00', 'с 12:00 до 14:00'],
    };
  },
  mounted() {
    this.getCheckInfo();
  },
  methods: {
    async getCheckInfo() {
      try {
        this.checkInfo = (await this.$services.ads.getCheckByAuto(this.$route.params.id)).data.data
      } catch (error) {
        console.log(error);
      }
    },
    send() {
      if (!this.$refs.form.validate()) return;
      console.log('send');
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .outer-wrap {
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
          color: #ffffff;
          letter-spacing: 0;
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
