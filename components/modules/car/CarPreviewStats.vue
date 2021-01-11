<template>
  <div class="auto-general">
    <div :class="`general-price-manager is-mobile ${$vuetify.breakpoint.smAndDown ? 'is-mobile-show' : ''}`">
      <div class="price-manager-wrapper">
        <h3 class="price">{{ collection.currency_default }} {{ collection.price }}</h3>
        <p class="price-other">
          {{ collection.price_another[0].currency.symbol }} {{ collection.price_another[0].price }} • {{ collection.price_another[1].currency.symbol }} {{ collection.price_another[1].price }}
        </p>
        <p class="price-currency">USD {{ collection.setting_price.USD_buy | cropFloatNumber }} грн • EUR {{ collection.setting_price.EUR_buy | cropFloatNumber }} грн</p>
      </div>
      <div class="price-manager-bar">
        <n-link class="bar-scan-btn" to="/monitoring" role="button">
          Мониторинг цен
          <svg class="scan-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </n-link>
        <n-link class="bar-check-btn" :to="`/check/${$route.params.id}`" role="button">
          Проверка авто
          <svg class="check-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </n-link>
      </div>
    </div>
    <ul class="general-list">
      <li class="general-list-item" :key="index" v-for="(item, index) in generalStatsList">
        <svg :class="`general-item-icon is-${item.icon}`" v-if="!isEmpty(item.icon)">
          <use :xlink:href="require('~/assets/images/sprites/global.svg') + `#${item.icon}`"></use>
        </svg>
        {{ item.text }}
      </li>
    </ul>
    <ul class="general-tags-list">
      <li class="tags-list-item" :key="index" v-for="(item, index) in collection.labels">
        <n-link class="tags-item-link" to="/catalog">{{ item }}</n-link>
      </li>
    </ul>
    <h3 class="general-description">
      {{ collection.mileage }} км пробег • {{ collection.transmission }} • {{ !!collection.engine_capacity ? `${collection.engine_capacity} л,` : '' }} {{ collection.fuel }}
    </h3>
    <ul class="general-menu-list">
      <li class="general-menu-item" :key="index" v-for="(item, index) in generalMenuList">
        <button class="menu-item-btn" type="button" v-if="item.icon !== 'social-share'" @click="item.actions">
          <svg :class="`menu-btn-icon is-${item.icon}`">
            <use :xlink:href="require('~/assets/images/sprites/global.svg') + `#${item.icon}`"></use>
          </svg>
          {{ item.text }}
        </button>
        <Tooltip v-else>
          <template slot="activator">
            <button class="menu-item-btn" type="button">
              <svg :class="`menu-btn-icon is-${item.icon}`">
                <use :xlink:href="require('~/assets/images/sprites/global.svg') + `#${item.icon}`"></use>
              </svg>
              {{ item.text }}
            </button>
          </template>
          <template slot="tooltipe">
            <h3 class="tooltip-title">Поделиться объявлением:</h3>
            <ul class="tooltip-content-list">
              <li class="tooltip-item" :key="index" v-for="(social, index) in socialNetworkList">
                <button :class="`tooltip-item-btn ${social.icon}`" type="button" @click="item.actions"></button>
              </li>
            </ul>
          </template>
        </Tooltip>
      </li>
    </ul>
    <div class="general-price-manager" v-if="$vuetify.breakpoint.mdAndUp">
      <div class="price-manager-wrapper">
        <h3 class="price">{{ collection.currency_default }} {{ collection.price }}</h3>
        <p class="price-other">
          {{ collection.price_another[0].currency.symbol }} {{ collection.price_another[0].price }} • {{ collection.price_another[1].currency.symbol }} {{ collection.price_another[1].price }}
        </p>
        <p class="price-currency">USD {{ collection.setting_price.USD_buy | cropFloatNumber }} грн • EUR {{ collection.setting_price.EUR_buy | cropFloatNumber }} грн</p>
      </div>
      <div class="price-manager-bar">
        <n-link class="bar-scan-btn" :to="`/monitoring/${$route.params.id}`" role="button">
          Мониторинг цен
          <svg class="scan-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </n-link>
        <n-link class="bar-check-btn" :to="`/check/${$route.params.id}`" role="button">
          Проверка авто
          <svg class="check-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </n-link>
      </div>
    </div>
    <div class="general-contact">
      <div class="contact-info">
        <div class="contact-preview-wrapper">
          <img class="contact-preview" src="~/assets/images/auto-shop-icon.png" alt="Preview image" />
        </div>
        <div class="contact-detail-wrapper">
          <ul class="contact-detail-list" v-if="$vuetify.breakpoint.mdAndUp">
            <li class="contact-detail-item" v-if="collection.user.email_verified_at.length">
              <svg class="contact-detail-icon">
                <use xlink:href="~assets/images/sprites/global.svg#check-round" />
              </svg>
              Верифицирован по телефону
            </li>
            <li class="contact-detail-item">
              <svg class="contact-detail-icon is-history-icon">
                <use xlink:href="~assets/images/sprites/global.svg#history-round" />
              </svg>
              На сервисе {{ collection.user.created_at | convertDateToFormatMM }} месяцев
            </li>
          </ul>
          <label class="contact-detail-role" for="">Продавец</label>
          <h3 class="contact-detail-name">{{ collection.user.first_name }}</h3>
        </div>
      </div>
      <ul class="contact-detail-list mt-5" v-if="$vuetify.breakpoint.smAndDown">
        <li class="contact-detail-item" v-if="collection.user.email_verified_at.length">
          <svg class="contact-detail-icon">
            <use xlink:href="~assets/images/sprites/global.svg#check-round" />
          </svg>
          Верифицирован по телефону
        </li>
        <li class="contact-detail-item">
          <svg class="contact-detail-icon is-history-icon">
            <use xlink:href="~assets/images/sprites/global.svg#history-round" />
          </svg>
          На сервисе {{ collection.user.created_at | convertDateToFormatMM }} месяцев
        </li>
      </ul>
      <div class="contact-stats">
        <a :class="`stats-phone-btn ${isPhoneNumberShow ? 'is-border-none' : ''}`" :href="`tel:${collection.user.phone}`">
          <svg class="phone-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#phone-call" />
          </svg>
          <span class="phone-btn-text" @click="showPhoneNumber">{{ isPhoneNumberShow ? `${collection.user.phone}` : 'Показать телефон' }}</span>
        </a>
        <button class="stats-location-btn" type="button" v-if="collection.city">
          <svg class="location-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#location-mark" />
          </svg>
          <span class="phone-btn-text">{{ collection.city }}</span>
        </button>
      </div>
      <div class="contact-btn-wrapper">
        <button class="contact-write-btn" type="button">
          <svg class="write-btn-icon">
            <use xlink:href="~/assets/images/sprites/catalog.svg#later" />
          </svg>
          Написать продавцу
        </button>
        <button class="contact-share-btn" type="button" @click="scrollTo">
          Предложить обмен
          <svg class="share-btn-icon">
            <use xlink:href="~/assets/images/sprites/global.svg#arrow-w-7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// mixins
