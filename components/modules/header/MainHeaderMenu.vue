<template>
  <div class="menu-wrapper">
    <button class="menu-btn" type="button" @click="pressMenu" v-click-outside="onClickOutside"><span class="menu-btn-content"></span></button>
    <nav :class="`menu-nav ${isMenu ? 'is-show' : 'is-hide'}`">
      <ul class="menu-nav-list">
        <li :class="`menu-item ${index === navItemsList.length - 1 ? 'is-radius-4' : ''}`" :key="index" v-for="(item, index) in navItemsList">
          <n-link class="menu-item-link" :to="`${item.link}`">
            {{ item.name }}
          </n-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainHeaderMenu',
  data() {
    return {
      navItemsList: [
        { name: 'Б/у автомобили', link: 'auto' },
        { name: 'Новые автомобили', link: 'new-auto' },
        { name: 'Новости', link: 'news' },
      ],
      isMenu: false,
    };
  },
  methods: {
    pressMenu() {
      this.isMenu = !this.isMenu;
    },
    onClickOutside() {
      this.isMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: relative;

  .menu-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 3px;

    width: 24px;
    height: 24px;

    background: #1768ac;

    .menu-btn-content {
      position: relative;

      width: 100%;
      height: 2px;

      background: #dadada;
      border-radius: 1px;

      &::before {
        position: absolute;
        content: '';

        left: 0;
        top: -5px;

        width: 100%;
        height: 100%;

        border-radius: 1px;
        background: #dadada;
      }

      &::after {
        position: absolute;
        content: '';

        left: 0;
        bottom: -5px;

        width: 100%;
        height: 100%;

        border-radius: 1px;
        background: #dadada;
      }
    }
  }

  .menu-nav {
    position: absolute;
    margin-top: 14px;

    width: max-content;

    transform-origin: top;

    border-radius: 0 0 4px 4px;
    background: #f2f7fa;
    transform: translateX(calc(-100% + 24px));
    transition: all 1s ease;
    z-index: 3;

    .menu-nav-list {
      .menu-item {
        &:hover {
          background: #d5ebfd;
        }

        .menu-item-link {
          display: flex;
          align-items: center;
          padding: 16px 24px;
        }
      }

      .is-radius-4 {
        &:hover {
          border-radius: 0 0 4px 4px;
          background: #d5ebfd;
        }
      }
    }
  }

  .is-show {
    transform: translateX(calc(-100% + 24px)) scaleY(1);
  }

  .is-hide {
    transform: translateX(calc(-100% + 24px)) scaleY(0);
  }
}
</style>
