<template>
  <main class="main container pt-0">
    <h1>Настройки аккаунта</h1>
    <div class="outer-wrap">
      <div>
        <div class="d-flex my-6 align-center user_avatar_container">
          <v-avatar size="96" class="mr-8">
            <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" />
            <img v-else src="~assets/images/user_placeholder.png" alt="avatar" />
          </v-avatar>
          <v-file-input v-model="avatar" :rules="rules" class="d-none" ref="v_file_input" accept="image/png, image/jpeg" @change="onFilePicked"></v-file-input>
          <v-btn class="upload_btn" @click="$refs.v_file_input.$refs.input.click()"> {{ avatarUrl ? 'Изменить фото' : 'Добавить фото' }} </v-btn>
          <v-btn v-if="avatarUrl" class="remove_btn ml-6" @click="removeAvatar"> Удалить </v-btn>
        </div>
        <v-alert v-if="isAvatarError" type="error" class="my-4"> Размер фото не должен превышать 2 MB! </v-alert>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-flex>
          <span> Фамилия </span><span class="required">*</span>
          <v-text-field color="#4CAD33" v-model="userInfo.last_name" outlined dense height="36" :rules="[(v) => !!v || `Это поле является обязательным`]" required> </v-text-field>
        </v-flex>
        <v-flex>
          <span> Имя </span><span class="required">*</span>
          <v-text-field color="#4CAD33" v-model="userInfo.first_name" outlined dense height="36" :rules="[(v) => !!v || `Это поле является обязательным`]" required> </v-text-field>
        </v-flex>
        <v-flex>
          <span> Город </span>
          <v-autocomplete
            color="#4CAD33"
            v-model="userInfo.city_id"
            :items="cities"
            :search-input.sync="search"
            height="36px"
            hide-details
            hide-selected
            dense
            outlined
            item-text="name"
            item-value="id"
          >
          </v-autocomplete>
        </v-flex>
        <v-flex>
          <span> Email </span><span class="required">*</span>
          <v-text-field
            v-model="userInfo.email"
            color="#4CAD33"
            outlined
            dense
            height="36"
            :rules="[(v) => !!v || 'Это поле является обязательным', (v) => /.+@.+\..+/.test(v) || 'Email должен содержать @']"
            required
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <span> Номер телефона </span><span class="required">*</span>
          <v-text-field
            v-model="userInfo.phone"
            color="#4CAD33"
            outlined
            dense
            height="36"
            :rules="[(v) => !!v || 'Это поле является обязательным', (v) => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(v) || 'Телефон должен содержать только цыфры']"
            required
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <span> Viber </span>
          <v-text-field color="#4CAD33" v-model="userInfo.phone_viber" outlined dense height="36"> </v-text-field>
        </v-flex>
        <v-flex>
          <span> Статус </span>
          <v-select
            v-model="userInfo.type_user"
            color="#4CAD33"
            :items="status"
            item-value="value"
            item-text="title"
            outlined
            dense
            height="36"
          >
          </v-select>
        </v-flex>
        <v-flex>
          <span> Telegram </span>
          <v-text-field color="#4CAD33" v-model="userInfo.phone_telegram" outlined dense height="36"> </v-text-field>
        </v-flex>
        <div class="user_condition">
          <check-box class="pb-3" @change="userInfo.is_chat = $event" :value="userInfo.is_chat ? !!userInfo.is_chat : false" :label="'Разрешить покупателям связываться со мной через чат'" />
        </div>
        <div class="submit_button">
          <v-btn class="upload_btn" @click="$refs.passwordModal.open()"> Изменить пароль </v-btn>
        </div>
        <div class="user_additional my-6">
          <h3>Вход в AutoSill в один клик</h3>
          <div class="user_additional-info mt-5">
            <div><v-icon class="mr-2">mdi-information-outline</v-icon></div>
            <span>Привяжите ваш профиль из социальных сетей для мгновенной авторизации на площадке в один клик</span>
          </div>
          <div class="user_additional-actions">
            <v-btn class="mt-5">
              <img src="~assets/images/icons/google-symbol.svg" />
              Прявязать аккаунт Google
            </v-btn>
            <v-btn class="mt-5">
              <img src="~assets/images/icons/facebook.svg" />
              Отключить аккаунт Facebook
            </v-btn>
          </div>
        </div>
        <div class="user_actions">
          <v-alert icon="mdi-checkbox-marked-circle-outline" v-if="isSucceeded" type="success" class="my-4"> Изменения были сохраненны </v-alert>
          <v-alert v-if="isSucceeded === false" type="error" class="my-4"> Изменения не были сохраненны, что-то пошло не так. </v-alert>
          <v-btn class="send_btn" @click="submit">Сохранить изменения</v-btn>
        </div>
      </v-form>
      <change-password-modal ref="passwordModal" />
    </div>
  </main>
