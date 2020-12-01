<template>
  <ul class="check-box-list">
    <li class="check-box-item" :key="index" v-for="(item, index) in collection">
      <v-checkbox class="check-box" :input-value="value" :value="item.value" :label="item.text" :color="background" :ripple="false" hide-details v-on="$listeners">
        <template slot="label" v-if="isLabel">
          <slot name="label" />
        </template>
      </v-checkbox>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CheckBoxGroup',
  props: {
    value: {
      type: Array,
      required: false,
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
  }
}
</style>
