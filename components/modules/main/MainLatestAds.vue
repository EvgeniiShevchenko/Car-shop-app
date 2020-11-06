<template>
  <section>
    <div class="row no-gutters">
      <h2 class="latest-title">Свежие объявления</h2>
      <ul class="latest-ads-list col-md-12 col-lg-10 pr-lg-3">
        <li :key="index" v-for="(item, index) in latestAds">
          <CatalogCardsPreview class="latest-ads-item" :collection="item" />
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
  name: 'MainLatestAds',
  data() {
    return {
      latestAds: [],
    };
  },
  async mounted() {
    const { products } = this.mainData;

    this.latestAds = products;
  },
  props: {
    mainData: {
      type: Object,
      required: true,
    },
  },
  components: {
    CatalogCardsPreview,
  },
};
</script>

<style lang="scss" scoped>
.latest-title {
  margin-bottom: 42px;

  font-size: 32px;
  font-weight: 500;
  line-height: 35px;
  color: #222329;
}

.latest-ads-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 170px;
  gap: 32px;

  .latest-ads-item {
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
  .latest-ads-list {
    margin-bottom: 72px;
  }
}

@include sm {
  .latest-ads-list {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 32px;
  }
}

@include xs {
  .latest-ads {
    .latest-title {
      font-size: 30px;
      line-height: 33px;
    }

    .latest-ads-list {
      margin-bottom: 35px;

      .latest-ads-item {
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
