<template>
  <div class="pagination">
    <button :class="`prev-btn ${currentPage === 1 ? 'is-disabled' : ''}`" :disabled="currentPage === 1" type="button" @click="prev">
      <svg class="prev-btn-icon">
        <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
      </svg>
      Назад
    </button>
    <v-pagination :id="paginationId" :length="amount" :ref="paginationId" :total-visible="visibleNumber" :value="currentPage" @input="handlerSelectPage"></v-pagination>
    <button :class="`next-btn ${currentPage === amount ? 'is-disabled' : ''}`" :disabled="currentPage === amount" type="button" @click="next">
      Вперед
      <svg class="next-btn-icon">
        <use xlink:href="~assets/images/sprites/main.svg#icon-select-mark" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationBar',
  data() {
    return {
      currentPage: this.page,
    };
  },
  methods: {
    next() {
      this.currentPage += 1;

      this.$emit('request-data', this.currentPage);
    },

    prev() {
      this.currentPage -= 1;

      this.$emit('request-data', this.currentPage);
    },

    handlerSelectPage(page) {
      this.currentPage = page;

      this.$emit('input', page);
    },
  },
  props: {
    isDisabledNext: {
      type: Boolean,
      default: false,
    },
    isDisabledPrev: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    amount: {
      type: Number,
      default: 1,
    },
    paginationId: {
      type: String,
      default: 'pagination-id',
    },
    visibleNumber: {
      type: Number,
      default: 6,
    },
  },
  watch: {
    page() {
      this.currentPage = this.page;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .prev-btn {
    display: flex;
    align-items: center;

    padding: 0 20px 0 28px;

    height: 36px;

    border-radius: 2px;
    border: 1px solid #222329;

    font-weight: 500;
    font-size: 15px;

    &:hover {
      background: #f2f7fa;
    }

    .prev-btn-icon {
      width: 12px;
      height: 8px;
      margin-right: 18px;
      transform: rotate(90deg);
    }
  }

  ::v-deep .v-pagination {
    .v-pagination__more {
      @media (max-width: 480px) {
        max-width: 16px;
      }
    }
    & li:first-child {
      display: none;
    }

    & li:last-child {
      display: none;
    }

    .is-change-order {
      order: 1;
    }

    .v-pagination__item {
      border-radius: 2px;
      border: 1px solid #b1c4cd;
      box-shadow: none;

      font-size: 15px;
      font-weight: 500;
      line-height: 17px;
      color: #4a4d5c;

      &:hover {
        background: #f2f7fa;
      }
    }

    .v-pagination__item--active {
      background-color: transparent !important;
      border: 1px solid #1768ac;

      color: #1768ac;

      &:hover {
        background-color: #f2f7fa !important;
      }
    }
  }

  .next-btn {
    @extend .prev-btn;
    padding: 0 28px 0 20px;

    .next-btn-icon {
      width: 12px;
      height: 8px;
      margin-left: 18px;
      transform: rotate(-90deg);
    }
  }

  .is-disabled {
    opacity: 0.6;
  }
}
</style>
