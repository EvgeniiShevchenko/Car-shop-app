<template>
  <div class="radio-group">
    <v-radio-group class="radio-btn-bar" :value="value" :column="dirrection" v-on="$listeners">
      <v-radio class="radio-btn" :key="index" v-for="(item, index) in collection" :label="item.text" :color="color" :value="item.value" :ripple="false" />
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: 'RadioButtonGroup',
  props: {
    collection: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number],
    },
    dirrection: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'success',
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-group {
  ::v-deep .v-input__control {
    .v-input__slot {
      margin-bottom: 0;
    }

    .v-messages {
      display: none;
    }
  }

  .radio-btn {
    ::v-deep .v-label {
      font-size: 15px;
      line-height: 17px;
      color: #4a4d5c;
    }
  }
}
</style>
