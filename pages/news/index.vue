<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1 class="mt-3 px-4">Новости</h1>
      <v-tabs class="px-4" v-model="tab" next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows background-color="#F2F7FA" height="38">
        <v-tab> Все </v-tab>
        <v-tab> Автомобильные новости </v-tab>
        <v-tab> Тест-драйвы </v-tab>
        <v-tab> Журнал </v-tab>
        <v-tab> Как подготовить авто к зиме </v-tab>
        <v-tab> Акции </v-tab>
        <v-tab> Обзоры </v-tab>
      </v-tabs>
      <div>
        <news-list :list="list.items" />
      </div>
      <div class="pagination-wrapper px-4">
        <pagination-bar
          :page="list.pagination.current_page"
          :visibleNumber="paginationVisible"
          @request-data="getCurrentPageNews($event)"
          :amount="list.pagination.total_pages"
          @input="getCurrentPageNews($event)"
        />
      </div>
    </div>
  </main>
</template>

<script>
//Components
import NewsList from '../../components/modules/news/NewsList.vue';
import PaginationBar from '../../components/base/PaginationBar';

export default {
  name: 'News',
  components: { NewsList, PaginationBar },
  data() {
    return {
      list: {
        pagination: {
          count: 0,
          current_page: 1,
          per_page: 12,
          total: 0,
          total_pages: 2,
        },
        items: [],
      },
      tab: null,
      paginationVisible: 6,
      params: {
        tag_id: 1,
        sort: 'count_view',
        order: 'asc',
      },
      loading: false,
    };
  },
  mounted() {
    if (this.$vuetify.breakpoint.xs) this.paginationVisible = 3;
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        const { news } = (await this.$services.news.getNewsList(this.params)).data;
        this.list.items = this.addBanners(news.data);
        this.list.pagination = news.pagination;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    getCurrentPageNews(currentPage) {
      this.params.page = currentPage;
      this.getList();
    },
    addBanners(list) {
      switch (true) {
        case list.length <= 4:
          list.splice(4, 0, 'banner');
          return list;
        case list.length > 4:
          list.splice(4, 0, 'banner');
          list.splice(9, 0, 'banner');
          return list;
        default:
          return list;
      }
    },
  },
  watch: {
    tab() {
      this.params.tag_id = this.tab;
      this.params.page = 1;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-left: 0;
  padding-right: 0;
  max-width: 1200px !important;
  .outer-wrap {
    min-height: calc(100vh - 200px);
  }
  .loader {
    flex-wrap: wrap;
  }
  .v-tabs {
    margin: 44px 0;
    .v-tab {
      font-weight: 500;
      font-size: 16px;
      line-height: 110%;
      max-height: 38px;
      color: #4a4d5c !important;
      width: auto;
      text-transform: none;
    }
    .v-tab--active {
      background: #1768ac;
      color: #ffffff !important;
    }
  }
  .pagination-wrapper {
    margin: 44px 0 76px 0;
  }
  @include sm {
    .pagination-wrapper {
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
            margin-right: auto;

            .v-pagination__navigation {
              margin-left: 0;
              margin-top: 0;
              margin-bottom: 0;
            }
          }
          & li:last-child {
            display: flex;
            margin-left: auto;

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
