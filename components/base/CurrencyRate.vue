<template>
  <section class="bank-rate">
    <h3 class="rate-title">Курс валют по НБУ на {{ $options.filters.getCurrentDateByFormat() }}</h3>
    <div class="rate-currency-wrapper">
      <p class="rate-currency-simbol">$ 1</p>
      <p class="rate-currency-buy">
        покупка
        <span class="currency-buy-value">{{ collection.setting.USD_buy | cropFloatNumber }} грн</span>
      </p>
      <p class="rate-currency-sell">
        продажа
        <span class="currency-sell-value">{{ collection.setting.USD_sale | cropFloatNumber }} грн</span>
      </p>
    </div>
    <div class="rate-currency-wrapper">
      <p class="rate-currency-simbol">€ 1</p>
      <p class="rate-currency-buy">
        покупка
        <span class="currency-buy-value">{{ collection.setting.EUR_buy | cropFloatNumber }} грн</span>
      </p>
      <p class="rate-currency-sell">
        продажа
        <span class="currency-sell-value">{{ collection.setting.EUR_sale | cropFloatNumber }} грн</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CurrencyRate',
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.bank-rate {
  padding: 32px;
  background: #d5ebfd;

  flex: 1;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }

  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }

  & div:last-child {
    margin-top: 9px;
    padding-bottom: 0;
    box-shadow: none;
  }

  .rate-title {
    @extend .title-xl;
    color: #222329;
  }

  .rate-currency-wrapper {
    display: flex;
    align-items: center;

    padding-bottom: 9px;
    margin-top: 20px;

    box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

    .rate-currency-simbol {
      white-space: nowrap;

      font-size: 15px;
      font-weight: 500;
      line-height: 17px;
      color: #222329;
    }

    .rate-currency-buy {
      @extend .rate-currency-simbol;
      margin-left: 24px;

      font-weight: normal;
      font-size: 13px;
      line-height: 16px;

      .currency-buy-value {
        @extend .rate-currency-simbol;
        display: block;
      }
    }

    .rate-currency-sell {
      @extend .rate-currency-simbol;
      margin-left: 10px;

      font-weight: normal;
      font-size: 13px;
      line-height: 16px;

      .currency-sell-value {
        @extend .rate-currency-simbol;
        display: block;
      }
    }
  }
}

@include sm {
  .bank-rate {
    padding: 16px;
  }
}

@include xs {
  .bank-rate {
    margin-top: 16px;
    max-width: 253px;

    .title-xxxl {
      font-size: 22px;
      line-height: 24px;
    }

    .title-xl {
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>
