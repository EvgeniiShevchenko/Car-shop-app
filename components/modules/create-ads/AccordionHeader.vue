<template>
  <div class="accordion-header-wrapper">
    <span class="accordion-header-number">{{ number }}</span>
    <h3 class="accordion-header-title">{{ title }}</h3>
    <span class="accordion-header-decor"></span>
  </div>
</template>

<script>
export default {
  name: 'AccordionHeader',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    number: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion-header-wrapper {
  display: flex;
  align-items: center;

  .title-xxl {
    @include init-title(#222329, 24px, 500, 26px);
  }

  .accordion-header-number {
    display: flex;
    justify-content: center;
    align-items: center;

    max-width: 38px;
    min-width: 38px;
    width: 38px;
    height: 38px;

    background: #1768ac;

    @extend .title-xxl;
    color: #ffffff;

    flex: 1;
  }

  .accordion-header-title {
    margin-left: 12px;

    @extend .title-xxl;
    color: #1768ac;
  }

  .accordion-header-decor {
    display: inline-block;
    margin-left: 4px;

    width: 100%;

    line-height: 0;
    border-bottom: 1px dashed #51a9f2;

    flex: 1;
  }
}

@include xs {
  .title-xxl {
    font-size: 18px;
    line-height: 20px;
  }
}
</style>
