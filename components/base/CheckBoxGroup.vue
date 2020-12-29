<template>
  <ul class="check-box-list">
    <li class="check-box-item" :key="index" v-for="(item, index) in isOverflow ? showList : collection">
      <v-checkbox class="check-box" :input-value="value" :value="item.value" :label="item.text" :color="background" :ripple="false" hide-details v-on="$listeners">
        <template slot="label" v-if="isLabel">
          <slot name="label" />
        </template>
      </v-checkbox>
    </li>
    <li class="check-box-item" v-if="isOverflow && collection.length > this.amountShow">
      <button class="show-more-btn" type="button" @click="showMore">Показать все</button>
    </li>
    <li :class="`empty-string ${isFixAlign ? 'has-empty' : ''}`" :style="`height: ${emptyHeight}px`" :key="collection.length + item" v-for="item in amountEmptyStirng"></li>
  </ul>
</template>

<script>
export default {
  name: 'CheckBoxGroup',
  data() {
    return {
      showList: [],
      isShow: false,
    };
  },
  methods: {
    showMore() {
      if (this.isShow) {
        this.showList = this.collection.slice(0, this.amountShow);
        this.isShow = false;

        return;
      }

      this.showList = this.collection;
      this.isShow = true;
    },
  },
  mounted() {
    this.showList = this.collection.slice(0, this.amountShow);
  },
  props: {
    value: {
      type: Array,
      required: false,
    },
    isOverflow: {
      type: Boolean,
      default: false,
    },
    amountShow: {
      type: Number,
      default: 5,
    },
    isLabel: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '#4CAD33',
    },
    collection: {
      type: Array,
      required: true,
    },
    isFixAlign: {
      type: Boolean,
      default: false,
    },
    amountEmptyStirng: {
      type: Number,
    },
    emptyHeight: {
      type: Number,
      default: 24,
    },
  },
};
</script>

<style lang="scss" scoped>
.check-box-list {
  margin-top: 12px;

  & li:first-child {
    margin-top: 0;
  }

  .check-box-item {
    margin-top: 12px;

    .check-box {
      margin-top: 0;
      padding-top: 0;

      ::v-deep .v-input__control {
        .v-input--selection-controls__input {
          .v-icon {
            background: #ffffff;
            font-size: 30px;
          }

          .mdi-checkbox-blank-outline::before {
            content: '';

            width: 22px;
            height: 22px;

            border-radius: 2px;
            border: 1px solid #8fa5b0;
          }
        }

        .v-label {
          font-size: 15px;
          line-height: 17px;
          color: #4a4d5c;
        }
      }
    }

    .show-more-btn {
      font-size: 14px;
      line-height: 17px;
      color: #70848e;

      border-bottom: dashed 0.7px #70848e;
    }
  }

  .empty-string {
    display: none;
    width: 100%;
    height: 0;
  }

  .has-empty {
    display: block;
  }
}
</style>
