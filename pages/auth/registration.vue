<template>
  <div class="registration mt-6">
    <div v-if="!isContinue">
      <InputCustomField
        class="registration-field"
        :value="firstName"
        inputName="firstName"
        label="Имя"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changeName"
      />
      <InputCustomField
        class="registration-field"
        :value="lastName"
        inputName="lastName"
        label="Фамилия"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changeFamily"
      />
      <InputCustomField
        class="registration-field"
        inputName="phone"
        label="Телефон"
        type="tel"
        :value="phone"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changePhone"
      />
      <InputCustomField
        class="registration-field"
        inputName="email"
        label="Емейл"
        type="email"
        :value="email"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changeEmail"
      />
      <SelectBtn class="select-field" :options="statusList" label="Выбрать" :value="status" :payload="true" :isReset="status !== 1" @change="selectStatus($event)" @reset="resetStatus" />
    </div>
    <div v-else>
      <InputCustomField
        class="registration-field"
        inputName="password"
        label="Пароль"
        type="password"
        :value="password"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changePassword"
      />
      <InputCustomField
        class="registration-field"
        inputName="password_confirmation"
        label="Повторить пароль"
        type="password"
        :value="confirmation"
        :errorList="error.locations"
        :errorMessage="error.message"
        @focus-field="handlerFocus"
        @change-field="changeConfirmation"
      />
      <CheckBox class="check-box-wrapper" :value="isAgree" :isLabel="true" @change="changeAgreement">
        <template slot="label">
          <p class="check-box-label">Я принимаю условия<a class="agree-ref" href="#" @click.prevent.stop="goToAgree">Соглашения о предоставлении онлайн-сервисов</a></p>
        </template>
      </CheckBox>
    </div>
    <button class="continue-btn" v-if="!isContinue" type="button" @click="continueAuth">Далее</button>
    <button class="continue-btn" v-else type="button" @click="createAccount">Создать аккаунт</button>
  </div>
</template>

<script>
// components
import InputCustomField from '~/components/base/InputCustomField.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import SelectBtn from '~/components/base/SelectBtn.vue';
// mixins
import isEmpty from '~/mixins/isEmpty.js';
import formatPhoneNumber from '~/mixins/formatPhoneNumber.js';
import validationRegistrationFields from '~/mixins/validationRegistrationFields.js';
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';

export default {
  name: 'registration',
  mixins: [isEmpty, formatPhoneNumber, validationRegistrationFields, transformArrayForSelectBtn],
  layout: 'auth',
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmation: '',
      isContinue: false,
      isAgree: false,
      statusList: [],
      status: 1,
      error: {
        status: false,
        type: '',
        message: '',
        locations: new Set([]),
      },
    };
  },
  methods: {
    async createAccount() {
      const serverData = {
        first_name: this.firstName,
        last_name: this.lastName,
        phone: Number(this.phone.match(/\d/g).join('')),
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmation,
        type_user_id: this.status,
      };

      if (!this.validationRegistrationFields(serverData) || !this.isAgree) return;

      try {
        const { data } = await this.$services.auth.getRegistrationToken(serverData);

        localStorage.setItem('token', data.token);
        this.$router.push('/auth/login');
      } catch (error) {
        console.error(error);
      }
    },

    handlerFocus(fieldId) {
      if (this.error.locations.has(fieldId)) {
        this.error.locations.delete(fieldId);
        this.error.locations = new Set(this.error.locations);
      }
    },

    changeAgreement(isSelect) {
      this.isAgree = !!isSelect;
    },

    goToAgree() {
      window.location = '/agree';
    },

    selectStatus({ value }) {
      this.status = value;
    },

    resetStatus() {
      this.status = 1;
    },

    continueAuth() {
      const checkData = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email,
      };

      if (!this.validationRegistrationFields(checkData)) return;

      this.isContinue = true;
    },

    changeEmail(value) {
      this.email = value;
    },

    changeName(value) {
      this.firstName = value;
    },

    changeFamily(value) {
      this.lastName = value;
    },

    changePhone(value) {
      this.phone = this.formatPhoneNumber(value);
    },

    changePassword(value) {
      this.password = value;
    },

    changeConfirmation(value) {
      this.confirmation = value;
    },
  },
  async mounted() {
    try {
      const { type_user } = (await this.$services.auth.getUserRole()).data;

      this.statusList = this.transformArrayForSelectBtn(type_user);
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    InputCustomField,
    CheckBox,
    SelectBtn,
  },
};
</script>

<style lang="scss" scoped>
.registration {
  & .registration-field:first-child {
    margin-top: 0;
  }

  .registration-field {
    margin-top: 16px;
  }

  .select-field {
    @extend .registration-field;
  }

  .check-box-wrapper {
    margin-top: 16px;

    .check-box-label {
      white-space: nowrap;

      .agree-ref {
        margin-left: 8px;
        white-space: normal;
        color: #1768ac;
      }
    }

    ::v-deep .v-input__slot {
      .v-input--selection-controls__input {
        align-self: flex-start;
      }

      .v-label {
        font-size: 14px;
        color: #70848e;
      }
    }
  }

  .continue-btn {
    margin-top: 16px;
    @extend .accept-green-btn;
  }
}
</style>
