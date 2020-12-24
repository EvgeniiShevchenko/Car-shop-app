<template>
  <div class="subscriptions">
    <h1 class="subscriptions-title">Подписки</h1>
    <div class="subscriptions-general mt-6">
      <nav>
        <ul class="navigations-list">
          <li class="navigations-list-item" :key="index" v-for="(item, index) in tabList">
            <button :class="`navigations-item-link ${item.id === selectTab ? 'is-select' : ''}`" type="button" @click="changeTab(item.id)">{{ item.text }}</button>
          </li>
        </ul>
      </nav>
    </div>
    <transition name="fade">
      <div class="catalog-subscriptions" v-if="selectTab === 1">
        <n-link class="subscriptions-create-btn" to="/personal/subscriptions/create" tag="button">
          <svg class="create-btn-icon">
            <use xlink:href="~assets/images/sprites/global.svg#plus-18" />
          </svg>
          Создать новую рассылку
        </n-link>
        <ul class="subscriptions-list" v-if="subscriptionsShowList.length">
          <SubscriptionsItem :key="index" v-for="(item, index) in subscriptionsShowList" :collection="item" @unsubscribe="deleteSubscriptions" />
        </ul>
        <div class="subscriptions-empty mt-5" v-else>Подписок пока ещё нет</div>
        <PaginationBar
          class="pagination-wrapper"
          v-if="subscriptionsList.length > maxCardsOnPage"
          :page="page"
          :amount="amountPages"
          :visibleNumber="visibleNumber"
          :paginationId="paginationId"
          @request-data="requestPageData($event)"
          @input="requestPageData($event)"
        />
      </div>
    </transition>
    <transition name="fade">
      <SubscriptionsNews v-if="selectTab === 2" />
    </transition>
  </div>
</template>

<script>
// components
import SubscriptionsItem from '~/components/modules/subscriptions/SubscriptionsItem.vue';
import SubscriptionsNews from '~/components/modules/subscriptions/SubscriptionsNews.vue';
import PaginationBar from '~/components/base/PaginationBar.vue';

export default {
  name: 'subscriptions',
  layout: 'personal',
  data() {
    return {
      subscriptionsShowList: [],
      subscriptionsList: [],
      tabList: [
        { text: 'Рассылка AutoSill', id: 1 },
        { text: 'Новостная рассылка', id: 2 },
      ],
      selectTab: 1,
      page: 1,
      amountPages: null,
      visibleNumber: 6,
      maxCardsOnPage: 10,
      paginationId: 'subscriptions-pagin',
    };
  },
  methods: {
    deleteSubscriptions(subscriptionId) {
      try {
        this.subscriptionsList = this.subscriptionsList.filter((item) => item.id !== subscriptionId);
        this.requestPageData(this.page);
        this.amountPages = Math.ceil(this.subscriptionsList.length / this.maxCardsOnPage);

        this.$services.user.deleteUserSubscriptions(subscriptionId);
      } catch (error) {
        console.error(error);
      }
    },

    requestPageData(pageNumber) {
      this.page = pageNumber;
      this.subscriptionsShowList = [...this.subscriptionsList.slice((this.page - 1) * this.maxCardsOnPage, pageNumber * this.maxCardsOnPage)];
    },

    changeTab(tabId) {
      this.selectTab = tabId;
    },
  },
  async mounted() {
    if (this.$vuetify.breakpoint.xs) this.visibleNumber = 3;

    try {
      this.$nextTick(async () => {
        this.subscriptionsList = (await this.$services.user.getUserSubscriptions()).data.newsletters;
        this.subscriptionsShowList = [...this.subscriptionsList.slice((this.page - 1) * this.maxCardsOnPage, this.maxCardsOnPage)];

        this.amountPages = Math.ceil(this.subscriptionsList.length / this.maxCardsOnPage);
      });
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    SubscriptionsItem,
    PaginationBar,
    SubscriptionsNews,
  },
};
</script>

<style lang="scss" scoped>
.subscriptions {
  padding-bottom: 70px;
  width: 100%;
  @include init-font;

  .title-xxxl {
    @include init-title(#222329, 32px, 500, 35px);
  }

  .subscriptions-title {
    @extend .title-xxxl;
  }

  .subscriptions-general {
    display: flex;
    justify-content: space-between;

    .navigations-list {
      display: flex;
      gap: 8px 0;

      .navigations-list-item {
        .navigations-item-link {
          height: 38px;
          padding: 0 20px;
          background: #ffffff;
          @include init-title(#4a4d5c, 16px, 500, 18px);
          transition: all 1s ease;

          &:hover {
            background: #1768ac;
            color: #ffffff;
          }
        }

        .is-select {
          background: #1768ac;
          color: #ffffff;

          &:hover {
            background: #0e4c80;
          }
        }
      }
    }
  }

  .catalog-subscriptions {
    display: flex;
    flex-direction: column;
    margin-top: 24px;

    .subscriptions-create-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: flex-end;

      padding: 0 23px 0 26px;

      height: 44px;
      max-width: max-content;

      background: #4cad33;
      @include init-title(#ffffff, 15px, 500, 15px);

      &:hover {
        background: #2ca00d;
      }

      .create-btn-icon {
        margin-right: 13px;
        width: 18px;
        height: 18px;
        fill: #ffffff;
      }
    }

    .subscriptions-list {
      margin-top: 24px;
    }

    .subscriptions-empty {
      text-align: center;
    }

    .pagination-wrapper {
      margin-top: 24px;
    }
  }
}

@include xs {
  .subscriptions {
    .title-xxxl {
      font-size: 22px;
      line-height: 24px;
    }

    .subscriptions-general {
      flex-direction: column;
    }

    .catalog-subscriptions {
      margin-top: 20px;

      .subscriptions-list {
        ::v-deep .subscriptions-item {
          .subscriptions-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;

            .bar-btn-wrapper {
              display: flex;
              flex-direction: column;
              gap: 16px;

              .unsubscribe-btn {
                max-width: max-content;
              }

              .edit-btn {
                margin: 0;
              }
            }
          }
        }
      }

      .subscriptions-create-btn {
        align-self: flex-start;
      }

      ::v-deep .pagination {
        justify-content: center;

        .prev-btn {
          display: none;
        }

        .v-pagination {
          .v-pagination__navigation {
            border-radius: 2px;
            border: 1px solid #222329;
            box-shadow: none;

            .v-icon {
              color: #222329;
            }
          }

          & li:first-child {
            display: flex;

            .v-pagination__navigation {
              margin-left: 0;
              margin-top: 0;
              margin-bottom: 0;
            }
          }

          & li:last-child {
            display: flex;

            .v-pagination__navigation {
              margin-right: 0;
              margin-top: 0;
              margin-bottom: 0;
            }
          }
        }

        .next-btn {
          display: none;
        }
      }
    }
  }
}
</style>

<style>
::v-deep .breadcrumb {
  display: none;
}
</style>
