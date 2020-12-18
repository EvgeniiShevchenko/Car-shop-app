<template>
  <div class="mr-5">
    <v-card>
      <v-navigation-drawer permanent width="268px">
        <v-list class="d-flex header_nav py-4 pr-5">
          <v-list-item class="pl-5 pr-0">
            <v-list-item-avatar height="36px" width="36px" min-width="36px">
              <img v-if="userInfo.image" :src="userInfo.image" alt="avatar" />
              <img v-else src="~assets/images/user_placeholder.png" alt="avatar" />
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item class="pa-0 ml-2">
            <v-list-item-content class="pa-0">
              <v-list-item-title class="title pb-1"> {{ userInfo.last_name }} {{ userInfo.first_name }} </v-list-item-title>
              <v-list-item-subtitle class="pb-1">ID аккаунта: {{ userInfo.unique_id }} </v-list-item-subtitle>
              <v-list-item-subtitle class="user_rate"> Рейтинг: 25 из 100 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-btn class="send_btn mb-0 mx-auto px-6"> <v-icon left> mdi-close </v-icon> Подать объявление</v-btn>

        <v-list nav dense class="px-0 py-3 nav_list">
          <v-list-item v-for="item of navItems" :key="item.title" link :class="isActive(item.link) ? 'active_link' : ''">
            <a :href="item.link"
              ><v-list-item-title>{{ item.title }}</v-list-item-title></a
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import pages from '../../../entities/pages';

export default {
  name: 'ProfileNavigation',
  props: {
    userInfo: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
      pages: pages,
    },
  },
  data() {
    return {
      navItems: [
        {
          title: 'Общая информация',
          link: '/',
        },
        {
          title: 'Мои объявления',
          link: '/personal/advertising',
        },
        {
          title: 'Личный счет',
          link: '/',
        },
        {
          title: 'Проверки авто',
          link: '/',
        },
        {
          title: 'Заказы и отчетность',
          link: '/',
        },
        {
          title: 'Подписки',
          link: '/',
        },
        {
          title: 'Избранное',
          link: '/personal/favorite',
        },
        {
          title: 'Сообщения',
          link: '/',
        },
        {
          title: 'Настройки аккаунта',
          link: '/personal/settings',
        },
        {
          title: 'Выход',
          link: '/',
        },
      ],
    };
  },
  methods: {
    isActive(link) {
      return this.$route.path === link;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  .send_btn {
    display: block;
    i {
      transform: rotate(-45deg);
    }
  }
  .active_link {
    background-color: #51a9f2;
    a {
      .v-list-item__title {
        color: #ffffff !important;
      }
    }
  }
  .header_nav {
    .v-list-item__title {
      font-weight: 500;
      font-size: 14px !important;
      line-height: 130%;
      color: #4a4d5c;
    }
    .v-list-item__subtitle {
      font-weight: normal;
      font-size: 13px;
      line-height: 120%;
    }
    .user_rate {
      color: #1768ac;
    }
    .v-list-item:first-child {
      max-width: 56px;
    }
    .v-avatar {
      margin: 0;
    }
  }
  .nav_list {
    .v-list-item {
      padding: 0 20px;
      div {
        font-weight: normal;
        font-size: 14px;
        line-height: 125%;
        color: #4a4d5c;
      }
    }
  }
}
</style>