import isEmpty from '~/mixins/isEmpty.js';
// components
import Tooltip from '~/components/base/Tooltip.vue';

export default {
  name: 'CarPreviewStats',
  mixins: [isEmpty],
  data() {
    return {
      isPhoneNumberShow: false,
      generalStatsList: [],
      generalMenuList: [
        { text: 'Сравнение', icon: 'libra', actions: this.addFavorites },
        { text: 'Торг', icon: 'auction', actions: this.addFavorites },
        { text: 'Поделиться', icon: 'social-share', actions: this.addFavorites },
        { text: 'Избранное', icon: 'favorite-star', actions: this.addFavorites },
      ],
      socialNetworkList: [{ icon: 'is-telegram' }, { icon: 'is-facebook-chat' }, { icon: 'is-viber' }, { icon: 'is-facebook' }],
    };
  },
  methods: {
    scrollTo() {
      const ScrollNode = document.querySelector('#nav_3');
      var top = ScrollNode.offsetTop;

      window.scrollTo(0, top);
    },

    addFavorites() {
      try {
        const { data } = this.$axios.$post(`http://localhost:8000/api/auth/one_car/wishlist/${this.collection.unique_id}`, { method: 'POST' });
      } catch (error) {
        console.error(error);
      }
    },

    showPhoneNumber() {
      this.isPhoneNumberShow = true;
    },
  },
  mounted() {
    console.log('mounted -> mounted', this.collection);
    this.similarList = [...Array(8).keys()].map((item) => this.collection.similar[0]);
    this.generalStatsList = [
      { text: `ID ${this.collection.unique_id}`, icon: '' },
      { text: this.$options.filters.convertDateToFormatDDMMYYYY(this.collection.start_at), icon: 'calendar' },
      { text: this.collection.count_view, icon: 'eye' },
      { text: this.collection.count_wishlist, icon: 'rating-star' },
      { text: this.collection.count_exhanges, icon: 'raise' },
    ];
  },
  props: {
    collection: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Tooltip,
  },
};
</script>

