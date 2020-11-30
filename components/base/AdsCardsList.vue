<template>
  <section>
    <div class="row no-gutters">
      <h2 class="card-title">{{ title }}</h2>
      <ul class="card-list col-md-12 col-lg-10 pr-lg-3">
        <li :key="index" v-for="(item, index) in collection">
          <CatalogCardsPreview class="card-list-item" :collection="item" />
        </li>
      </ul>
      <div class="advertising col-md-12 col-lg-2 pl-lg-3"></div>
    </div>
  </section>
</template>

<script>
// components
import CatalogCardsPreview from '~/components/base/CatalogCardsPreview.vue';

export default {
  name: 'AdsCardsList',
  props: {
    title: {
      type: String,
      default: 'Свежие объявления',
    },
    collection: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CatalogCardsPreview,
  },
};
</script>

<style lang="scss" scoped>
.card-title {
  margin-bottom: 42px;

  font-size: 32px;
  font-weight: 500;
  line-height: 35px;
  color: #222329;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 170px;
  gap: 32px;

  .card-list-item {
    display: flex;
    max-height: 170px;
  }
}

.advertising {
  min-height: 90px;
  max-height: 100%;

  background: #d3d3d3;
  background-position-x: -16px;
}

@include widescreen {
  .card-list {
    margin-bottom: 72px;
  }
}

@include sm {
  .card-list {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 32px;
  }
}

@include xs {
  .latest-ads {
    .card-title {
      font-size: 30px;
      line-height: 33px;
    }

    .card-list {
      margin-bottom: 35px;

      .card-list-item {
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

          .vin {
            left: 8px;
            right: auto;
          }
        }
      }
    }
  }
}
</style>
