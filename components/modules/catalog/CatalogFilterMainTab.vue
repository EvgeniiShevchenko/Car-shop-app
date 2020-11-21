<template>
  <ul class="filter-tabs-list">
    <li class="tabs-list-item" :key="index" v-for="(item, index) in tabsList">
      <button :class="`tabs-item-btn  ${activeTab == index ? 'is-active' : ''}`" type="button" @click="$emit('select-tab', index)">{{ item }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CatalogFilterMainTab',
  data() {
    return {
      tabsList: ['Все', 'Б/у', 'Новые', 'Под пригон'],
    };
  },
  props: {
    activeTab: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-tabs-list {
  padding: 16px 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(65px, 1fr));
  gap: 12px;

  background: #f2f7fa;
  border-radius: 8px;

  & li:last-child {
    grid-column: span 2;
    max-width: 120px;
  }

  .tabs-list-item {
    grid-row: span 1;
    grid-column: span 1;
    width: 100%;

    .tabs-item-btn {
      height: 36px;
      width: 100%;

      border-radius: 2px;
      border: 1px solid #4a4d5c;

      font-size: 15px;
      font-weight: 500;
      line-height: 15px;

      &:hover {
        background: #4cad33;
        border: none;
        color: #ffffff;
      }
    }

    .is-active {
      border: none;
      background: #4cad33;
      color: #ffffff;

      &:hover {
        background: #2ca00d;
      }
    }
  }
}

@include xs {
  .filter-tabs-list {
    & li:last-child {
      grid-column: span 2 !important;
      max-width: 120px !important;
    }
  }
}
</style>