<style lang="scss" scoped>
.auto-general {
  .general-list {
    display: flex;
    align-items: center;

    & li:last-child {
      margin-left: 0;
    }

    .general-list-item {
      display: flex;
      align-items: center;

      margin-right: 29px;
      margin-bottom: 4px;

      font-size: 13px;
      line-height: 16px;
      color: #8fa5b0;

      .general-item-icon {
        margin-right: 5px;
      }

      .is-calendar {
        width: 12px;
        height: 14px;
      }

      .is-eye {
        width: 16px;
        height: 10px;
      }

      .is-rating-star {
        width: 14px;
        height: 14px;
      }

      .is-raise {
        width: 16px;
        height: 9px;
      }
    }
  }

  .general-tags-list {
    display: flex;
    flex-wrap: wrap;

    margin-top: 16px;

    .tags-list-item {
      margin-right: 8px;
      margin-bottom: 8px;

      .tags-item-link {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0 4px;

        height: 20px;

        background: #d5ebfd;
        border-radius: 2px;

        font-size: 13px;
        line-height: 16px;
        color: #4a4d5c;
      }
    }
  }

  .general-description {
    padding: 4px 16px;
    margin-top: 12px;

    width: fit-content;

    background: #f2f7fa;
    border-radius: 2px;

    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    color: #4a4d5c;
  }

  .general-menu-list {
    display: flex;
    flex-wrap: wrap;

    margin-top: 20px;

    & li:first-child .menu-item-btn {
      border-radius: 4px 0 0 4px;
    }

    & li:last-child .menu-item-btn {
      border-radius: 0 4px 4px 0;
    }

    .general-menu-item {
      position: relative;

      .menu-item-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0 16px;

        height: 36px;

        border: 1px solid #d6e1e7;
        font-size: 14px;
        line-height: 17px;

        &:hover {
          background: #f2f7fa;
        }

        .menu-btn-icon {
          margin-right: 8px;
        }

        .is-libra {
          width: 22px;
          height: 17px;
        }

        .is-auction {
          width: 18px;
          height: 18px;
        }

        .is-social-share {
          width: 16px;
          height: 18px;
        }

        .is-favorite-star {
          width: 18px;
          height: 17px;
        }
      }

      .tooltip-title {
        font-size: 14px;
        font-weight: normal;
        line-height: 17px;
        color: #222329;
      }

      .tooltip-content-list {
        display: flex;
        margin-top: 8px;
        line-height: 0;

        & li:first-child {
          margin-left: 0;
        }

        .tooltip-item {
          margin-left: 16px;

          .tooltip-item-btn {
            background-image: url('~assets/images/sprites/social-footer-icons-hover.png');
          }

          .is-telegram {
            width: 32px;
            height: 32px;

            background-position: -114px -10px;
          }

          .is-facebook-chat {
            @extend .is-telegram;

            background-position: -114px -62px;
          }

          .is-viber {
            @extend .is-telegram;

            background-position: -10px -114px;
          }

          .is-facebook {
            @extend .is-telegram;

            background-position: -10px -10px;
          }
        }
      }
    }
  }

  .general-price-manager {
    display: flex;
    justify-content: space-between;

    padding: 14px 20px 14px 16px;
    margin-top: 20px;

    border-radius: 4px;
    background: #f2f7fa;

    .price-manager-wrapper {
      .price {
        font-size: 32px;
        font-weight: 500;
        line-height: 35px;
        color: #4cad33;
      }

      .price-other {
        margin: 8px 0 0 0;

        font-size: 13px;
        line-height: 16px;
        color: #222329;
      }

      .price-currency {
        @extend .price-other;
        margin-top: 4px;
        color: #70848e;
      }
    }

    .price-manager-bar {
      display: flex;
      flex-direction: column;

      .bar-scan-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0 55px 0 64px;
        height: 36px;

        border-radius: 2px;
        background: #8fa5b0;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #ffffff;
        transition: background 1s ease;

        &:hover {
          background: #1768ac;
        }

        .scan-btn-icon {
          margin-left: 19px;

          width: 7px;
          height: 12px;

          fill: #ffffff;
        }
      }

      .bar-check-btn {
        @extend .bar-scan-btn;
        margin-top: 12px;

        .check-btn-icon {
          @extend .scan-btn-icon;

          width: 7px;
          height: 12px;

          fill: #ffffff;
        }
      }
    }
  }

  .is-mobile {
    display: none;
  }

  .is-mobile-show {
    display: flex;
  }

  .general-contact {
    margin-top: 20px;
    padding: 16px;

    border-radius: 4px;
    background: #f2f7fa;

    .contact-info {
      display: flex;

      .contact-preview-wrapper {
        width: 80px;
        height: 80px;

        border-radius: 8px;
        border: 1px solid #d6e1e7;

        .contact-preview {
          height: 100%;
          width: 100%;
        }
      }

      .contact-detail-wrapper {
        margin-left: 20px;

        .contact-detail-role {
          display: block;
          margin-top: 12px;

          font-size: 15px;
          line-height: 17px;
          color: #70848e;
        }

        .contact-detail-name {
          margin-top: 4px;

          font-size: 20px;
          font-weight: 500;
          line-height: 22px;
          color: #222329;
        }
      }
    }

    .contact-detail-list {
      display: flex;

      & li:first-child {
        margin-right: 23px;
      }

      .contact-detail-item {
        display: flex;
        align-items: center;

        font-size: 13px;
        line-height: 16px;
        color: #8fa5b0;

        .contact-detail-icon {
          margin-right: 3px;

          width: 16px;
          height: 15px;
        }

        .is-history-icon {
          margin-right: 3px;

          width: 15px;
          height: 15px;
        }
      }
    }

    .contact-stats {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .stats-phone-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        .phone-btn-icon {
          width: 16px;
          height: 16px;
        }

        .phone-btn-text {
          margin-left: 8px;
          border-bottom: 0.7px dashed #4a4d5c;
          font-size: 14px;
          line-height: 17px;
        }
      }

      .is-border-none .phone-btn-text {
        border: 0.7px dashed rgba(74, 77, 92, 0);
      }

      .stats-location-btn {
        @extend .stats-phone-btn;

        .location-btn-icon {
          width: 12px;
          height: 18px;
        }

        .phone-btn-text {
          border: none;
        }
      }
    }

    .contact-btn-wrapper {
      display: flex;
      margin-top: 16px;

      .contact-write-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0 20px;

        height: 36px;

        border-radius: 2px;
        background: #4cad33;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #ffffff;

        &:hover {
          background: #2ca00d;
        }

        .write-btn-icon {
          margin-right: 12px;

          width: 22px;
          height: 15px;
        }
      }

      .contact-share-btn {
        @extend .contact-write-btn;
        margin-left: 32px;
        background: #ffffff;
        border: 1px solid #4a4d5c;
        color: #4a4d5c;

        &:hover {
          background: #f2f7fa;
        }

        .share-btn-icon {
          margin-left: 18px;

          width: 7px;
          height: 12px;

          fill: #4a4d5c;
        }
      }
    }
  }
}

