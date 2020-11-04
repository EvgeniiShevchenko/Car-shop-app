<template>
  <div class="about row no-gutters">
    <div class="description-wrapper col-md-6 pr-md-3">
      <h2 class="about-title">О площадке AutoSill</h2>
      <p class="about-description mb-4">
        AutoSill.ua — наиболее крупный авто базар Украины среди всех отечественных сайтов подобного рода. В намерении помочь как покупателям транспортных средств, так и желающим их продать, мы
        разработали удобный и масштабный ресурс, представленный в виде доски онлайн-объявлений.
      </p>
      <p class="about-description mb-md-4 mb-lg-0">
        AutoSill.ua — наиболее крупный авто базар Украины среди всех отечественных сайтов подобного рода. В намерении помочь как покупателям транспортных средств, так и желающим их продать, мы
        разработали удобный и масштабный ресурс, представленный в виде доски онлайн-объявлений.
      </p>
    </div>
    <div class="about-icon-wrapper col-md-6 pl-md-3">
      <img class="about-icon" src="~/assets/images/about-autosill.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainAbout',
};
</script>

<style lang="scss" scoped>
.about {
  .description-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .about-title {
      margin-bottom: 24px;

      font-size: 32px;
      font-weight: 500;
      line-height: 35px;
      color: #222329;
    }

    .about-description {
      margin-bottom: 0;
      font-size: 14px;
      line-height: 18px;
    }
  }
  .about-icon-wrapper {
    .about-icon {
      width: 100%;
      height: 100%;
    }
  }
}

@include sm {
  .about {
    margin-bottom: 32px;

    .description-wrapper {
      .about-title {
        font-size: 30px;
        line-height: 33px;
      }

      margin-bottom: 16px;
    }
  }
}
</style>
