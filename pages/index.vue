<template>
  <main class="main container">
    <div class="row no-gutters">
      <div class="filter-wrapper row">
        <MainBaner class="banner-wrapper col-sm-12 col-md-6" />
        <div class="col-sm-12 col-md-6">
          <MainFilter />
        </div>
      </div>
      <div class="banner-block offset-lg-1 col-md-12 col-lg-10 offset-lg-1"></div>
      <MainLatestAds class="latest-ads" :mainData="mainData" />
      <MainCarCatalog :mainData="mainData" />
      <MainNews class="news-wrapper" :mainData="mainData" />
      <MainComunity />
      <div class="banner-block offset-lg-1 col-md-12 col-lg-10 offset-lg-1"></div>
      <MainAbout />
    </div>
  </main>
</template>

<script>
// components
import MainFilter from '~/components/modules/main/MainFilter.vue';
import MainLatestAds from '~/components/modules/main/MainLatestAds.vue';
import MainAbout from '~/components/modules/main/MainAbout.vue';
import MainNews from '~/components/modules/main/MainNews.vue';
import MainCarCatalog from '~/components/modules/main/MainCarCatalog.vue';
import MainComunity from '~/components/modules/main/MainComunity.vue';
import MainBaner from '~/components/modules/main/MainBaner.vue';

export default {
  name: 'Index',
  async asyncData({ $axios }) {
    const { data } = await $axios.$get(`main`);

    return { mainData: data };
  },
  components: {
    MainFilter,
    MainLatestAds,
    MainAbout,
    MainNews,
    MainCarCatalog,
    MainComunity,
    MainBaner,
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 76px;

  flex: 1;

  .filter-wrapper {
    position: relative;
    min-height: 529px;

    z-index: 2;

    &::before {
      position: absolute;
      content: '';

      top: 0;
      left: -102px;
      right: 0;
      bottom: 0;

      background: url('~assets/images/main-banner-car.png') no-repeat, url('~assets/images/main-banner-bg.png') no-repeat;
      background-position: 40px 210px, 0 -29px;
      z-index: -1;
    }
  }

  .latest-ads {
    margin-bottom: 72px;
    width: 100%;
  }

  .banner-block {
    margin-bottom: 72px;
    min-height: 90px;
    background: #d3d3d3;
  }
}

@include sm {
  .main .filter-wrapper {
    margin-bottom: 72px;

    &::before {
      content: none;
    }

    .banner-wrapper {
      margin-bottom: 50px;
    }
  }
}

@include xs {
  .main {
    .filter-wrapper {
      margin-bottom: 35px;

      .banner-wrapper {
        margin-bottom: 25px;
      }
    }

    .banner-block {
      margin-bottom: 25px;
    }

    .latest-ads {
      margin-bottom: 25px;
    }

    .news-wrapper {
      margin-bottom: 25px;
    }
  }
}
</style>
