<template>
  <main class="main container error-page">
    <div class="outer-wrap">
      <div class="d-flex wrap align-center error-page-info">
        <div class="d-flex error-page-info-image_container align-center">
          <p>4</p>
          <div>
            <img src="../assets/images/wheel.png" alt="image" />
          </div>
          <p>4</p>
        </div>
        <div class="error-page-info_container">
          <p>Страница не найдена</p>
          <span>Возможные причины:</span>
          <ul>
            <li>неверный URL страницы -</li>
            <li>проверьте его на наличие ошибок;</li>
            <li>страница не существует;</li>
            <li>страница временно недоступна или удалена</li>
          </ul>
        </div>
      </div>
      <div class="d-flex wrap-wrap error-page-navigation">
        <div>
          <p>Главная</p>
          <ul>
            <li><a href="/contacts">Контакты</a></li>
          </ul>
        </div>
        <div>
          <p>Каталог</p>
          <ul>
            <li><a href="/catalog">Все</a></li>
            <li><a href="/catalog?status=2">Новые</a></li>
            <li><a href="/catalog?status=1">Б/y</a></li>
            <li><a href="/catalog?status=3">Под пригон</a></li>
          </ul>
        </div>
        <div>
          <p>Новости</p>
          <ul>
            <li><a href="/news">Автомобильные новости</a></li>
            <li><a href="/news">Тест-драйвы</a></li>
            <li><a href="/news">Журнал</a></li>
            <li><a href="/news">Как подготовить авто к зиме</a></li>
            <li><a href="/news">Акции</a></li>
            <li><a href="/news">Обзоры</a></li>
          </ul>
        </div>
        <div v-if="isAuth">
          <p>Личный профиль</p>
          <ul>
            <li><a href="/">Основная информация </a></li>
            <li><a href="/">Мои объявления</a></li>
            <li><a href="/">Личный счет</a></li>
            <li><a href="/">Заказы и отчеты</a></li>
            <li><a href="/">Подписки</a></li>
            <li><a href="/">Избранное</a></li>
            <li><a href="/">Сообщения</a></li>
            <li><a href="/">Настройки</a></li>
          </ul>
        </div>
      </div>
    </div>
    <ads-cards-list class="error-page-ads_card" :collection="latestAds.products" />
  </main>
</template>

<script>
// components
import AdsCardsList from '~/components/base/AdsCardsList.vue';
//Mixins
import getAuthToken from '~/mixins/getAuthToken.js';

export default {
  layout: 'withoutBreadCrumbs',
  mixins: [getAuthToken],
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  data() {
    return {
      pageNotFound: 'Not Found',
      otherError: 'An error occurred',
      latestAds: [],
      isAuth: false,
    };
  },
  async mounted() {
    try {
      this.latestAds = (await this.$services.ads.getLatestAdsFor404()).data;
      this.isAuth = !!localStorage.token;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
  components: {
    AdsCardsList,
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  padding-top: 50px;
  @media (max-width: 960px) {
    padding-top: 12px;
  }
  &-ads_card {
    margin-bottom: 60px;
  }
  ul {
    padding: 0;
    li {
      text-align: left;
    }
    li:before {
      content: '•';
      margin-right: 6px;
    }
  }
  p {
    font-style: normal;
    text-align: left;
    font-weight: 500;
    color: #222329;
  }
  &-navigation {
    padding: 0 44px 24px 44px;
    margin: 60px 0 56px 0;
    border: 1px solid #d6e1e7;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    max-width: 858px;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      margin-top: 24px;
      @include sm {
        min-width: 160px;
      }
    }
    p {
      font-size: 18px;
      line-height: 110%;
      margin-bottom: 10px;
      color: #4a4d5c;
    }
    ul {
      li {
        font-weight: 500;
        font-size: 14px;
        line-height: 130%;
        margin: 6px 0;
        color: #4a4d5c;
      }
    }
  }
  &-info {
    width: 100%;
    max-width: 858px;
    justify-content: space-between;
    padding-right: 60px;
    p,
    span {
      font-family: Rubik, serif;
    }
    &-image_container {
      div {
        width: 155px;
        height: 155px;
        @media (max-width: 480px) {
          width: 120px;
          height: 120px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        font-size: 203.21px;
        line-height: 110%;
        color: #4a4d5c;
        @media (max-width: 480px) {
          font-size: 140px;
        }
      }
    }
    &_container {
      ul {
        padding-left: 5px;
      }
      @include sm {
        margin-top: 20px;
      }
      p {
        font-size: 20px;
        line-height: 110%;
        margin-bottom: 10px;
        padding-left: 5px;

        @include sm {
          text-align: center;
        }
      }
      span {
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 125%;
        text-align: left;
        padding-left: 5px;
      }
      ul {
        li {
          font-weight: normal;
          font-size: 14px;
          line-height: 125%;
          color: #222329;
        }
      }
    }
  }
  .outer-wrap {
    color: #000;
    background: #fff;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @include sm {
    .error-page-info {
      padding-right: 0;
      flex-direction: column;
    }
  }
}
</style>
