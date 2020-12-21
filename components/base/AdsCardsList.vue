<template>
  <section :class="`${className} row no-gutters`">
    <h2 class="card-title">{{ title }}</h2>
    <ul class="card-list col-md-12 col-lg-10 pr-lg-1">
      <li :key="index" v-for="(item, index) in collection">
        <CatalogCardsPreview class="card-list-item" :collection="item" />
      </li>
    </ul>
    <div class="advertising col-md-12 col-lg-2 pl-lg-3"></div>
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
    className: {
      type: String,
      default: 'default',
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
  max-width: 160px;
  margin-left: auto;

  background: #d3d3d3;
  background-position-x: -16px;
  @media (max-width: 1264px) {
    max-width: 1024px;
  }
}

.mobile {
  .card-title {
    display: none;
  }

  .card-list {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    padding-right: 0 !important;
    flex: 0 0 100%;
    max-width: 100%;

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
          padding-top: 48%;
          width: 100%;
        }
      }

      ::v-deep .general {
        position: initial;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        padding: 48px 16px 20px 16px;

        border-radius: 0 4px 4px 4px;
        border-left: 1px solid #b1c4cd;
        border-top: 0;

        .stats {
          display: none;
        }

        .id {
          display: none;
        }

        .vin {
          left: 8px;
          right: auto;
        }
      }
    }
  }

  .advertising {
    display: none;
  }
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

  .mobile .card-list {
    grid-template-columns: 1fr 1fr;
  }
}

@include xs {
  .mobile .card-list {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 0;
  }

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
</style>
