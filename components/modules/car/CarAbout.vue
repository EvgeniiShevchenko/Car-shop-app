<template>
  <section class="car-description">
    <h3 class="description-title">Описание</h3>
    <VClamp class="description-text" ref="vClamp" autoresize :max-lines="8" tag="p" :expanded="isShowMore">{{ description }}</VClamp>
    <button class="description-btn" v-if="isClamped" type="button" @click="showMore">Показать полностью</button>
  </section>
</template>

<script>
import VClamp from 'vue-clamp';

export default {
  name: 'CarAbout',
  data() {
    return {
      isShowMore: false,
      isClamped: false,
    };
  },
  methods: {
    showMore() {
      this.isShowMore = !this.isShowMore;
    },
  },
  mounted() {
    this.isClamped = this.$refs.vClamp.isClamped;
  },
  props: {
    description: {
      type: String,
      default: 'Description',
    },
  },
  components: {
    VClamp,
  },
};
</script>

<style lang="scss" scoped>
.car-description {
  display: flex;
  flex-direction: column;

  padding: 24px;
  margin-top: 32px;

  background: #f2f7fa;
  border-radius: 4px;

  .description-title {
    font-size: 24px;
    font-weight: 500;
    line-height: 26px;
    color: #222329;
  }

  .description-text {
    font-size: 14px;
    line-height: 17px;
    color: #222329;
  }

  .description-btn {
    align-self: flex-end;
    border-bottom: 1px dashed #1768ac;

    font-size: 14px;
    line-height: 17px;
    color: #1768ac;
  }
}

@include xs {
  .car-description {
    .description-title {
      font-size: 18px;
      line-height: 20px;
    }
  }
}
</style>
