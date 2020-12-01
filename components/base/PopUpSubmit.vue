<template>
  <div class="pop-up">
    <h3 class="pop-up-title">{{ title }}</h3>
    <p class="pop-up-description">{{ description }}</p>
    <form class="pop-up-form" method="POST">
      <slot />
      <button class="pop-up-submit" type="button" @click="$emit('submit')">{{ btnTitle }}</button>
    </form>
    <button class="pop-up-btn-close" type="button" @click="$emit('close')">
      <svg class="btn-close-icon">
        <use xlink:href="~assets/images/sprites/main.svg#close" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PopUpSubmit',
  props: {
    title: {
      type: String,
      default: 'Заголовок',
    },
    description: {
      type: String,
      default: 'Описание',
    },
    btnTitle: {
      type: String,
      default: 'Отправить',
    },
  },
};
</script>

<style lang="scss" scoped>
.pop-up {
  position: relative;
  padding: 44px 100px;

  background: #ffffff;

  .pop-up-title {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    line-height: 26px;
  }

  .pop-up-description {
    margin-top: 32px;

    font-size: 13px;
    line-height: 16px;
  }

  .pop-up-form {
    display: flex;
    flex-direction: column;
    margin-top: 32px;

    .pop-up-submit {
      margin-top: 16px;

      width: 100%;
      height: 44px;

      background: #4cad33;
      border-radius: 2px;

      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
      color: #ffffff;

      &:hover {
        background: #2ca00d;
      }
    }
  }

  .pop-up-btn-close {
    position: absolute;
    top: 21px;
    right: 21px;

    .btn-close-icon {
      width: 14px;
      height: 14px;

      fill: #8fa5b0;

      &:hover {
        fill: #ff0000;
      }
    }
  }
}
</style>
