<template>
  <div>
    <div class="general">
      <p class="title" v-if="config.title.length !== 0">{{ config.title }}</p>
      <button class="reset" v-show="handlerChange && config.resetBtn" type="button" @click="$emit('reset-filter')">reset</button>
    </div>
    <slot class="detail" name="detail" />
    <vue-slider :value="sliderValue" class="slider" eventType="auto" :min="sliderData[0]" :max="sliderData[1]" :contained="true" :dotSize="config.dotSize" tooltip="none" @change="handlerSliderChange">
      <template v-slot:dot>
        <slot name="dot" />
      </template>
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js';
import 'vue-slider-component/dist-css/vue-slider-component.css';
// import theme
import 'vue-slider-component/theme/antd.css';
import getMaxValue from '~/mixins/getMaxValueFromArray.js';
import getMinValue from '~/mixins/getMinValueFromArray.js';

export default {
  name: 'BaseDragSlider',
  components: {
    VueSlider,
  },
  mixins: [getMaxValue, getMinValue],
  data: function () {
    return {
      defaultValue: '',
    };
  },
  props: {
    sliderData: {
      type: Array,
      required: true,
    },
    sliderValue: {
      type: [Array, Number],
      required: true,
    },
    config: {
      type: Object,
      default: function () {
        return {
          single: false,
          subTitle: '',
          dotSize: 14,
          resetBtn: false,
        };
      },
    },
  },
  computed: {
    handlerChange() {
      if (this.config.single) return this.sliderValue === this.sliderData[0] ? false : true;

      return JSON.stringify(this.sliderValue) === JSON.stringify(this.sliderData) ? false : true;
    },
  },
  methods: {
    handlerSliderChange(selectValue) {
      this.$emit('range-change', selectValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.general {
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: 900;
  }

  .reset {
    color: #000000;
    font-size: 15;
    border: none;
    padding: 0;
  }
}

.detail {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.slider {
  ::v-deep .vue-slider-rail {
    height: 6px !important;
    background-color: #8fa5b0;

    .vue-slider-process {
      background-color: #1768ac;
    }
  }
}

@include md {
  .slider {
    height: 100%;
    margin-top: 5px;
  }
}
</style>
