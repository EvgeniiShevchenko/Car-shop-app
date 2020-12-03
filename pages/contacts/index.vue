<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1>Контакты</h1>
      <v-container>
        <v-row class="content_container" no-gutters>
          <v-col class="pa-0" lg="6" md="6" sm="12" xs="12">
            <v-flex class="pa-0" v-html="description">
            </v-flex>
          </v-col>
          <v-col class="pa-0" lg="5" md="5" sm="12" xs="12">
            <v-flex class="pa-0">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex v-for="input of form" :key="input.alias">
                  <span> {{ input.name }} </span>
                  <v-text-field outlined dense height="36" :rules="input.required ? [(v) => !!v || `Это поле является обязательным`] : []" :required="!!input.required"> </v-text-field>
                </v-flex>
                <v-btn class="send_btn"> Отправить </v-btn>
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
      form: null,
      description: null,
      valid: true,
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
        this.form = data.form;
        console.log('this.text', this.description)
        console.log('this.form', this.form)
        console.log('data', data)
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .content_container {
    justify-content: space-between;
    .v-text-field {

    }
  }
}
</style>
