<template>
  <v-app class="auth">
    <div class="auth-wrapper container">
      <form class="auth-form row no-guter" method="POST">
        <h1 class="auth-title" v-if="getRouteName !== 'password'">
          {{ getRouteName === 'login' ? 'Вход в личный кабинет' : getRouteName === 'registration' ? 'Регистрация' : 'Восстановление пароля' }}
        </h1>
        <h1 class="auth-title" v-else>Изменение пароля</h1>
        <nuxt class="content" />
        <div class="footer mt-6" v-if="getRouteName !== 'password'">
          <div v-if="getRouteName !== 'recovery'">
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
          <div class="reqistration-links-wrapper mt-6" v-if="getRouteName === 'login'">
            <p class="create-account">Нет аккаунта?<n-link class="create-account-link" to="/auth/registration">Перейти к регистрации</n-link></p>
            <p class="recovery-password">Забыли пароль?<n-link class="recovery-password-link" to="/auth/recovery">Восстановить пароль</n-link></p>
          </div>
          <div class="login-wrapper mt-6" v-if="getRouteName === 'registration'">
            <p class="login">Уже зарегистрированы?<n-link class="login-link" to="/auth/login">Перейти к логину</n-link></p>
          </div>
          <div class="back-login-wrapper mt-6" v-if="getRouteName === 'recovery'">
            <p class="back-login">Вспомнили пароль?<n-link class="back-login-link" to="/auth/login">Вернуться к логину</n-link></p>
          </div>
          <n-link class="agree-link" v-if="getRouteName !== 'recovery'" to="agree">Соглашение об использовании сайта</n-link>
        </div>
        <n-link class="close-btn" to="/" tag="button">
          <svg class="close-btn-icon">
            <use xlink:href="~assets/images/sprites/global.svg#close" />
          </svg>
        </n-link>
      </form>
      <transition name="fade">
        <div class="popup-wrapper" v-if="popUpShow">
          <PopUpSuccess class="popup-inner-wrapper" :title="message" />
        </div>
      </transition>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
// mixins
import getRouteNameFromPath from '~/mixins/getRouteNameFromPath.js';
import getAuthToken from '~/mixins/getAuthToken.js';
// components
import PopUpSuccess from '~/components/base/PopUpSuccess';

export default {
  name: 'auth',
  mixins: [getRouteNameFromPath, getAuthToken],
  data() {
    return {
      popUpShow: false,
      message: '',
    };
  },
  computed: {
    getRouteName() {
      return this.getRouteNameFromPath(this.$route.path);
    },
  },
  methods: {
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
          this.$axios.setToken(response.data.token);
          this.$router.push('/personal/settings');
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },

    ...mapActions({ setLogin: 'setLogin' }),
  },
  mounted() {
    this.$root.$on('show-popup', this.showPopUp);

    if (this.getAuthToken()) {
      this.$axios.setToken(this.getAuthToken());
      this.setLogin(true);
    } else {
      this.setLogin(false);
    }
  },
  components: {
    PopUpSuccess,
  },
};
</script>

<style lang="scss" scoped>
.auth {
  @include init-font;
  width: 100%;
  height: 100vh;
  display: flex;

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

  .auth-wrapper {
    display: flex;
    height: 100%;

    .auth-form {
      position: relative;

      padding: 44px 100px;
      margin: 0 auto;

      max-width: 568px;
      width: 100%;
      align-self: center;

      .auth-title {
        @extend .title-xxl;
        text-align: center;
      }

      .content {
        width: 100%;
      }

      .footer {
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
}

@include xs {
  .auth {
    .title-xxl {
      font-size: 18px;
      line-height: 20px;
    }

    .auth-wrapper .auth-form {
      padding: 16px;
    }
  }
}
</style>
