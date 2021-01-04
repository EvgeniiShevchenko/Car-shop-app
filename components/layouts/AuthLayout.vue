<template>
  <div class="auth">
    <div class="auth-inner-wrapper">
      <form class="auth-form row no-guter" method="POST">
        <h1 class="auth-title" v-if="activeModalWindowName !== 'password'">
          {{ activeModalWindowName === 'login' ? 'Вход в личный кабинет' : activeModalWindowName === 'registration' ? 'Регистрация' : 'Восстановление пароля' }}
        </h1>
        <h1 class="auth-title" v-else>Изменение пароля</h1>
        <AuthLogin v-if="activeModalWindowName === 'login'" />
        <AuthPassword v-if="activeModalWindowName === 'password'" />
        <AuthRecovery v-if="activeModalWindowName === 'recovery'" />
        <AuthRegistration v-if="activeModalWindowName === 'registration'" />
        <div class="auth-footer mt-6" v-if="activeModalWindowName !== 'password'">
          <div v-if="activeModalWindowName !== 'recovery'">
            <p class="or">или</p>
            <button class="google-auth-btn mt-6" type="button" @click="AuthProvider('google')">
              <svg class="google-btn-icon">
                <use xlink:href="~assets/images/sprites/global.svg#google" />
              </svg>
              Войти через Google
            </button>
            <button class="facebook-auth-btn" type="button">
              <svg class="facebook-btn-icon">
                <use xlink:href="~assets/images/sprites/global.svg#facebook" />
              </svg>
              Войти через Facebook
            </button>
          </div>
          <div class="reqistration-links-wrapper mt-6" v-if="activeModalWindowName === 'login'">
            <div class="create-account">Нет аккаунта?<button class="create-account-link" type="button" @click="switchModals('registration')">Перейти к регистрации</button></div>
            <div class="recovery-password">Забыли пароль?<button class="recovery-password-link" type="button" @click="switchModals('recovery')">Восстановить пароль</button></div>
          </div>
          <div class="login-wrapper mt-6" v-if="activeModalWindowName === 'registration'">
            <div class="login">Уже зарегистрированы?<button class="login-link" type="button" @click="switchModals('login')">Перейти к логину</button></div>
          </div>
          <div class="back-login-wrapper mt-6" v-if="activeModalWindowName === 'recovery'">
            <div class="back-login">Вспомнили пароль?<button class="back-login-link" type="button" @click="switchModals('login')">Вернуться к логину</button></div>
          </div>
          <n-link class="agree-link" v-if="activeModalWindowName !== 'recovery'" to="agree">Соглашение об использовании сайта</n-link>
        </div>
        <button class="close-btn" type="button" @click="closeModal">
          <svg class="close-btn-icon">
            <use xlink:href="~assets/images/sprites/global.svg#close" />
          </svg>
        </button>
      </form>
    </div>
    <transition name="fade">
      <div class="popup-wrapper" v-if="popUpShow">
        <PopUpSuccess class="popup-inner-wrapper" :title="message" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
// mixins
import getAuthToken from '~/mixins/getAuthToken.js';
// components
import PopUpSuccess from '~/components/base/PopUpSuccess.vue';
import AuthLogin from '~/components/modules/auth/AuthLogin.vue';
import AuthPassword from '~/components/modules/auth/AuthPassword.vue';
import AuthRecovery from '~/components/modules/auth/AuthRecovery.vue';
import AuthRegistration from '~/components/modules/auth/AuthRegistration.vue';

