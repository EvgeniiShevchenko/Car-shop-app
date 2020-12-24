<template>
  <div class="login">
    <InputCustomField
      class="login-field mt-6"
      inputName="login"
      label="Email или номер телефона"
      placeholder="Email или номер телефона"
      type="text"
      :value="login"
      :isRequiredMark="true"
      :errorList="error.locations"
      :errorMessage="error.message"
      @focus-field="handlerFocus"
      @change-field="changeLogin"
    />
    <InputCustomField
      class="login-field"
      inputName="password"
      label="Ваш текущий пароль"
      placeholder="Ваш текущий пароль"
      :type="passwordType"
      :value="password"
      :isAppend="true"
      :isRequiredMark="true"
      :errorList="error.locations"
      :errorMessage="error.message"
      @focus-field="handlerFocus"
      @change-field="changePassword"
      @show="showPassword"
    />
    <CheckBox class="check-box-wrapper mt-4" :value="isRemember" label="Запомнить меня" @change="changeRemember" />
    <button class="login-btn" type="button" @click="pressLogin">Войти</button>
  </div>
</template>

<script>
// components
import InputCustomField from '~/components//base/InputCustomField.vue';
import CheckBox from '~/components/base/CheckBox.vue';
// mixins
import isEmpty from '~/mixins/isEmpty.js';

export default {
  name: 'login',
  mixins: [isEmpty],
  layout: 'auth',
  data() {
    return {
      login: '',
      password: '',
      passwordType: 'password',
      isRemember: null,
      error: {
        status: false,
        type: '',
        message: '',
        locations: new Set([]),
      },
    };
  },
  methods: {
    handlerFocus(fieldId) {
      if (this.error.locations.has(fieldId)) {
        this.error.locations.delete(fieldId);
        this.error.locations = new Set(this.error.locations);
      }
    },
    async pressLogin() {
      const serverData = {
        login: this.login,
        password: this.password,
      };

      for (let item in serverData) {
        if (this.isEmpty(serverData[item])) {
          if (!this.error.status) {
            this.error.message = 'Ошибка поля. Поле должно быть заполненным';
            this.error.type = 'empty';
            this.error.status = true;
          }

          this.error.locations.add(item);
        }
      }

      if (!!this.error.locations.size) {
        this.error.locations = new Set(this.error.locations);
        return;
      }

      this.error = { ...this.error, status: false, message: '', type: '' };

      try {
        const { data } = await this.$services.auth.getLoginToken(serverData);
        localStorage.setItem('token', data.token);
        this.$axios.setToken(data.token);
        this.$router.push('/personal/settings');
      } catch (error) {
        console.error(error);
      }
    },

    changeLogin(value) {
      this.login = value;
    },

    changePassword(value) {
      this.password = value;
    },

    showPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },

    changeRemember(isSelect) {
      this.isRemember = isSelect;
    },
  },
  components: {
    InputCustomField,
    CheckBox,
  },
};
</script>

<style lang="scss" scoped>
.login {
  & .login-field:first-child {
    margin-top: 0;
  }

  .login-field {
    margin-top: 16px;
  }

  .login-btn {
    margin-top: 16px;
    @extend .accept-green-btn;
  }
}
</style>
