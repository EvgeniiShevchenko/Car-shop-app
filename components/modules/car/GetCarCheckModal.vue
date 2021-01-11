<template>
  <v-dialog v-model="dialog" max-width="700px">
    <v-card>
      <div class="v-card-body">
        <v-icon color="#8FA5B0" class="close_btn" size="16" @click="dialog = false">mdi-close</v-icon>
        <h2>Оформление заявки на проверку авто</h2>
        <p>Оформление заявки на проверку авто</p>
        <div class="d-flex agreement">
          <v-checkbox color="#4CAD33" :ripple="false" hide-details class="check-box" v-model="isAgree"></v-checkbox>
          <p>Я согласен(а) с <nuxt-link :to="localePath('#')">пользовательским соглашением</nuxt-link></p>
        </div>
        <p class="sum">Сумма проверки: {{ sum }} {{ currency }}</p>
        <v-btn class="send_btn" @click="getPayment" :disabled="!isAgree"> Оплатить </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'GetCarCheckModal',
  data() {
    return {
      dialog: false,
      isAgree: false,
      sum: 0,
      currency: '',
    };
  },
  methods: {
    open(sum = 0, currency) {
      this.dialog = true;
      this.sum = sum;
      this.currency = currency;
    },
    getPayment() {
      console.log('getPayment');
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  padding: 44px 12px 35px 12px;
  &-body {
    max-width: 440px;
    margin: 0 auto;
    .close_btn {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    h2 {
      text-align: center;
      margin-bottom: 32px;
    }
    p {
      margin-bottom: 16px;
      text-align: center;
    }
    .agreement {
      align-items: center;
      width: fit-content;
      margin: 0 auto 16px auto;
      p {
        margin-bottom: 0;
      }
      a {
        font-size: 15px;
        font-weight: 500;
        line-height: 17px;
        color: #1768ac;
      }
    }
    .send_btn {
      width: 100%;
      margin-top: 32px;
      display: block;
    }
  }
  .sum {
    font-weight: 500;
  }
}
</style>
