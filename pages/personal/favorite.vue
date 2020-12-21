<template>
  <main class="main container">
    <h1>Избранные объявления</h1>
    <div class="outer-wrap">
      <div class="actions_container">
        <div class="actions">
          <div class="actions-checkbox">
            <v-checkbox color="#4CAD33" label="Все" :ripple="false" hide-details class="check-box" v-model="isSelectedAll" @click="selectAll"></v-checkbox>
          </div>
          <div class="actions-other">
            <v-btn :disabled="selectedAds && !selectedAds.length" @click="deleteAds">Удалить</v-btn>
          </div>
        </div>
        <div>
          <v-text-field v-model="search" height="36" color="#4CAD33" placeholder="Поиск" prepend-inner-icon="mdi-magnify" hide-details outlined dense class="sort_search-input"></v-text-field>
        </div>
      </div>
      <div class="ads_list">
        <ul v-if="list.wishlists && list.wishlists.data && list.wishlists.data.length" class="catalog-list">
          <li class="mt-3" :key="product.id" v-for="product of list.wishlists.data">
            <v-checkbox color="#4CAD33" :ripple="false" hide-details class="check-box" v-model="selectedAds" :value="product.id"></v-checkbox>
            <catalog-cards-preview :collection="product" :extends_view="true" :isMobile="isMobile" class="catalog-item" />
          </li>
        </ul>
      </div>
      <div class="pagination-wrapper">
        <pagination-bar
          v-if="pagination.current_page && pagination.last_page > 1"
          :page="pagination.current_page"
          :visibleNumber="6"
          :amount="pagination.last_page"
          @request-data="getCurrentPageNews($event)"
          @input="getCurrentPageNews($event)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import PaginationBar from '@/components/base/PaginationBar';
import CatalogCardsPreview from '@/components/base/CatalogCardsPreview';

export default {
  name: 'Favorite',
  layout: 'personal',
  components: { PaginationBar, CatalogCardsPreview },
  data() {
    return {
      search: '',
      isSelectedAll: false,
      list: [],
      pagination: {},
      selectedAds: [],
      params: {
        search: null,
        page: 1,
      },
    };
  },
  mounted() {
    this.getAdsList();
  },
  watch: {
    search() {
      this.params.search = this.search ? this.search : null;
      this.getAdsList();
    },
  },
  methods: {
    async getAdsList() {
      try {
        this.list = (await this.$services.user.getUserFavorite(this.params)).data;
        this.pagination.current_page = this.list.wishlists.current_page;
        this.pagination.last_page = this.list.wishlists.last_page;
        this.isSelectedAll = false;
        this.selectedAds = [];
      } catch (error) {
        console.log(error);
      }
    },
    getCurrentPageNews(currentPage) {
      this.params.page = currentPage;
      this.getAdsList();
    },
    selectAll() {
      if (!this.list.wishlists || !this.list.wishlists.data || !this.list.wishlists.data.length) return;
      this.selectedAds = [];
      this.isSelectedAll
        ? this.list.wishlists.data.forEach((product) => {
            this.selectedAds.push(product.id);
          })
        : (this.selectedAds = []);
    },
    async deleteAds() {
      try {
        let params = {
          ids: this.selectedAds,
        };
        await this.$services.user.deleteUserFavorite(params);
        await this.getAdsList();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 0;
  padding-bottom: 70px;
  .outer-wrap {
    width: 100%;
    @include desktop {
      padding: 0 0 40px 0;
    }
    .catalog-list {
      .check-box {
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 999;
        ::v-deep .v-input__control .v-input--selection-controls__input .v-icon {
          font-size: 33px;
          border-radius: 4px;
        }
      }
    }
    .pagination-wrapper {
      margin-top: 20px;
    }
    .sort_search {
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 41px 0 0 0;
      width: 100%;
      @include mobile {
        flex-direction: column;
      }
      &-input {
        max-width: 222px;
        @include mobile {
          margin-top: 20px;
          max-width: 100%;
        }
      }
      .v-tabs {
        max-width: fit-content;
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
    }
    .actions_container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 36px 0 24px 0;
      @include mobile {
        flex-direction: column-reverse;
        align-items: flex-start;
        .v-input {
          margin-top: 0;
          margin-bottom: 16px;
          width: 100%;
        }
      }
      .actions {
        display: flex;
        align-items: center;
        &-checkbox {
          padding-right: 20px;
          border-right: 1px solid #b1c4cd;
          @include mobile {
            .check-box {
              margin-bottom: 0;
            }
          }
        }
        &-other {
          @include mobile {
            flex-direction: column;
          }
          .theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
            background-color: #ffffff !important;
          }
          button {
            background-color: #ffffff !important;
            border: none;
            box-shadow: none;
            padding-right: 0;
            @include mobile {
              display: block;
            }
            &:hover {
              background-color: #ffffff;
            }
            &:before {
              background-color: #ffffff;
            }
          }
        }
      }
    }
    .catalog-list {
      li {
        position: relative;
      }
    }
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
@include xs {
  .catalog-list {
    margin-bottom: 35px;

    & li:first-child {
      margin-top: 0 !important;

      .catalog-item {
        margin-top: 0;
      }
    }

    .catalog-item {
      position: relative;
      flex-direction: column;
      max-height: max-content;
      height: 100%;

      ::v-deep .preview-wrapper {
        position: relative;
        max-width: 100%;

        border-radius: 4px 4px 0 0;

        &::before {
          display: block;
          content: '';

          /*Aspect ratio 16:9 */
          padding-top: 77%;
          width: 100%;
        }
      }

      ::v-deep .general {
        position: initial;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        border-radius: 0 4px 4px 4px;
        border-left: 1px solid #b1c4cd;
        border-top: 0;

        .id {
          display: none;
        }

        .stats {
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;

          .icon-wrapper {
            width: 20px;
          }

          & div:first-child {
            margin-top: 0;
          }

          & > div {
            margin-top: 9px;
          }
        }

        .vin {
          left: auto;
          right: 8px;
        }
      }
    }
  }
}
</style>
