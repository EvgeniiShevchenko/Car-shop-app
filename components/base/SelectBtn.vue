<template>
  <div class="select">
    <v-select
      :items="options"
      v-on="$listeners"
      height="36"
      :single-line="true"
      :hide-details="true"
      :value="value"
      :label="label"
      :menu-props="{ auto: false, offsetY: true }"
      background-color="#ffffff"
      outlined
      :v-on="$listeners"
    >
      <template slot="append">
        <svg class="select-mark">
          <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
        </svg>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: 'SelectBtn',
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: 'Default',
    },
    value: {
      type: [String],
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  &-mark {
    width: 12px;
    height: 8px;
  }

  ::v-deep .v-input {
    fieldset {
      border-color: #8fa5b0;
      border-radius: 2px;

      legend {
        width: 0 !important;
      }
    }

    .v-input__slot {
      min-height: initial;
    }

    .v-label {
      position: initial !important;
      margin-bottom: 0;
    }

    .v-input__append-inner {
      margin-top: 0;
      align-self: center;

      .select-mark {
        transition: all 1s ease-out;
      }
    }
  }

  ::v-deep .v-select--is-menu-active {
    .select-mark {
      transform: rotate(180deg);
    }
  }
}
</style>
