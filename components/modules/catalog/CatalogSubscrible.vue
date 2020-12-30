<template>
  <AcordionSingle :class="`acordion-wrapper is-${className}`" title="Подписка на поиск" :isOpen="0">
    <template slot="content">
      <p class="general-title">Найдено:</p>
      <ul class="general-list">
        <li class="general-item" :key="index" v-for="(item, index) in searchResultsList">
          <p class="item-label">{{ item.text }}</p>
          <p class="item-value">{{ searchResult[index] }}</p>
        </li>
      </ul>
      <p class="general-info">Получайте свежие предложения в удобный мессенджер или по электронной почте:</p>
      <p class="mobile-label" v-if="className === 'mobile'">Подписаться на поиск:</p>
      <ul class="subscribe-social-list">
        <li class="subscribe-social-item" @click="$emit('social-subscrible', 'telegram')">
          <a class="social-item-ref is-telegram" href="#" title="Подписаться на Messenger"></a>
        </li>
        <li class="subscribe-social-item" @click="$emit('social-subscrible', 'facebook')">
          <a class="social-item-ref is-facebook" href="#" title="Подписаться на Messenger"></a>
        </li>
        <li class="subscribe-social-item" @click="$emit('social-subscrible', 'viber')">
          <a class="social-item-ref is-viber" href="#" title="Подписаться на Messenger"></a>
        </li>
        <li class="subscribe-social-item" v-if="className === 'mobile'">
          <button class="email-subscrible-btn" type="button" @click="showEmailField">
            <svg class="subscrible-btn-icon">
              <use xlink:href="~assets/images/sprites/catalog.svg#later" />
            </svg>
          </button>
        </li>
      </ul>
      <form class="subscribe-form" method="GET" v-if="isShowEmail">
        <label class="subscribe-label" for="">Ваш email:</label>
        <input :class="`subscribe-field ${error.name ? 'is-error' : ''}`" v-model="email" type="email" autocomplete="on" placeholder="mail@mail.com" @focus="focusSubscribeField" />
        <p class="error-text" v-if="error.name">{{ error.message }}</p>
        <button class="subscribe-btn" type="button" @click="subscrible">Подписаться</button>
      </form>
    </template>
  </AcordionSingle>
</template>

<script>
import isEmail from 'validator/lib/isEmail';
// components
import AcordionSingle from '~/components/base/AcordionSingle.vue';

export default {
  name: 'CatalogSubscrible',
  data() {
    return {
      searchResultsList: [
        { text: 'Всего предложений', value: '2 533' },
        { text: 'За час', value: '+533' },
        { text: 'За день', value: '+1 433' },
      ],
      email: '',
      isShowEmail: this.className !== 'mobile',
      error: {
        name: '',
        massage: '',
      },
    };
  },
  methods: {
    showEmailField() {
      this.isShowEmail = !this.isShowEmail;
    },

    subscrible() {
      if (!this.email) {
        this.error = { name: 'empty', message: 'Поле пустое' };

        return;
      }

      if (!isEmail(this.email)) {
        this.email = '';
        this.error = { name: 'email', message: 'Неверный формат поля' };

        return;
      }

      this.resetError();

      this.$emit('subscrible', this.email);
      this.email = '';
    },

    focusSubscribeField() {
      this.resetError();
    },

    resetError() {
      this.error = {
        name: '',
        massage: '',
      };
    },
  },
  props: {
    searchResult: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: 'default',
    },
  },
  components: {
    AcordionSingle,
  },
};
</script>

<style lang="scss" scoped>
.acordion-wrapper {
  .general-title {
    margin-top: 12px;
    margin-bottom: 8px;

    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
  }

  .general-list {
    & li:first-child {
      padding-top: 0;
    }

    & li:last-child {
      box-shadow: none;
    }

    .general-item {
      display: flex;
      justify-content: space-between;
      padding: 11px 0;

      box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);

      .item-label {
        margin-bottom: 0;
      }

      .item-value {
        margin-bottom: 0;
      }
    }
  }

  .general-info {
    margin-bottom: 0;
    font-size: 13px;
    line-height: 120%;
    color: #222329;
  }

  .mobile-label {
    @extend .general-info;
    margin-top: 12px;
  }

  .subscribe-social-list {
    display: flex;

    margin-top: 12px;

    .subscribe-social-item {
      margin-right: 16px;

      .social-item-ref {
        display: block;

        width: 32px;
        height: 32px;

        background: url('~assets/images/sprites/social-footer-icons-hover.png') no-repeat;
      }

      .email-subscrible-btn {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 32px;
        height: 32px;

        border-radius: 50%;
        background: #79ca64;

        &:hover {
          background: #2ca00d;
        }

        .subscrible-btn-icon {
          width: 22px;
          height: 15px;
        }
      }

      .is-telegram {
        background-position: -114px -10px;
      }

      .is-facebook {
        background-position: -114px -62px;
      }

      .is-viber {
        background-position: -10px -114px;
      }
    }
  }

  .subscribe-form {
    margin-top: 12px;

    .subscribe-label {
      font-size: 15px;
      line-height: 17px;
    }

    .subscribe-field {
      margin-top: 6px;
      padding-left: 8px;
      outline: none;

      width: 100%;
      height: 36px;

      border-radius: 2px;
      border: 1px solid #8fa5b0;

      &::placeholder {
        color: #8fa5b0;
      }

      &:focus {
        border: 1px solid #51a9f2;
      }
    }

    .error-text {
      margin-top: 4px;
      margin-bottom: 0;

      font-size: 13px;
      line-height: 16px;
      color: #f05156;
    }

    .is-error {
      border: 1px solid #f05156;
    }

    .subscribe-btn {
      margin-top: 12px;

      height: 36px;
      width: 100%;

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

.is-mobile {
  ::v-deep .v-expansion-panel {
    padding: 12px 0;

    .v-expansion-panel-header {
      display: none;
    }

    .v-expansion-panel-content__wrap {
      padding: 0 12px 0 12px;

      .general-title {
        display: none;
      }

      .general-list {
        & li:first-child {
          margin-top: 0;
        }

        & li:last-child {
          padding-bottom: 12px;
          box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);
        }

        .general-item {
          padding: 0;
          margin-top: 8px;
          box-shadow: none;
        }
      }

      .general-info {
        display: none;
      }

      .subscribe-form {
        margin-top: 12px;
      }
    }
  }
}
</style>
