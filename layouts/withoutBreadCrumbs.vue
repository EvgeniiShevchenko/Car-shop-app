<template>
  <v-app class="layout">
    <Header :width="width" @login="login" />
    <BodyLayout>
      <nuxt class="content" :style="`max-width: ${width}`" />
    </BodyLayout>
    <Footer :width="width" />
    <transition name="fade">
      <div class="popup-wrapper" v-if="popUpShow">
        <PopUpSuccess class="popup-inner-wrapper" v-if="!error" :title="message" />
        <v-alert class="popup-inner-wrapper" v-else type="error"> {{ message }} </v-alert>
      </div>
    </transition>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
// components
import MainHeaderMenu from '~/components/modules/header/MainHeaderMenu.vue';
import PopUpSuccess from '~/components/base/PopUpSuccess.vue';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
// layouts
import BodyLayout from '~/components/layouts/BodyLayout.vue';
// mixins
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  name: 'WithoutBreadCrumbs',
  mixins: [getAuthToken],
  data() {
    return {
      collection: [],
      popUpShow: false,
      message: '',
      error: false,
      authPopUpName: '',
    };
  },
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
  methods: {
    login() {
      this.setActiveModalWindowName('login');
    },

    showPopUp({ error, message, timer = 1000 }) {
      this.message = message;
      this.popUpShow = true;
      this.error = error;

      setTimeout(() => {
        this.popUpShow = false;
        this.error = false;
      }, timer);
    },

    ...mapActions({ setLogin: 'setLogin', setActiveModalWindowName: 'setActiveModalWindowName' }),
  },
  mounted() {
    if (this.getAuthToken()) {
      this.$axios.setToken(this.getAuthToken(), 'Bearer');
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }

    this.$root.$on('show-popup', this.showPopUp);
  },
  components: {
    MainHeaderMenu,
    PopUpSuccess,
    BodyLayout,
    Footer,
    Header,
  },
};
</script>

<style lang="scss">
.layout {
  position: relative;
  @include init-font;
  display: flex;
  flex-direction: column;

  height: 100vh;

  .popup-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;

    .popup-inner-wrapper {
      width: max-content;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
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
      margin-top: 15px !important;
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
