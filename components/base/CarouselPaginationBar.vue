<template>
  <div class="pagination-wrapper">
    <slot name="default"></slot>
    <div class="pagination">
      <button :class="`prev-btn ${isDisabledPrev ? 'is-disabled' : ''}`" :disabled="isDisabledPrev" type="button" @click="$emit('go-prev')">
        <svg class="arrow-icon">
          <use xlink:href="~assets/images/sprites/main.svg#icon-pagination-prev" />
        </svg>
      </button>
      <button :class="`next-btn ${isDisabledNext ? 'is-disabled' : ''}`" :disabled="isDisabledNext" type="button" @click="$emit('go-next')">
        <svg class="arrow-icon">
          <use xlink:href="~assets/images/sprites/main.svg#icon-pagination-prev" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselPaginationBar',
  props: {
    isDisabledNext: {
      type: Boolean,
      default: false,
    },
    isDisabledPrev: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  position: absolute;
  display: flex;
  align-items: center;

  top: 8px;
  right: 5px;

  .pagination {
    display: flex;
    margin-left: 36px;

    .prev-btn {
      display: flex;
      align-items: center;
      justify-content: center;

      .arrow-icon {
        width: 24px;
        height: 16px;

        fill: #8fa5b0;

        &:hover {
          fill: #79ca64;
        }
      }
    }

    .next-btn {
      @extend .prev-btn;

      .arrow-icon {
        margin-left: 36px;

        width: 24px;
        height: 16px;
        transform: rotate(180deg);
      }
    }

    .is-disabled {
      .arrow-icon {
        fill: #d6e1e7;

        &:hover {
          fill: #d6e1e7;
        }
      }
    }
  }
}
</style>
