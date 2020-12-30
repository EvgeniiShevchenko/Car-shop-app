<template>
  <div class="field-wrapperok">
    <div v-if="isLabel">
      <label :class="`field-label ${isRequireddMark ? 'is-required' : ''}`">{{ label }}</label>
    </div>
    <AutocompleteBtn
      class="field-select"
      v-if="isAutoComplete"
      :options="collection"
      :value="defaultValue"
      v-model="value"
      :payload="payload"
      :multiple="multiple"
      :chips="chips"
      :isPrepend="isPrepend"
      :loading="loading"
      :prependTitle="prependTitle"
      :isReset="isReset"
      :label="fieldLabel"
      v-on="$listeners"
      @reset="resetField"
    />
    <SelectBtn
      class="field-select"
      v-else
      :options="collection"
      v-model="value"
      :multiple="multiple"
      :chips="chips"
      :value="defaultValue"
      :payload="payload"
      :isPrepend="isPrepend"
      :loading="loading"
      :prependTitle="prependTitle"
      :isReset="isReset"
      :label="fieldLabel"
      v-on="$listeners"
      @reset="resetField"
    />
  </div>
</template>

<script>
// components
import SelectBtn from '~/components/base/SelectBtn.vue';
import AutocompleteBtn from '~/components/base/AutocompleteBtn.vue';

export default {
  name: 'SelectField',
  data() {
    return {
      value: this.defaultValue,
    };
  },
  watch: {
    defaultValue() {
      this.value = this.defaultValue;
    },
  },
  methods: {
    resetField() {
      this.value = this.defaultValue;
      this.$emit('reset-field', this.defaultValue);
    },
  },
  mounted() {
    console.log('🚀 ~ file: SelectField.vue ~ line 18 ~ mounted ~ mounted', this.collection);
  },
  props: {
    defaultValue: {
      type: [String, Number, Object, Array],
      default() {
        return null;
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    chips: {
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
    label: {
      type: String,
      default: 'Заголовок',
    },
    fieldLabel: {
      type: String,
      default: 'Выбрать',
    },
    isLabel: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Выбрать',
    },
    isRequireddMark: {
      type: Boolean,
      default: false,
    },
    isAutoComplete: {
      type: Boolean,
      default: false,
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
    collection: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    SelectBtn,
    AutocompleteBtn,
  },
};
</script>

<style lang="scss" scoped>
.field-wrapperok {
  margin-top: 12px;

  .field-label {
    display: block;

    margin-bottom: 6px;

    font-size: 15px;
    line-height: 17px;
    color: #4a4d5c;
  }

  .is-required {
    &::after {
      margin-left: 2px;

      content: '*';
      color: #f05156;
    }
  }

  .field-select {
  }
}
</style>
