<template>
  <div class="select">
    <div class="select-inner-wrapper">
      <v-autocomplete
        ref="mySelect"
        height="36"
        :items="options"
        :single-line="true"
        :hide-details="true"
        :value="value"
        :label="label"
        :multiple="multiple"
        :chips="chips"
        :loading="loading"
        :return-object="payload"
        :menu-props="{ auto: false, offsetY: true }"
        v-on="$listeners"
        background-color="#ffffff"
        outlined
        autocomplete
      >
        <template slot="append">
          <svg class="select-mark">
            <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
          </svg>
        </template>
        <template slot="prepend-item" v-if="isPrepend">
          <p class="prepend" :style="prependStyle">{{ prependTitle }}</p>
        </template>
        <template slot="no-data">
          <span></span>
        </template>
      </v-autocomplete>
      <slot name="reset" v-if="isReset">
        <button class="reset-btn" type="button" @click="$emit('reset')">
          <svg class="reset-icon">
            <use xlink:href="~assets/images/sprites/main.svg#close" />
          </svg>
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutocompleteBtn',
  data() {
    return {
      prependStyle: {
        textAlign: 'center',
        fontSize: '15px',
        lineHeight: '17px',
        color: '#8fa5b0',
      },
      searchInput: '',
    };
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Default',
    },
    value: {
      type: [String, Boolean, Number, Array],
    },
    isPrepend: {
      type: Boolean,
      default: false,
    },
    prependTitle: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    payload: {
      type: Boolean,
      default: false,
    },
    isReset: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  height: 100%;

  .select-inner-wrapper {
    position: relative;

    .reset-btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;

      top: 50%;
      right: 10px;
      padding: 5px;

      transform: translateY(-50%);
      background: white;

      &:hover .reset-icon {
        fill: #0e4c80;
      }

      .reset-icon {
        width: 14px;
        height: 14px;

        fill: #8fa5b0;
      }
    }

    ::v-deep .prepend {
      text-align: center;
      font-size: 15px;
      line-height: 17px;
      color: #8fa5b0;
    }

    .select-mark {
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

        .v-select__selection {
          font-size: 15px;
          font-weight: 500;
          line-height: 17px;
          color: #4a4d5c;
        }

        .v-select__slot > input {
          font-size: 15px;
          font-weight: 500;
          line-height: 17px;
          color: #4a4d5c;
        }
      }

      .v-label {
        position: initial !important;
        margin-bottom: 0;

        height: 17px;

        font-size: 15px;
        line-height: 17px;
        color: #8fa5b0;
      }

      .v-input__append-inner {
        margin-top: 0;
        align-self: center;

        .select-mark {
          transition: all 1s ease-out;
          fill: #8fa5b0;
        }
      }
    }

    ::v-deep .v-select--is-menu-active {
      .select-mark {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
