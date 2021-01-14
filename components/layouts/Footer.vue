<template>
  <footer class="footer">
    <div class="container footer-inner-wrapper" :style="`max-width: ${width}`">
      <div class="row no-gutters footer-general">
        <div class="social cols mb-6 mb-sm-0 col-xs-12 col-sm-6 col-md-8 mb-md-4">
          <nuxt-link class="footer-logo" to="#">
            <img class="footer-logo-icon" src="~assets/images/logo-footer.png" alt="Logo" />
          </nuxt-link>
          <p class="social-title">Следить за новостями AutoSill в соцсетях:</p>
          <ul class="social-list mb-0">
            <li class="social-list-item">
              <a class="social-item-ref is-facebook" href="#"></a>
            </li>
            <li class="social-list-item">
              <a class="social-item-ref is-instagram" href="#"></a>
            </li>
            <li class="social-list-item">
              <a class="social-item-ref is-telegram" href="#"></a>
            </li>
            <li class="social-list-item">
              <a class="social-item-ref is-twitter" href="#"></a>
            </li>
            <li class="social-list-item">
              <a class="social-item-ref is-you-tube" href="#"></a>
            </li>
          </ul>
        </div>
        <section class="about cols mb-6 mb-sm-0 col-xs-12 col-sm-6 col-md-4 mb-md-4">
          <h3 class="about-title">О сервисе</h3>
          <ul class="about-list">
            <li class="about-list-item">
              <nuxt-link class="about-item-link" to="#">Как работает сервис</nuxt-link>
            </li>
            <li class="about-list-item">
              <nuxt-link class="about-item-link" to="#">Пмощь по сайту</nuxt-link>
            </li>
            <li class="about-list-item">
              <nuxt-link class="about-item-link" to="#">Политика конфиденциальности</nuxt-link>
            </li>
          </ul>
        </section>
        <section class="seller cols col-xs-12 mb-6 mb-sm-0 col-sm-6 col-md-8">
          <h3 class="seller-title">Продавцу</h3>
          <ul class="seller-list">
            <li class="seller-list-item">
              <nuxt-link class="seller-item-link" to="#">Как работает сервис</nuxt-link>
            </li>
            <li class="seller-list-item">
              <nuxt-link class="seller-item-link" to="#">Реклама на сайте</nuxt-link>
            </li>
            <li class="seller-list-item">
              <nuxt-link class="seller-item-link" to="#">Техподдержка</nuxt-link>
            </li>
          </ul>
        </section>
        <section class="services cols col-xs-12 col-sm-6 col-md-4">
          <h3 class="services-title">Отдел по работе с клиентами</h3>
          <a class="services-contacts-email" href="tel: 093 333 33 33">093 333 33 33</a>
          <a class="services-contacts-phone" href="mailto: mail@gmail.com">mail@gmail.com</a>
          <p class="services-info">Все вопросы и пожелания вы можете отправить нам на почту или рассказать по телефону.</p>
        </section>
      </div>
      <div class="rights">
        <p class="rights-description">© 2016—{{ getCurentYear }}, autosill.ua</p>
      </div>
    </div>
  </footer>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Footer',
  props: {
    width: {
      type: String,
      default: '100%',
    },
  },
  computed: {
    getCurentYear() {
      return moment().format('YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: #f2f7fa;

  .footer-inner-wrapper {
    padding-top: 59px;
    padding-bottom: 22px;

    text-align: left;

    .footer-general {
      display: flex;
      padding-bottom: 39px;

      .social {
        max-width: 294px;

        .footer-logo {
          display: inline-block;
          margin-bottom: 32px;
        }

        .social-title {
          margin-bottom: 16px;

          font-size: 14px;
          line-height: 18px;
        }

        .social-list {
          display: flex;
          padding-left: 0;

          & li:first-child {
            margin-left: 0;
          }

          .social-list-item {
            margin-left: 16px;

            .social-item-ref {
              display: inline-block;

              background-image: url('~assets/images/sprites/social-footer-icons.png');

              &:hover {
                background-image: url('~assets/images/sprites/social-footer-icons-hover.png');
              }
            }

            .is-facebook {
              width: 32px;
              height: 32px;

              background-position: -10px -10px;
            }

            .is-instagram {
              @extend .is-facebook;

              background-position: -62px -10px;
            }

            .is-telegram {
              @extend .is-facebook;

              background-position: -10px -62px;
            }

            .is-twitter {
              @extend .is-facebook;

              background-position: -62px -62px;
            }

            .is-you-tube {
              @extend .is-facebook;

              background-position: -114px -10px;
            }
          }
        }
      }

      .about {
        margin-left: 137px;
        max-width: 208px;

        .about-title {
          margin-bottom: 20px;
          height: 44px;

          font-size: 20px;
          font-weight: 500;
          line-height: 22px;
          color: #4a4d5c;
        }

        .about-list {
          padding-left: 0;

          .about-list-item {
            margin-bottom: 12px;

            font-size: 14px;
            line-height: 18px;

            .about-item-link {
              color: #4a4d5c;
            }
          }
        }
      }

      .seller {
        margin-left: 32px;
        max-width: 169px;

        @extend .about;

        .seller-title {
          @extend .about-title;
        }

        .seller-list {
          @extend .about-list;

          .seller-list-item {
            @extend .about-list-item;

            .seller-item-link {
              color: #4a4d5c;
            }
          }
        }
      }

      .services {
        margin-left: 32px;
        max-width: 270px;

        @extend .about;

        .services-title {
          @extend .about-title;
          margin-bottom: 20px;
        }

        .services-contacts-phone {
          @extend .services-contacts-email;
          margin-bottom: 12px;
          color: #4a4d5c;
        }

        .services-contacts-email {
          display: block;
          margin-bottom: 12px;

          font-size: 14px;
          line-height: 18px;
          color: #4a4d5c;
        }

        .services-info {
          @extend .services-contacts-phone;
          margin-bottom: 0;
        }
      }
    }

    .rights {
      padding-top: 16px;
      border-top: 1px solid rgba(34, 35, 41, 0.1);
    }
  }
}
</style>
