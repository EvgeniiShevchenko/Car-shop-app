<template>
  <section class="comunity row no-gutters">
    <h3 class="comunity-title">Сообщество AutoSill</h3>
    <div class="ytube-wrapper col-md-8 pr-md-3 col-xl-8 pr-xl-3">
      <img class="ytube-player" src="~/assets/images/ytube-frame.png" alt="" />
    </div>
    <ul class="social-list row no-gutters col-md-4 pl-md-3 col-xl-4 pl-xl-3">
      <li class="social-item col-md-12" :key="index" v-for="(item, index) in socialList">
        <a :class="`social-item-ref is-${item.key}`" v-if="item.type === 'reference'" href="#">
          <span class="content-wrapper">
            <svg class="social-item-icon">
              <use :xlink:href="require('~/assets/images/sprites/main.svg') + `#${item.key}`"></use>
            </svg>
            {{ item.name }}
          </span>
        </a>
        <a :class="`social-item-ref is-${item.key}`" v-else href="#">
          <span class="content-wrapper">
            <svg class="social-item-icon">
              <use :xlink:href="require('~/assets/images/sprites/main.svg') + `#${item.key}`"></use>
            </svg>
            {{ item.name }}
            <svg class="social-item-mark">
              <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
            </svg>
          </span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'MainComunity',
  data() {
    return {
      socialList: [
        { name: 'Facebook AutoSill', type: 'reference', key: 'facebook', color: '', icon: '' },
        { name: 'Telegram AutoSill', type: 'reference', key: 'telegram', color: '', icon: '' },
        { name: 'Twitter AutoSill', type: 'reference', key: 'twitter', color: '', icon: '' },
        { name: 'Instagram AutoSill', type: 'reference', key: 'instagram', color: '', icon: '' },
        { name: 'Поиск авто • Чат-бот', type: 'bot', key: 'facebook-bot', color: '', icon: '' },
        { name: 'Поиск авто • Чат-бот', type: 'bot', key: 'telegram-bot', color: '', icon: '' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.comunity {
  margin-bottom: 72px;

  .comunity-title {
    margin-bottom: 42px;
    width: 100%;

    font-size: 32px;
    font-weight: 500;
    line-height: 35px;
  }

  .ytube-wrapper {
    .ytube-player {
      width: 100%;
      height: 100%;
    }
  }

  .social-list {
    & li:first-child {
      margin-top: 0;
    }

    .social-item {
      margin-top: 24px;

      .social-item-ref {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 44px;

        .content-wrapper {
          position: relative;
          display: flex;
          align-items: center;

          max-width: 160px;
          width: 100%;

          padding-left: 25px;

          .social-item-icon {
            position: absolute;
            left: 0;
          }
        }
      }

      .is-facebook {
        background: #4267b2;
        border-radius: 2px;

        font-size: 15px;
        font-weight: 500;
        color: #ffffff;

        .social-item-icon {
          margin-right: 10px;
          width: 9px;
          height: 16px;
        }
      }

      .is-telegram {
        @extend .is-facebook;

        background: #24a0dd;

        .social-item-icon {
          @extend .social-item-icon;
          width: 14px;
          height: 11px;
        }
      }

      .is-twitter {
        @extend .is-telegram;
        background: #1da1f2;
        border-radius: 2px;

        .social-item-icon {
          width: 15px;
          height: 13px;
        }
      }

      .is-instagram {
        @extend .is-telegram;
        background: linear-gradient(325.87deg, rgba(213, 54, 112, 0) 29.56%, rgba(166, 70, 143, 0.359375) 57.26%, #5163c5 94.42%),
          radial-gradient(91.22% 109.09% at 21.2% 121.59%, #ffe071 0%, #fdbf48 26.56%, #df5f43 59.9%, #dc347e 100%);
        border-radius: 2px;

        .social-item-icon {
          width: 16px;
          height: 16px;
        }
      }

      .is-facebook-bot {
        @extend .is-telegram;
        background: #ffffff;
        border: 1px solid #4a4d5c;
        color: #4a4d5c;

        .content-wrapper {
          padding-right: 15px;
          max-width: 205px;

          .social-item-icon {
            width: 15px;
            height: 16px;
          }

          .social-item-mark {
            position: absolute;
            right: 0;

            width: 12px;
            height: 8px;

            transform: rotate(-90deg);
            fill: #4a4d5c;
          }
        }
      }

      .is-telegram-bot {
        @extend .is-facebook-bot;

        .content-wrapper .social-item-icon {
          width: 13px;
          height: 11px;
        }
      }
    }
  }
}

@include sm {
  .comunity {
    .social-list {
      display: grid;

      margin-top: 20px;

      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      .social-item {
        margin-top: 0;
      }
    }
  }
}

@include xs {
  .comunity {
    .comunity-title {
      font-size: 30px;
      line-height: 33px;
    }

    margin-bottom: 25px;

    .social-list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
