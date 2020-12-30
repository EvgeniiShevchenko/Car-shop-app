<template>
  <li class="subscriptions-item">
    <p class="item-date">Рассылка от {{ collection.date }}</p>
    <h3 class="item-title mt-2">Подписка авто</h3>
    <ul class="item-tags-list mt-2" @click="toggleTagsShow" v-if="collection.info.length">
      <li class="tags-list-item" :key="index" v-for="(item, index) in isShowTags ? collection.info : collection.info.slice(0, maxShowTags)">{{ item }}</li>
      <button class="tags-item-more-btn" type="button" v-if="!isShowTags && collection.info.length > maxShowTags">...</button>
    </ul>
    <div class="subscriptions-bar">
      <p class="bar-offers-title">
        Всего предложений<span class="offers-title-link">{{ `${collection.products}` }} авто</span>
      </p>
      <div class="bar-btn-wrapper">
        <button class="unsubscribe-btn" type="button" @click="$emit('unsubscribe', collection.id)">Отписаться</button>
        <n-link class="edit-btn" tag="button" :to="`/personal/subscriptions/edit-${collection.id}`">Редактировать рассылку</n-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SubscriptionsItem',
  data() {
    return {
      isShowTags: false,
      maxShowTags: 8,
    };
  },
  computed: {
    getAmountRestTags() {
      return this.collection.info.length > this.maxShowTags ? this.collection.info.length - this.maxShowTags : 0;
    },
  },
  methods: {
    toggleTagsShow() {
      this.isShowTags = !this.isShowTags;
    },
  },
  props: {
    collection: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.subscriptions-item {
  padding: 16px;
  width: 100%;

  border: 1px solid #d6e1e7;
  border-radius: 4px;
  text-align: left;

  .title-xl {
    @include init-title(#4a4d5c, 20px, 500, 22px);
  }

  .item-date {
    @include init-title(#70848e, 13px, 400, 16px);
  }
  .item-title {
    @extend .title-xl;
  }

  .item-tags-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 12px;
    gap: 8px;

    box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

    .tags-list-item {
      padding: 2px 4px;
      @include init-title(#4a4d5c, 13px, 400, 16px);

      background: #d5ebfd;
      border-radius: 2px;
    }

    .tags-item-more-btn {
      position: relative;
      color: #000000;

      &::before {
        position: absolute;
        content: '';

        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
      }
    }
  }

  .subscriptions-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 17px;

    .bar-offers-title {
      @include init-title(#70848e, 13px, 400, 16px);

      .offers-title-link {
        display: block;

        @include init-title(#4a4d5c, 16px, 500, 18px);
      }
    }

    .bar-btn-wrapper {
      .unsubscribe-btn {
        @include init-title(#70848e, 14px, 400, 17px);
        border-bottom: dashed 0.7px #70848e;

        &:hover {
          color: #1768ac;
        }
      }

      .edit-btn {
        margin-left: 20px;
        padding: 0 20px;
        height: 43px;

        border-radius: 2px;
        border: 1px solid #4a4d5c;

        @include init-title(#4a4d5c, 15px, 500, 15px);

        &:hover {
          background: #f2f7fa;
        }
      }
    }
  }
}

@include xs {
  .title-xl {
    font-size: 16px;
    line-height: 18px;
  }
}
</style>
