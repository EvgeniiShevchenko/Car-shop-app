<template>
  <div class="banner">
    <h1 class="banner-title">Покупка и продажа автомобилей в Украине</h1>
    <n-link class="banner-link" to="/create-ads" prefetch>
      <svg class="banner-link-icon">
        <use xlink:href="~assets/images/sprites/main.svg#icon-plus" />
      </svg>
      Подать объявление
    </n-link>
  </div>
</template>

<script>
export default {
  name: 'MainBaner',
};
</script>

<style lang="scss" scoped>
.banner {
  .banner-title {
    margin-bottom: 28px;

    font-size: 42px;
    line-height: 46px;
    color: #222329;
  }

  .banner-link {
    display: flex;
    align-items: center;

    padding: 10px 31px;

    max-width: max-content;

    border-radius: 2px;
    background: #4cad33;

    font-size: 15px;
    font-weight: 500;
    line-height: 15px;
    color: #ffffff;

    &:hover {
      background: #2ca00d;
    }

    .banner-link-icon {
      margin-right: 12px;

      width: 24px;
      height: 24px;
    }
  }
}

@include sm {
  .banner .banner-title {
    // font-size: 28px;
  }
}
</style>
