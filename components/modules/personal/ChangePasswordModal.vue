<template>
  <v-dialog width="568" persistent v-model="isModalOpen">
    <v-card class="px-6">
      <v-card-title class="headline pa-0">
        <h2 class="mx-auto">Изменение пароля</h2>
      </v-card-title>
      <v-icon class="close_btn" size="16" @click="close">mdi-close</v-icon>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="form">
          <v-flex>
            <span> Ваш текущий пароль </span><span class="required">*</span>
            <v-text-field
              v-model="user.password_old"
              :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[(v) => !!v || 'Это поле является обязательным']"
              :type="showCurrentPassword ? 'text' : 'password'"
              outlined
              dense
              height="36"
              color="#4CAD33"
              @click:append="showCurrentPassword = !showCurrentPassword"
              required
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <span> Введите новый пароль </span><span class="required">*</span>
            <v-text-field
              v-model="user.password"
              outlined
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              :type="showNewPassword ? 'text' : 'password'"
              height="36"
              color="#4CAD33"
              :rules="[(v) => !!v || 'Это поле является обязательным']"
              required
              @click:append="showNewPassword = !showNewPassword"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <span> Повторите новый пароль </span><span class="required">*</span>
            <v-text-field
              v-model="user.password_confirmation"
              outlined
              :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              dense
              :type="showPasswordConfirm ? 'text' : 'password'"
              height="36"
              color="#4CAD33"
              :rules="[(v) => !!v || 'Это поле является обязательным', (v) => user.password === v || 'Пароли не совподают']"
              required
              @click:append="showPasswordConfirm = !showPasswordConfirm"
            >
            </v-text-field>
          </v-flex>
          <v-card-actions>
            <v-alert icon="mdi-checkbox-marked-circle-outline" v-if="isSucceeded" type="success" class="my-4"> Изменения были сохраненны </v-alert>
            <v-alert v-if="isSucceeded === false" type="error" class="my-4"> Изменения не были сохраненны, что-то пошло не так. </v-alert>
            <v-btn class="send_btn" @click="submit"> Сохранить изменения </v-btn>
          </v-card-actions>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ChangePasswordModal',
  data() {
    return {
      isModalOpen: false,
      valid: true,
      isSucceeded: null,
      user: {
        password_old: '',
        password: '',
        password_confirmation: '',
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showPasswordConfirm: false,
    };
  },
  methods: {
    open() {
      this.isModalOpen = true;
      this.user = {
        password_old: '',
        password: '',
        password_confirmation: '',
      };
    },
    close() {
      this.isModalOpen = false;
    },
    async submit() {
      if (!this.$refs.form.validate()) return;
      try {
        await this.$services.user.ChangeUserPassword(this.user);
        this.isSucceeded = true;
      } catch (error) {
        this.isSucceeded = false;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  padding: 44px 0;
  @include xs {
    padding: 44px 10px !important;
  }
  .close_btn {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  h2 {
    margin: 0 auto 32px auto;
  }
  .form {
    max-width: 370px;
    margin: 0 auto;
    .flex {
      .v-input {
        margin-top: 6px;
      }
    }
    .send_btn {
      width: 100%;
    }
    .v-card__actions {
      flex-direction: column;
    }
  }
}
</style>
