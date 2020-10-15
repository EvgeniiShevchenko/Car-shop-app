<template>
  <section>
    <div class="row no-gutters">
      <h2 class="latest-title">Свежие объявления</h2>
      <ul class="latest-ads-list col-md-12 col-lg-10 pr-lg-3">
        <li :key="index" v-for="(item, index) in latestAds">
          <CatalogCardsPreview class="latest-ads-item" />
        </li>
      </ul>
      <div class="advertising col-md-12 col-lg-2 pl-lg-3"></div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
// components
import CatalogCardsPreview from '~/components/base/CatalogCardsPreview.vue';

export default {
  name: 'MainLatestAds',
  data() {
    return {
      latestAds: [...Array(8).keys()],
    };
  },
  async mounted() {
    try {
      // const { data } = await axios.get('http://localhost:8000/api/main', { method: 'GET' });
    } catch (error) {
      console.error(error);
    }
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
  .latest-ads-list {
    .latest-ads-item {
      flex-direction: column;
      max-height: max-content;

      ::v-deep .preview-wrapper {
        position: relative;
        max-width: 100%;

        &::before {
          display: block;
          content: '';

          /*Aspect ratio 16:9 */
          padding-top: 77%;
          width: 100%;
        }

        .preview {
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
