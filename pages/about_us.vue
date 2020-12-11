<template>
  <main class="main container">
    <div class="outer-wrap">
      <h1 class="mt-3">О нас</h1>
      <main-comunity class="mt-8" :communityInfo="info.community" />
      <div v-if="info.static_info" v-html="info.static_info.description"></div>
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
        console.log('info', this.info)
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  .banner {
    margin-top: 52px;
    margin-bottom: 72px;
  }
}
</style>
