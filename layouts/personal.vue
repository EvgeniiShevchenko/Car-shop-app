<template>
  <v-app class="layout">
    <header class="header">
      <div class="container header-inner-wrapper" :style="`max-width: ${width}`">
        <nuxt-link class="header-logo" to="/">
          <img class="header-logo-icon" src="~assets/images/logo-header.png" alt="Logo" />
        </nuxt-link>
        <nav class="navigations-bar" v-if="$vuetify.breakpoint.mdAndUp">
          <nuxt-link class="navigations-link" to="/catalog">Б/у автомобили</nuxt-link>
          <nuxt-link class="navigations-link" to="/catalog">Новые автомобили</nuxt-link>
          <nuxt-link class="navigations-link" to="/news">Новости</nuxt-link>
        </nav>
        <div class="general-wrapper">
          <div class="personality">
            <svg class="user-icon">
              <use xlink:href="~assets/images/sprites/main.svg#icon-user" />
            </svg>
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <nuxt-link class="authorization-link" to="/login">Авторизация</nuxt-link>
              <div class="personal-cabinet-wrapper">
                <nuxt-link class="personal-cabinet-link" to="#">Личный кабинет</nuxt-link>
                <ul class="personal-cabinet-list">
                  <li class="cabinet-list-item">
                    <nuxt-link class="cabinet-item-link" to="#">Основная информация</nuxt-link>
                  </li>
                  <li class="cabinet-list-item">
                    <nuxt-link class="cabinet-item-link" to="#">Мои объявления</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="authorization-alerts" v-if="$vuetify.breakpoint.smAndDown">
              <svg class="alerts-letter-icons">
                <use xlink:href="~assets/images/sprites/main.svg#icon-later" />
              </svg>
              <svg class="alerts-bell-icons">
                <use xlink:href="~assets/images/sprites/main.svg#icon-bell" />
              </svg>
            </div>
          </div>
          <MainHeaderMenu v-if="$vuetify.breakpoint.smAndDown" />
        </div>
      </div>
    </header>
    <bread-crumbs v-if="collection.length && $vuetify.breakpoint.mdAndUp" :collection="collection" :style="`max-width: ${width}`" />
    <main class="main container d-flex mt-3 pb-0" :style="`max-width: ${width}`">
      <div class="outer-wrap">
        <div class="d-flex content" :style="`max-width: ${width}`">
          <profile-navigation class="profile_nav" :userInfo="userInfo" />
          <nuxt class="content" :style="`max-width: ${width}`" />
        </div>
      </div>
    </main>
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
  </v-app>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
// components
import MainHeaderMenu from '~/components/modules/header/MainHeaderMenu.vue';
import pages from '../entities/pages';
import BreadCrumbs from '~/components/base/BreadCrumbs.vue';
import ProfileNavigation from '@/components/modules/personal/ProfileNavigation';
// mixins
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  name: 'Personal',
  data() {
    return {
      pages: pages,
      collection: [],
      userInfo: {},
    };
  },
  mixins: [getAuthToken],
  mounted() {
    this.getUserInfo();
    this.getRouteHistory();
  },
  computed: {
    getCurentYear() {
      return moment().format('YYYY');
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100%';
        case 'sm':
          return '100%';
        case 'md':
          return '1192px';
        case 'lg':
          return '1192px';
        case 'xl':
          return '1192px';
      }
    },
  },
  components: {
    BreadCrumbs,
    MainHeaderMenu,
    ProfileNavigation,
  },
  methods: {
    getRouteHistory() {
      const { path } = this.$route;
      const breadCrumbs = [];
      const pathArray = path.split('/').filter((path) => !!path);
      pathArray.forEach((item) => {
        let path, name;
        if (item === 'catalog' || item === 'auto') {
          let status = JSON.parse(localStorage.getItem('filterParamsName')).status;
          path = `/catalog?status=${this.getStatus(status)}`;
          name = status ? status : 'Все автомобили';
        } else {
          path = `/${item}`;
          name = this.pages[item] ? this.pages[item] : item;
        }
        breadCrumbs.push({ path, name });
      });
      this.collection = breadCrumbs;
    },
    getStatus(status) {
      switch (status) {
        case 'Б/у автомобили':
          return 1;
        case 'Новые автомобили':
          return 2;
        case 'Под пригон автомобили':
          return 3;
        default:
          return 0;
      }
    },
    async getUserInfo() {
      try {
        this.userInfo = (await this.$services.user.getUserData()).data.user;
      } catch (error) {
        console.log(error);
      }
    },

    ...mapActions({ setLogin: 'setLogin' }),
  },
  mounted() {
    if (this.getAuthToken()) {
      this.$axios.setToken(this.getAuthToken(), 'Bearer');
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }
  },
  watch: {
    $route() {
      this.getRouteHistory();
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  .outer-wrap {
    width: 100%;
  }
  .profile_nav {
    margin-bottom: 70px;
  }
  @include init-font;
  display: flex;
  flex-direction: column;

  height: 100vh;
  @include desktop {
    .profile_nav {
      display: none;
    }
    .content {
      padding: 0 !important;
    }
    .outer-wrap {
      width: 100%;
    }
  }

  .header {
    background: #f2f7fa;

    .header-inner-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-top: 14px;
      padding-bottom: 14px;

      background: #f2f7fa;

      .header-logo {
        width: 139px;
        height: 32px;

        .header-logo-icon {
          height: 100%;
          width: 100%;
        }
      }

      .navigations-bar {
        & a:first-child {
          margin-left: 0;
        }

        .navigations-link {
          margin-left: 32px;
          color: #222329;
        }
      }

      .general-wrapper {
        display: flex;

        .personality {
          display: flex;
          align-items: center;

          .user-icon {
            width: 20px;
            height: 20px;
          }

          .authorization-link {
            margin-left: 8px;
            color: #222329;
          }

          .personal-cabinet-wrapper {
            display: none;
          }

          .authorization-alerts {
            display: flex;
            align-items: center;

            .alerts-letter-icons {
              margin-right: 10px;

              width: 20px;
              height: 16px;
            }

            .alerts-bell-icons {
              width: 24px;
              height: 24px;
            }
          }
        }
      }
    }
  }

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
}

@include widescreen {
  .layout .footer .footer-inner-wrapper .footer-general {
    .social {
      max-width: initial;
    }

    .about {
      margin-left: 0;
      max-width: initial;
    }

    .seller {
      @extend .about;
    }

    .services {
      @extend .about;
    }
  }
}

@include sm {
  .layout {
    .content {
      padding: 0 32px;
    }

    .header .container {
      padding: 14px 32px;
    }

    .footer .container {
      padding: 0 32px;
      padding-top: 15px;
    }

    .header .header-inner-wrapper .personality {
      margin-right: 10px;

      .user-icon {
        margin-right: 10px;
      }
    }
  }
}

@include xs {
  .layout {
    .content {
      padding: 0 16px;
      margin-top: 0 !important;
    }

    .header .container {
      padding: 14px 16px;

      .general-wrapper .personality {
        margin-right: 10px;
      }
    }

    .footer .container {
      padding: 0 16px;
      padding-top: 15px;
    }
  }
}
</style>
