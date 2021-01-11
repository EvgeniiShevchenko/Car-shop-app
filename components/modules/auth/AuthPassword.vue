<template>
  <div class="password mt-6">
    <InputCustomField
      class="password-field"
      inputName="password"
      label="Ваш текущий пароль"
      :type="currentPasswordType"
      :value="currentPassword"
      :isAppend="true"
      :isRequiredMark="true"
      :errorList="error.locations"
      :errorMessage="error.message"
      @focus-field="handlerFocus"
      @change-field="changeCurrentPassword"
      @show="showCurrentPassword"
    />
    <InputCustomField
      class="password-field"
      inputName="_password"
      label="Введите новый пароль"
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
    <InputCustomField
      class="password-field"
      inputName="password_confirmation"
      label="Повторите новый пароль"
      :type="confirmationType"
      :value="confirmation"
      :isAppend="true"
      :isRequiredMark="true"
      :errorList="error.locations"
      :errorMessage="error.message"
      @focus-field="handlerFocus"
      @change-field="changeConfirmation"
      @show="showConfirmation"
    />
    <button class="password-btn" type="button" @click="saveChanges">Сохранить изменения</button>
  </div>
</template>

<script>
// components
import InputCustomField from '~/components//base/InputCustomField.vue';
// mixins
import isEmpty from '~/mixins/isEmpty.js';
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  name: 'AuthPassword',
  mixins: [isEmpty, getAuthToken],
  data() {
    return {
      currentPasswordType: 'password',
      passwordType: 'password',
      confirmationType: 'password',
      currentPassword: '',
      password: '',
      confirmation: '',
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

    showCurrentPassword() {
      this.currentPasswordType = this.currentPasswordType === 'password' ? 'text' : 'password';
    },

    showPassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },

    showConfirmation() {
      this.confirmationType = this.confirmationType === 'password' ? 'text' : 'password';
    },

    async saveChanges() {
      const serverData = {
        password: this.currentPassword,
        _password: this.password,
        password_confirmation: this.confirmation,
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
        const { message } = (await this.$services.auth.setNewPassword({ ...serverData, token: this.getAuthToken() })).data;
        console.log('🚀 ~ file: password.vue ~ line 123 ~ saveChanges ~ message', message);
      } catch (error) {
        console.error(error);
      }
    },

    changeCurrentPassword(value) {
      this.currentPassword = value;
    },

    changePassword(value) {
      this.password = value;
    },

    changeConfirmation(value) {
      this.confirmation = value;
    },
  },
  components: {
    InputCustomField,
  },
};
</script>

<style lang="scss" scoped>
.password {
  width: 100%;

  & .password-field:first-child {
    margin-top: 0;
  }

  .password-field {
    margin-top: 16px;
  }

  .password-btn {
    margin-top: 16px;
    @extend .accept-green-btn;
  }
}
</style>
