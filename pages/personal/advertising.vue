<template>
  <main class="main container">
    <h1>Мои объявления</h1>
    <div class="outer-wrap">
      <div class="sort_search d-flex">
        <v-tabs v-model="tab" show-arrows background-color="#F2F7FA" height="38">
          <v-tab> Опубликовано </v-tab>
          <v-tab> Архив </v-tab>
        </v-tabs>
        <v-text-field v-model="search" color="#4CAD33" placeholder="Поиск" prepend-inner-icon="mdi-magnify" outlined dense height="36" class="sort_search-input"></v-text-field>
      </div>
      <div class="actions">
        <div class="actions-checkbox">
          <v-checkbox color="#4CAD33" label="Все" :ripple="false" hide-details class="check-box" v-model="isSelectedAll" @click="selectAll"></v-checkbox>
        </div>
        <div class="actions-other">
          <v-btn :disabled="selectedAds && !selectedAds.length" @click="deleteAds">Удалить</v-btn>
          <v-btn :disabled="selectedAds && !selectedAds.length" v-if="tab" @click="toPublishAds">Опубликовать</v-btn>
          <v-btn :disabled="selectedAds && !selectedAds.length" v-else @click="toInactiveAds">Снять с публикации</v-btn>
        </div>
      </div>
      <div class="ads_list">
        <ul v-if="list.products" class="catalog-list">
          <li class="mt-3" :key="index" v-for="(item, index) in list.products.data">
            <v-checkbox color="#4CAD33" :ripple="false" hide-details class="check-box" v-model="selectedAds" :value="item.id"></v-checkbox>
            <ads-card :collection="item" :extends_view="true" :isMobile="isMobile" />
          </li>
        </ul>
      </div>
      <div class="pagination-wrapper">
        <pagination-bar
          v-if="pagination.current_page && pagination.last_page > 1"
          :page="pagination.current_page"
          :visibleNumber="isMobile ? 3 : 6"
          :amount="pagination.last_page"
          @request-data="getCurrentPageNews($event)"
          @input="getCurrentPageNews($event)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import AdsCard from '@/components/modules/personal/AdsCard';
import PaginationBar from '@/components/base/PaginationBar';
import CheckBox from '@/components/base/CheckBox';

export default {
  name: 'Advertising',
  layout: 'personal',
  components: { AdsCard, PaginationBar, CheckBox },
  data() {
    return {
      tab: null,
      search: '',
      isSelectedAll: false,
      list: [],
      pagination: {},
      selectedAds: [],
      params: {
        search: null,
        page: 1,
        active: 1,
      },
    };
  },
  watch: {
    search() {
      this.params.search = this.search ? this.search : null;
      this.getAdsList();
    },
    tab() {
      this.params.active = !this.tab ? 1 : 0;
      this.getAdsList();
    },
  },
  methods: {
    async getAdsList() {
      try {
        this.list = (await this.$services.user.getUserAds(this.params)).data;
        this.pagination.current_page = this.list.products.current_page;
        this.pagination.last_page = this.list.products.last_page;
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
      this.selectedAds = [];
      this.isSelectedAll
        ? this.list.products.data.forEach((product) => {
            this.selectedAds.push(product.id);
          })
        : (this.selectedAds = []);
    },
    async deleteAds() {
      try {
        let params = {
          ids: this.selectedAds,
        };
        await this.$services.user.deleteUserAds(params);
      } catch (error) {
        console.log(error);
      }
    },
    async toPublishAds() {
      let params = {
        ids: this.selectedAds,
        active: 1,
      };
      try {
        await this.$services.user.toPublishOrInactiveUserAds(params);
        await this.getAdsList();
      } catch (error) {
        console.log(error);
      }
    },
    async toInactiveAds() {
      let params = {
        ids: this.selectedAds,
        active: 0,
      };
      try {
        await this.$services.user.toPublishOrInactiveUserAds(params);
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
  @include desktop {
    padding: 0 0 40px 0;
  }
  .outer-wrap {
    width: 100%;
    .catalog-list {
      .check-box {
        position: absolute;
        top: 12px;
        left: 12px;
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
    .actions {
      display: flex;
      align-items: center;
      @include mobile {
        flex-direction: column;
        align-items: flex-start;
      }
      &-checkbox {
        padding-right: 20px;
        border-right: 1px solid #b1c4cd;
        @include mobile {
          border-right: none;
        }
      }
      &-other {
        @include mobile {
          flex-direction: column;
          margin-top: 12px;
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
            padding-left: 0;
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
    .catalog-list {
      li {
        position: relative;
      }
    }
  }
}
</style>
