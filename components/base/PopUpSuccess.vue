<template>
  <div class="pop-up-success">
    <svg class="pop-up-success-icon">
      <use xlink:href="~assets/images/sprites/global.svg#check-round" />
    </svg>
    <p class="pop-up-success-text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'PopUpSuccess',
  props: {
    title: {
      type: String,
      default: 'Сообщение отправлено. Спасибо за вашу оценку.',
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-up-success {
  position: relative;
  display: flex;
  align-items: center;

  padding: 10px 24px;

  border-radius: 4px;
  background: #4cad33;
  box-shadow: 0px 3px 11px rgba(143, 155, 176, 0.3);

  .pop-up-success-icon {
    width: 21px;
    height: 22px;
  }

  .pop-up-success-text {
    margin-bottom: 0;
    margin-left: 16px;

    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: #ffffff;
  }
}
</style>
