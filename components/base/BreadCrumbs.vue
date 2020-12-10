<template>
  <main class="main container mt-3 pb-0">
    <div class="outer-wrap">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <n-link class="routing-home-link" to="/">
          <svg class="home-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-home" />
          </svg>
        </n-link>
        <ul class="routing-list pa-0">
          <li :class="`routing-item ${collection.length === index + 1 ? 'is-active' : ''}`" :key="index" v-for="(item, index) in collection">
            <n-link class="routing-item-link" :to="item.path">
              <svg class="routing-link-icon">
                <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-arrow" />
              </svg>
              {{ item.name }}
            </n-link>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    collection: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  .routing-home-link {
    font-size: 4px;

    .home-link-icon {
      width: 14px;
      height: 14px;
    }
  }

  .routing-list {
    display: flex;

    .routing-item {
      display: flex;
      align-items: center;
      margin-left: 15px;

      .routing-item-link {
        display: flex;
        align-items: center;

        font-size: 13px;
        line-height: 16px;
        color: #70848e;

        .routing-link-icon {
          margin-right: 13px;

          width: 4px;
          height: 8px;
        }
      }
    }

    .is-active .routing-item-link {
      color: #b1c4cd;
    }
  }
}
</style>
