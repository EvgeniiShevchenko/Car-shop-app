<template>
  <div class="share_container">
    <h3 class="tooltip-title">Поделиться в соц. сетях:</h3>
    <ul class="tooltip-content-list">
      <li class="tooltip-item" :key="index" v-for="(social, index) in socialNetworkList">
        <button :class="`tooltip-item-btn ${social.icon}`" type="button"></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ToShareBlock',
  data() {
    return {
      socialNetworkList: [{ icon: 'is-telegram' }, { icon: 'is-facebook-chat' }, { icon: 'is-viber' }, { icon: 'is-facebook' }],
    };
  },
};
</script>

<style lang="scss" scoped>
.share_container {
  width: 268px;
  height: 94px;
  background-color: #f2f7fa;
  padding: 16px 12px;
  .tooltip-title {
    font-size: 14px;
    font-weight: normal;
    line-height: 17px;
    color: #222329;
  }
  .tooltip-content-list {
    display: flex;
    margin-top: 8px;
    line-height: 0;
    & li:first-child {
      margin-left: 0;
    }
    .tooltip-item {
      margin-left: 16px;
      .tooltip-item-btn {
        background-image: url('~assets/images/sprites/social-footer-icons-hover.png');
      }
      .is-telegram {
        width: 32px;
        height: 32px;
        background-position: -114px -10px;
      }
      .is-facebook-chat {
        @extend .is-telegram;
        background-position: -114px -62px;
      }
      .is-viber {
        @extend .is-telegram;
        background-position: -10px -114px;
      }
      .is-facebook {
        @extend .is-telegram;
        background-position: -10px -10px;
      }
    }
  }
}
</style>