export default {
  name: 'AuthLayout',
  mixins: [getAuthToken],
  data() {
    return {
      popUpShow: false,
      message: '',
    };
  },
  computed: {
    ...mapState({ activeModalWindowName: (state) => state.activeModalWindowName }),
  },
  methods: {
    switchModals(flag) {
      this.setActiveModalWindowName(flag);
    },

    closeModal() {
      this.resetActiveModalWindowName();
    },

    showPopUp(message) {
      this.message = message;
      this.popUpShow = true;

      setTimeout(() => {
        this.popUpShow = false;
      }, 1000);
    },

    AuthProvider(provider) {
      this.$auth
        .authenticate(provider)
        .then((response) => {
          this.SocialLogin(provider, response);
        })
        .catch((err) => {
          console.error({ err: err });
        });
    },

    SocialLogin(provider, response) {
      this.$axios
        .$post('auth/sociallogin/' + provider, response)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          this.$axios.setToken(response.data.token, 'Bearer');
          this.$router.push('/personal/settings');
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },

    ...mapActions({ setLogin: 'setLogin', setActiveModalWindowName: 'setActiveModalWindowName', resetActiveModalWindowName: 'resetActiveModalWindowName' }),
  },
  mounted() {
    this.$root.$on('show-popup', this.showPopUp);

    if (this.getAuthToken()) {
      this.$axios.setToken(this.getAuthToken(), 'Bearer');
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }
  },
  components: {
    PopUpSuccess,
    AuthLogin,
    AuthPassword,
    AuthRecovery,
    AuthRegistration,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  @include init-font;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  display: flex;
  z-index: 1000;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }
  .title-xxl {
    @include init-title(#4a4d5c, 24px, 500, 26px);
  }
  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }
  .title-l {
    @include init-title(#4a4d5c, 18px, 500, 20px);
  }
  .title-m {
    @include init-title(#70848e, 14px, 400, 17px);
  }

  .auth-inner-wrapper {
    display: flex;
    align-items: center;

    height: 100%;
    width: 100%;

    .auth-form {
      position: relative;

      padding: 44px 100px;
      margin: 0 auto;

      max-height: 100%;
      height: max-content;
      max-width: 568px;
      width: 100%;

      background: #ffffff;
      overflow-y: auto;

      .auth-title {
        @extend .title-xxl;
        text-align: center;
      }

      .content {
        width: 100%;
      }

      .auth-footer {
        width: 100%;

        .or {
          text-align: center;
          line-height: 17px;
        }

        .google-auth-btn {
          display: flex;
          justify-content: center;
          align-items: center;

          padding: 0 20px;

          height: 44px;
          width: 100%;

          border-radius: 2px;
          border: 1px solid #70848e;

          font-size: 15px;
          font-weight: 500;
          line-height: 15px;
          color: #70848e;

          &:hover {
            background: #f2f7fa;
          }

          .google-btn-icon {
            margin-right: 12px;

            width: 24px;
            height: 24px;
          }
        }

        .facebook-auth-btn {
          margin-top: 16px;
          @extend .google-auth-btn;

          .facebook-btn-icon {
            margin-right: 18px;

            width: 16px;
            height: 16px;
          }
        }

        .reqistration-links-wrapper {
          text-align: center;

          .create-account {
            line-height: 17px;
            color: #70848e;

            .create-account-link {
              margin-left: 9px;

              font-size: 15px;
              font-weight: 500;
              line-height: 17px;
              color: #1768ac;
            }
          }

          .recovery-password {
            margin-top: 12px;
            @extend .create-account;

            .recovery-password-link {
              @extend .create-account-link;
            }
          }
        }

        .login-wrapper {
          @extend .reqistration-links-wrapper;
          .login {
            @extend .create-account;

            .login-link {
              @extend .create-account-link;
            }
          }
        }

        .back-login-wrapper {
          @extend .reqistration-links-wrapper;

          .back-login {
            @extend .create-account;

            .back-login-link {
              @extend .create-account-link;
            }
          }
        }

        .agree-link {
          display: block;
          margin-top: 12px;
          width: 100%;

          text-align: center;
          font-size: 15px;
          font-weight: 500;
          line-height: 17px;
          color: #1768ac;
        }
      }

      .close-btn {
        position: absolute;
        padding: 5px;
        top: 16px;
        right: 16px;

        &:hover .close-btn-icon {
          fill: #ff0000;
        }

        .close-btn-icon {
          width: 14px;
          height: 14px;
          fill: #8fa5b0;
        }
      }
    }
  }

  .popup-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;

    .popup-inner-wrapper {
      width: max-content;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
    }
  }
}

@include xs {
  .auth {
    .title-xxl {
      font-size: 18px;
      line-height: 20px;
    }

    .auth-inner-wrapper .auth-form {
      padding: 16px;
    }
  }
}
</style>
