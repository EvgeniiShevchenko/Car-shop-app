<template>
  <div :class="`select ${className}`">
    <div class="select-inner-wrapper">
      <v-select
        ref="mySelect"
        height="36"
        :items="options"
        :single-line="true"
        :hide-details="true"
        :value="value"
        :label="label"
        :loading="loading"
        :return-object="payload"
        :menu-props="{ auto: false, offsetY: true }"
        :multiple="multiple"
        :chips="chips"
        v-on="$listeners"
        background-color="#ffffff"
        outlined
        :value-comparator="
          (a, b) => {
            return a === b ? compareValue(a, b) : false;
          }
        "
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
        <template slot="prepend-inner" v-if="isPrependInput"
          ><span class="prepend-content">{{ prependInputTitle }}</span></template
        >
      </v-select>
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
  name: 'SelectBtn',
  data() {
    return {
      prependStyle: {
        textAlign: 'center',
        fontSize: '15px',
        lineHeight: '17px',
        color: '#8fa5b0',
      },
    };
  },
  methods: {
    compareValue(a, b) {
      this.$nextTick(() => {
        if (!!this.$refs.mySelect) {
          this.$emit('initial', this.$refs.mySelect.selectedItems);
        }
      });

      return true;
    },
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
      default: '',
    },
    value: {
      type: [String, Number, Boolean, Array],
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
    isPrependInput: {
      type: Boolean,
      default: false,
    },
    prependInputTitle: {
      type: String,
      default: 'Prepend',
    },
    className: {
      type: String,
      default: 'default',
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

.prepend {
  .select-inner-wrapper {
    width: min-content;

    ::v-deep .v-select {
      .v-input__control > div {
        padding: 0;
        height: min-content !important;

        .v-input__prepend-inner {
          align-self: center;
          margin-top: 0;

          .prepend-content {
            white-space: nowrap;
            font-size: 14px;
            line-height: 17px;
            color: #70848e;
          }
        }

        fieldset {
          border: none;
        }

        .v-select__selections {
          .v-select__selection {
            margin: 0 4px 0 0;
          }

          input {
            display: none;
          }
        }
      }
    }
  }
}
</style>
