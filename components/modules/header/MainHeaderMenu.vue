<template>
  <div class="menu-wrapper">
    <button class="menu-btn" type="button" @click="pressMenu" v-click-outside="onClickOutside"><span class="menu-btn-content"></span></button>
    <nav :class="`menu-nav ${isMenu ? 'is-show' : 'is-hide'}`">
      <ul class="menu-nav-list">
        <li class="menu-item-item">
          <n-link class="menu-item-link" to="login/">
            <svg class="menu-link-icon">
              <use xlink:href="~assets/images/sprites/main.svg#icon-bell" />
            </svg>
            Авторизация
          </n-link>
        </li>
        <li class="menu-item-item" :key="index" v-for="(item, index) in navItemsList">
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

    padding: 6px;

    width: 30px;
    height: 26px;

    border-radius: 3px;
    background: #d3d3d3;

    .menu-btn-content {
      position: relative;

      width: 100%;
      height: 100%;

      border-top: 2px solid #808080;
      border-bottom: 2px solid #808080;

      &::before {
        position: absolute;
        content: '';

        left: 0;
        top: 50%;

        width: 100%;
        height: 2px;

        background: #808080;
        transform: translateY(-50%);
      }
    }
  }

  .menu-nav {
    position: absolute;

    padding: 10px;
    margin-top: 5px;

    width: max-content;

    transform-origin: top;

    border-radius: 0 0 8px 8px;
    background: #f2f7fa;
    transform: translateX(calc(-100% + 24px));
    transition: all 1s ease;
    z-index: 3;

    .menu-nav-list {
      .menu-item-item {
        &:hover {
          background: #d5ebfd;
          border-radius: 4px;
        }

        .menu-item-link {
          display: flex;
          align-items: center;
          padding: 6px 8px;

          .menu-link-icon {
            width: 24px;
            height: 24px;
          }
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
