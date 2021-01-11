<template>
  <div v-if="breadCrumbs && breadCrumbs.length" class="main container mt-3 pb-0">
    <div class="outer-wrap">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <n-link class="routing-home-link" to="/">
          <svg class="home-link-icon">
            <use xlink:href="~assets/images/sprites/global.svg#bread-crumbs-home" />
          </svg>
        </n-link>
        <ul class="routing-list pa-0">
          <li :class="`routing-item ${breadCrumbs.length === index + 1 ? 'is-active' : ''}`" :key="index" v-for="(item, index) in breadCrumbs">
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
import pages from '@/entities/pages';

export default {
  name: 'BreadCrumbs',
  data() {
    return {
      pages: pages,
      breadCrumbs: [],
    };
  },
  mounted() {
    this.getRouteHistory();
  },
  computed: {
    ...mapState(['currentCarName']),
  },
  methods: {
    getRouteHistory() {
      const { path } = this.$route;
      let breadCrumbs = [];
      const pathArray = path.split('/').filter((path) => !!path);
      let status = JSON.parse(localStorage.getItem('filterParamsName')).status;
      pathArray.forEach((item) => {
        let path, name;

        if (item === 'catalog' || item === 'auto') {
          path = `/catalog?status=${this.getStatus(status)}`;
          name = status ? status : 'Все автомобили';
        } else {
          path = `/${item}`;
          name = this.pages[item] ? this.pages[item] : item;
        }
        breadCrumbs.push({ path, name });
      });

      if (pathArray[0] === 'check') {
        breadCrumbs = this.getPathForCheck(pathArray, status);
      }

      if (pathArray[0] === 'auto') {
        breadCrumbs[breadCrumbs.length - 1].name = this.currentCarName;
      }

      this.breadCrumbs = breadCrumbs;
    },
    getStatus(status) {
      switch (status) {
        case 'Б/у автомобили':
          return 1;
        case 'Новые автомобили':
          return 2;
        case 'Под пригон автомобили':
          return 3;
        default:
          return 0;
      }
    },
    getPathForCheck(pathArray, status) {
      return [
        {
          path: `/catalog?status=${this.getStatus(status)}`,
          name: status ? status : 'Все автомобили',
        },
        {
          path: `/auto/${pathArray[1]}`,
          name: this.currentCarName,
        },
        {
          path: `/check/${pathArray[1]}`,
          name: 'Проверка авто',
        },
      ];
    },
  },
  watch: {
    $route() {
      this.getRouteHistory();
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
