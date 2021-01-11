<template>
  <v-app class="layout">
    <Header :width="width" />
    <bread-crumbs :style="`max-width: ${width}`" />
    <main class="main container d-flex mt-3 pb-0" :style="`max-width: ${width}`">
      <div class="outer-wrap">
        <div class="d-flex content" :style="`max-width: ${width}`">
          <profile-navigation class="profile_nav" :userInfo="userInfo" />
          <nuxt class="content" :style="`max-width: ${width}`" />
        </div>
      </div>
    </main>
    <Footer :width="width" />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
// components
import MainHeaderMenu from '~/components/modules/header/MainHeaderMenu.vue';
import BreadCrumbs from '~/components/base/BreadCrumbs.vue';
import ProfileNavigation from '@/components/modules/personal/ProfileNavigation';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
// mixins
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  name: 'Personal',
  data() {
    return {
      userInfo: {},
    };
  },
  mixins: [getAuthToken],
  computed: {
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
    Header,
    Footer,
  },
  methods: {
    async getUserInfo() {
      try {
        this.userInfo = (await this.$services.user.getUserData(this.getAuthToken())).data.user;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },

    ...mapActions({ setLogin: 'setLogin' }),
  },
  mounted() {
    this.getUserInfo();

    if (this.getAuthToken()) {
      this.$axios.setToken(this.getAuthToken(), 'Bearer');
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }
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
