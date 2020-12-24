<template>
  <div :class="`custom-input ${errorList.has(inputName) ? 'is-error' : ''}`">
    <label :class="`input-label ${isRequiredMark ? 'is-required' : ''}`" v-if="isLabel">{{ label }}</label>
    <div class="input-wrapper">
      <input class="input" v-if="isMask" :type="type" v-model="fieldValue" v-mask="patern" :placeholder="placeholder" @input="changeField" @focus="$emit('focus-field', inputName)" />
      <input class="input" v-else :type="type" :value="value" :placeholder="placeholder" @input="changeField" @focus="$emit('focus-field', inputName)" />
      <slot name="default" v-if="isAppend">
        <button class="append-btn" type="button" @click="$emit('show')">
          <svg class="append-btn-icon">
            <use xlink:href="~assets/images/sprites/global.svg#show" />
          </svg>
        </button>
      </slot>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'InputCustomField',
  methods: {
    changeField(e) {
      this.$emit('change-field', e.target.value);
    },
  },
  data() {
    return {
      fieldValue: '',
    };
  },
  props: {
    errorList: {
      type: Set,
      default: () => {
        return new Set([]);
      },
    },
    type: {
      type: String,
      default: 'text',
    },
    inputName: {
      type: String,
      default: 'input',
    },
    label: {
      type: String,
      default: 'Label',
    },
    isLabel: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    isRequiredMark: {
      type: Boolean,
      defaullt: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    errorMessage: {
      type: String,
      default: 'Error',
    },
    isAppend: {
      type: Boolean,
      default: false,
    },
    isMask: {
      type: Boolean,
      default: false,
    },
    patern: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  .input-label {
    display: inline-block;
    margin-bottom: 6px;

    font-size: 15px;
    line-height: 17px;
    color: #4a4d5c;
  }

  .is-required {
    &::after {
      content: '*';
      margin-left: 2px;
      color: #f05156;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .input {
      @extend .input-text-classic;
      width: 100%;

      &::placeholder {
        font-weight: normal;
      }
    }

    .append-btn {
      position: absolute;
      display: flex;
      right: 10px;

      .append-btn-icon {
        width: 22px;
        height: 16px;
      }
    }
  }

  .error-message {
    display: none;
    margin-top: 4px;

    font-size: 12px;
    line-height: 12px;
    color: #f05156;
  }
}

.is-error {
  .error-message {
    display: block;
  }

  .input-wrapper .input {
    border: 1px solid #f05156;
  }
}
</style>
