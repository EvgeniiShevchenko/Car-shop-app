<template>
  <section class="feedback">
    <h3 class="feedback-title">Удобно ли вам пользоваться нашим фильтром?</h3>
    <p class="feedback-info">Мы очень старались сделать систему фильтрации гибкой и удобной, чтобы облегчить Ваши поиски.</p>
    <ul class="feedback-list">
      <li class="feedback-item" :key="index" v-for="(item, index) in feedbackList">
        <button :class="`item-btn is-${item[1]}`" @click="$emit('send-rating', item[2])">
          <svg class="btn-icon">
            <use :xlink:href="require('~/assets/images/sprites/catalog.svg') + `#${item[1]}`" />
          </svg>
          <span class="btn-text">{{ item[0] }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'CatalogFeedback',
  data() {
    return {
      feedbackList: [
        ['Отлично', 'recall-smile', 1],
        ['Нормально', 'recall-neutral', 2],
        ['Плохо', 'recall-sad', 3],
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.feedback {
  padding: 20px;

  border-radius: 8px;
  background: #d5ebfd;

  .feedback-title {
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
  }

  .feedback-info {
    margin: 12px 0 15px 0;

    font-size: 13px;
    line-height: 16px;
  }

  .feedback-list {
    display: flex;

    & li:first-child {
      margin-left: 0;
    }

    .feedback-item {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-left: 12px;

      max-width: 70px;
      width: 100%;

      .item-btn {
        display: flex;
        flex-direction: column;
        align-items: center;

        .btn-icon {
          width: 34px;
          height: 34px;

          fill: #484e61;
        }

        .btn-text {
          margin-top: 4px;

          font-size: 13px;
          line-height: 16px;
        }
      }

      .is-recall-smile:hover {
        .btn-icon {
          fill: #4cad33;
        }

        .btn-text {
          color: #4cad33;
        }
      }

      .is-recall-neutral:hover {
        .btn-icon {
          fill: #1768ac;
        }

        .btn-text {
          color: #1768ac;
        }
      }

      .is-recall-sad:hover {
        .btn-icon {
          fill: #f05156;
        }

        .btn-text {
          color: #f05156;
        }
      }
    }
  }
}
</style>
