<template>
  <div class="recovery">
    <InputCustomField
      class="recovery-field mt-6"
      inputName="email"
      label="Email или номер телефона"
      placeholder="Email или номер телефона"
      type="text"
      :value="recovery"
      :isRequiredMark="true"
      :errorList="error.locations"
      :errorMessage="error.message"
      @focus-field="handlerFocus"
      @change-field="changeRecovery"
    />
    <button class="recovery-btn" type="button" @click="pressRecovery">Войти</button>
  </div>
</template>

<script>
// components
import InputCustomField from '~/components//base/InputCustomField.vue';
// mixins
import isEmpty from '~/mixins/isEmpty.js';

export default {
  name: 'recovery',
  mixins: [isEmpty],
  layout: 'auth',
  data() {
    return {
      recovery: '',
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

    async pressRecovery() {
      const serverData = {
        email: this.recovery,
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
        const { message } = (await this.$services.auth.recoveryPassword(serverData)).data;
        this.$root.$emit('show-popup', message);
      } catch (error) {
        console.error(error);
      }
    },

    changeRecovery(value) {
      this.recovery = value;
    },
  },
  components: {
    InputCustomField,
  },
};
</script>

<style lang="scss" scoped>
.recovery {
  & .recovery-field:first-child {
    margin-top: 0;
  }

  .recovery-field {
    margin-top: 16px;
  }

  .recovery-btn {
    margin-top: 16px;
    @extend .accept-green-btn;
  }
}
</style>