</template>

<script>
import CheckBox from '@/components/base/CheckBox';
import ChangePasswordModal from '@/components/modules/personal/ChangePasswordModal';

export default {
  name: 'settings',
  layout: 'personal',
  components: { CheckBox, ChangePasswordModal },
  data() {
    return {
      valid: true,
      isSucceeded: null,
      search: '',
      userInfo: {},
      cities: [],
      userViber: false,
      userTelegram: false,
      rules: [(value) => !value || value.size < 2000000 || 'Размер фото не должен превышать 2 MB!'],
      avatarUrl: '',
      avatar: null,
      isAvatarError: false,
      isDeletedAvatar: false,
      isChangedAvatar: false,
      status: [
        {
          title: 'Физическое лицо',
          value: 'personal',
        },
        {
          title: 'Юридическое лицо',
          value: 'entity',
        },
      ],
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;
      try {
        this.userInfo.icon = this.userInfo.image;
        if (this.isDeletedAvatar || this.isChangedAvatar) this.userInfo.icon = this.avatarUrl;
        this.userInfo.viber = !!this.userInfo.viber;
        this.userInfo.telegram = !!this.userInfo.viber;
        this.userInfo.is_chat = !!this.userInfo.viber;
        await this.$services.user.saveUserData(this.userInfo);
        this.isSucceeded = true;
      } catch (error) {
        this.isSucceeded = false;
        console.log(error);
      }
    },
    async getUserInfo() {
      try {
        this.userInfo = (await this.$services.user.getUserData()).data.user;
        this.avatarUrl = this.userInfo.image;
      } catch (error) {
        console.log(error);
      }
    },
    async getCitiesList() {
      let params = {
        search: this.search,
      };
      try {
        this.cities = (await this.$services.user.getCities(params)).data.cities;
      } catch (error) {
        console.log(error);
      }
    },
    removeAvatar() {
      this.avatarUrl = null;
      this.avatar = null;
      this.isDeletedAvatar = true;
    },
    onFilePicked() {
      if (this.avatar && this.avatar.size > 2000000) this.isAvatarError = true;
      if (this.avatar && this.avatar.size <= 2000000) {
        this.isChangedAvatar = true;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.avatar);
        fileReader.addEventListener('load', () => {
          this.avatarUrl = fileReader.result;
          this.isAvatarError = false;
        });
      } else {
        this.avatarUrl = '';
      }
    },
  },
  watch: {
    search() {
      this.getCitiesList();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .outer-wrap {
    .v-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      @include mobile {
        flex-direction: column;
      }
      .flex {
        max-width: calc(50% - 16px);
        min-width: calc(50% - 16px);
        .v-input {
          margin-top: 6px;
        }
        @include mobile {
          max-width: 100%;
          min-width: 100%;
        }
      }
      .social_container {
        margin-left: auto;
        display: flex;
      }
      .submit_button {
        min-width: 100%;
      }
      .user_condition {
        width: 100%;
        margin: 16px 0;
      }
      .user_additional {
        width: 100%;
        &-info {
          max-width: 522px;
          display: flex;
          span {
            display: block;
            color: #70848e;
            font-weight: normal;
            font-size: 14px;
            line-height: 125%;
          }
        }
        &-actions {
          width: 100%;
          display: flex;
          justify-content: space-between;
          max-width: 768px;
          @include mobile {
            flex-direction: column;
          }
          button {
            display: block;
            min-width: 368px;
            border: 1px solid #4a4d5c;
            box-sizing: border-box;
            border-radius: 2px;
            background-color: #ffffff !important;
            padding: 0 20px !important;
            @media (max-width: 1100px) {
              min-width: 250px;
            }
            span {
              color: #4a4d5c;
              font-size: 15px;
              text-transform: none;
            }
            img {
              margin-right: 16px;
              max-width: 16px;
              min-width: 16px;
            }
          }
        }
      }
      .user_actions {
        width: 100%;
        padding-bottom: 60px;
        @include mobile {
          button {
            width: 100%;
          }
        }
      }
    }
  }
  @include sm {
    width: 100%;
    margin-top: 0 !important;
    .content {
      padding: 0 !important;
    }
  }
  @include xs {
    width: 100%;
    .user_avatar_container {
      flex-direction: column;
      button {
        width: 100%;
        margin: 20px 0 0 0 !important;
      }
    }
  }
}
</style>
