<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1 class="mb-8">Контакты</h1>
      <v-container>
        <v-row class="content_container" no-gutters>
          <v-col v-if="description" class="pa-0" lg="6" md="6" sm="12" xs="12">
            <v-flex class="pa-0 description" v-html="description"> </v-flex>
          </v-col>
          <v-col class="pa-0" lg="5" md="5" sm="8" xs="12">
            <v-flex class="pa-0">
              <v-form ref="form" v-model="valid" @submit.prevent="submit" lazy-validation>
                <v-flex v-for="input of formSettings" :key="input.alias">
                  <span> {{ input.name }} </span><span v-if="input.required" class="required">*</span>
                  <v-text-field
                    v-if="input.alias !== 'message'"
                    v-model="form[input.alias]"
                    outlined
                    dense
                    class="mt-1"
                    :placeholder="getPlaceholder(input.alias)"
                    color="#4CAD33"
                    :type="input.alias === 'email' ? 'email' : input.alias === 'phone' ? 'number' : ''"
                    height="36"
                    :rules="getFieldRules(input)"
                    :required="!!input.required"
                  >
                  </v-text-field>
                  <v-textarea
                    v-if="input.alias === 'message'"
                    v-model="form[input.alias]"
                    outlined
                    class="mt-1"
                    placeholder="Текст сообщения"
                    color="#4CAD33"
                    :rules="input.required ? [(v) => !!v || `Это поле является обязательным`] : []"
                    :required="!!input.required"
                  >
                  </v-textarea>
                </v-flex>
                <v-alert icon="mdi-checkbox-marked-circle-outline" v-if="isSucceeded" type="success"> Сообщение было отправленно администратору. </v-alert>
                <v-alert v-if="isSucceeded === false" type="error"> Сообщение не было отправленно, что-то пошло не так. </v-alert>
                <v-btn class="send_btn" height="43" type="submit"> Отправить </v-btn>
              </v-form>
            </v-flex>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      formSettings: null,
      description: null,
      valid: true,
      isSucceeded: null,
      form: {
        name: '',
        company: '',
        phone: '',
        email: '',
        message: '',
      },
    };
  },
  mounted() {
    this.getContacts();
  },
  methods: {
    async getContacts() {
      try {
        const data = (await this.$services.user.getContactForm()).data;
        this.description = data.static_info.description;
        this.formSettings = data.form;
      } catch (error) {
        console.log(error);
      }
    },
    async submit() {
      if (!this.$refs.form.validate()) return;
      try {
        await this.$services.user.submitContactForm(this.form);
        this.isSucceeded = true;
      } catch (error) {
        this.isSucceeded = false;
        console.log(error);
      }
    },
    getFieldRules(field) {
      if (field.required && field.alias !== 'email' && field.alias !== 'name') {
        return [(v) => !!v || `Это поле является обязательным`];
      } else if (field.alias === 'email') {
        return field.required ? [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'Email должен содержать @'] : [(v) => !v || /.+@.+\..+/.test(v) || 'Email должен содержать @'];
      } else if (field.alias === 'name') {
        return field.required
          ? [(v) => !!v || 'Это обязательное поле', (v) => /^[a-zа-яё]+$/i.test(v) || 'Имя должно содержать только буквы']
          : [(v) => !v || /^[a-zа-яё]+$/i.test(v) || 'Имя должно содержать только буквы'];
      } else {
        return [];
      }
    },
    getPlaceholder(alias) {
      return alias === 'phone' ? '+38 011 111 11 11' : alias === 'name' ? 'Семен' : alias === 'company' ? 'Введите компанию' : 'mail@mail.com';
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .container {
    max-width: 100%;
    padding: 0;
    margin-bottom: 72px;
    .description {
      color: #222329;
    }
    .content_container {
      justify-content: space-between;
      ::v-deep textarea {
        min-height: 50px;
        height: 82px;
        @include xs {
          height: 230px;
        }
      }
      .required {
        color: #f05156;
      }
      @include sm {
        flex-direction: column;
        .v-form {
          margin-top: 24px;
        }
      }
    }
  }
  span {
    cursor: default;
  }
}
</style>
