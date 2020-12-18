<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1 class="mt-3">О нас</h1>
      <main-comunity class="mt-8" :communityInfo="info.community" />
      <div class="col-md-8 pr-md-3 col-xl-8 pr-xl-3">
        <div v-if="info.static_info" v-html="info.static_info.description"></div>
      </div>
      <horizontal-banner class="banner" />
    </div>
  </main>
</template>

<script>
//Components

import MainComunity from '@/components/modules/main/MainComunity';
import HorizontalBanner from '@/components/modules/banners/HorizontalBanner';

export default {
  name: 'about_us',
  components: { MainComunity, HorizontalBanner },
  data() {
    return {
      info: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        this.info = (await this.$services.user.getAboutUsInfo()).data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  .banner {
    margin-top: 52px;
    margin-bottom: 72px;
  }
  ::v-deep h3 {
    color: #222329;
    font-size: 20px;
  }
}
</style>
