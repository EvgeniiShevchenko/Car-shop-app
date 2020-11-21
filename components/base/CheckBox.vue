<template>
  <v-checkbox class="check-box" :value="value" :label="label" :color="background" :disabled="isDisabled" :ripple="false" hide-details v-on="$listeners">
    <template slot="label" v-if="isLabel">
      <slot name="label" />
    </template>
  </v-checkbox>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    value: {
      type: [Boolean, Array],
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
    label: {
      type: String,
      default: 'label',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
