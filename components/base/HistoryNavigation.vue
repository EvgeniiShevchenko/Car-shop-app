<template>
  <div class="history-routing col-12">
    <n-link class="routing-home-link" to="/">
      <svg class="home-link-icon">
        <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-home" />
      </svg>
    </n-link>
    <ul class="routing-list">
      <li class="routing-item">
        <n-link class="routing-item-link" to="catalog">
          <svg class="routing-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-arrow" />
          </svg>
          {{ getPagePathName }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
//Mixins
import getStatusName from '~/mixins/getStatusName.js';

export default {
  name: 'HistoryNavigation',
  mixins: [getStatusName],
  computed: {
    getPagePathName() {
      return this.getStatusName(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.history-routing {
  display: flex;
  align-items: center;
  padding-left: 0;
  .routing-home-link {
    font-size: 4px;
    .home-link-icon {
      width: 14px;
      height: 14px;
    }
  }
  .routing-list {
    .routing-item {
      display: flex;
      align-items: center;
      margin-left: 15px;
      .routing-item-link {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 16px;
        color: #b1c4cd;
        .routing-link-icon {
          margin-right: 13px;
          width: 4px;
          height: 8px;
        }
      }
    }
  }
}
</style>
