<template>
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
            <button class="authorization-link" type="button" @click="$emit('login')">Авторизация</button>
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
</template>

<script>
import MainHeaderMenu from '@/components/modules/header/MainHeaderMenu';

export default {
  name: 'Header',
  components: { MainHeaderMenu },
  props: {
    width: {
      type: String,
      default: '100%',
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