@include sm {
  .auto-general {
    display: flex;
    flex-direction: column;

    .general-list {
      flex-wrap: wrap;
      margin-top: 16px;

      .general-list-item {
        margin-right: 16px;
      }
    }

    .general-tags-list {
      margin-top: 12px;

      .tags-list-item {
        margin-right: 4px;
        margin-bottom: 4px;
      }
    }
  }
}

@include xs {
  .auto-general {
    .general-contact .contact-info .contact-preview-wrapper {
      width: 44px;
      height: 44px;
    }

    .general-price-manager {
      flex-wrap: wrap;
      margin-top: 15px;

      .price-manager-wrapper {
        width: 100%;

        .price {
          font-size: 22px;
          line-height: 24px;
        }
      }

      .price-manager-bar {
        margin-top: 12px;
        width: 100%;

        .bar-scan-btn {
          padding: 0;
          max-width: 264px;
          width: 100%;
        }
      }
    }

    .general-contact {
      .contact-info {
        .contact-detail-wrapper .contact-detail-role {
          margin-top: 0;
        }
      }

      .contact-btn-wrapper {
        flex-wrap: wrap;
        margin-top: 12px;

        .contact-write-btn {
          max-width: 256px;
          width: 100%;
        }

        .contact-share-btn {
          margin-top: 12px;
          margin-left: 0;
        }
      }

      .contact-stats {
        flex-wrap: wrap;

        .stats-phone-btn {
          justify-content: flex-start;
          margin-top: 8px;
          width: 100%;
        }

        .stats-location-btn {
          margin-top: 0;
        }
      }

      .contact-detail-list {
        flex-wrap: wrap;
        margin-top: 20px;

        & li:first-child {
          margin-bottom: 8px;
        }

        .contact-detail-item {
          width: 100%;
        }
      }
    }

    .general-menu-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
      margin-top: 16px;

      .general-menu-item .menu-item-btn {
        padding: 0;
        width: 100%;
      }
    }
  }

  .similar-ads {
    padding-bottom: 20px;

    ::v-deep .card-title {
      margin-bottom: 20px;

      font-size: 30px;
      line-height: 33px;
    }

    ::v-deep .card-list {
      gap: 16px;
      margin-bottom: 20px;

      .card-list-item {
        position: relative;
        flex-direction: column;
        max-height: max-content;
        height: 100%;

        .preview-wrapper {
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

        .general {
          position: initial;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;

          border-radius: 0 4px 4px 4px;
          border-left: 1px solid #b1c4cd;
          border-top: 0;

          .vin {
            left: auto;
            right: 8px;
          }
        }
      }
    }
  }
}
</style>
