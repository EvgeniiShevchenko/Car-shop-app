<template>
  <div class="complectation">
    <h3 class="complectation-title">{{ title }}</h3>
    <ul class="complectation-list" v-click-outside="resetOption">
      <li :class="`complectation-item ${selectOptionsId === index ? 'is-select' : ''}`" :key="index" v-for="(item, index) in collection" @click="selectOption(index)">
        <svg class="complectation-item-icon">
          <use xlink:href="~assets/images/sprites/global.svg#check-arrow" />
        </svg>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import VClamp from 'vue-clamp';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'CarComplectationList',
  data: function () {
    return {
      selectOptionsId: null,
    };
  },
  methods: {
    selectOption(optionId) {
      this.selectOptionsId = optionId;
    },
    resetOption() {
      this.selectOptionsId = null;
    },
  },
  props: {
    collection: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: 'default',
    },
  },
  components: {
    VClamp,
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.complectation {
  .complectation-title {
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    color: #222329;
  }

  .complectation-list {
    margin-top: 16px;

    .complectation-item {
      margin-top: 8px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      font-size: 13px;
      line-height: 16px;
      color: #4a4d5c;

      cursor: pointer;

      .complectation-item-icon {
        margin-right: 2px;

        width: 13px;
        height: 10px;
      }
    }

    .is-select {
      overflow: auto;
      white-space: normal;
      text-overflow: initial;
    }
  }
}

@include xs {
  .complectation .complectation-title {
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
