<template>
  <div class="layout">
    <header class="header">
      <nuxt-link class="header-logo" to="/">
        <img class="header-logo-icon" src="~assets/images/logo-header.png" alt="Logo">
      </nuxt-link>
      <nav class="navigations-bar">
        <nuxt-link class="navigations-link" to="/catalog">Б/у автомобили</nuxt-link>
        <nuxt-link class="navigations-link" to="/catalog">Новые автомобили</nuxt-link>
        <nuxt-link class="navigations-link" to="/news">Новости</nuxt-link>
      </nav>
      <div class="personality">
        <svg class="user-icon">
          <use xlink:href="~assets/images/sprites/main.svg#icon-user" />
        </svg>
        <nuxt-link class="authorization-link" to="/login">Авторизация</nuxt-link>
        <div class="personal-cabinet-wrapper">
          <nuxt-link class="personal-cabinet-link" to="#">Личный кабинет</nuxt-link>
          <ul class="personal-cabinet-list">
            <li class="cabinet-list-item">
              <nuxt-link class="cabinet-item-link" to="#">Основная информация</nuxt-link>
            </li>
            <li class="cabinet-list-item">
              <nuxt-link class="cabinet-item-link" to="#">Мои объявления</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="authorization-alerts">
          <svg class="alerts-letter-icons">
            <use xlink:href="~assets/images/sprites/main.svg#icon-later" />
          </svg>
          <svg class="alerts-bell-icons">
            <use xlink:href="~assets/images/sprites/main.svg#icon-bell" />
          </svg>
        </div>
      </div>
    </header>
    <nuxt/>
    <footer class="footer">
      <div class="footer-general" fluid>
        <div class="row no-gutters">
          <div class="social col-3">
            <nuxt-link class="footer-logo" to="#">
              <img class="footer-logo-icon" src="~assets/images/logo-footer.png" alt="Logo">
            </nuxt-link>
            <p class="social-title">Седить за новостями AutoSill в соцсетях:</p>
            <ul class="social-list">
              <li class="social-list-item">
                <a class="social-item-ref is-facebook" href="#"></a>
              </li>
              <li class="social-list-item">
                <a class="social-item-ref is-instagram" href="#"></a>
              </li>
              <li class="social-list-item">
                <a class="social-item-ref is-telegram" href="#"></a>
              </li>
              <li class="social-list-item">
                <a class="social-item-ref is-twitter" href="#"></a>
              </li>
              <li class="social-list-item">
                <a class="social-item-ref is-you-tube" href="#"></a>
              </li>
            </ul>
          </div>
          <section class="about col-3">
            <h3 class="about-title">О сервисе</h3>
            <ul class="about-list">
              <li class="about-list-item">
                <nuxt-link class="about-item-link" to="#">Как работает сервис</nuxt-link>
              </li>
              <li class="about-list-item">
                <nuxt-link class="about-item-link" to="#">Пмощь по сайту</nuxt-link>
              </li>
              <li class="about-list-item">
                <nuxt-link class="about-item-link" to="#">Политика конфиденциальности</nuxt-link>
              </li>
            </ul>
          </section>
          <section class="seller col-3">
            <h3 class="seller-title">Продавцу</h3>
            <ul class="seller-list">
              <li class="seller-list-item">
                <nuxt-link class="seller-item-link" to="#">Как работает сервис</nuxt-link>
              </li>
              <li class="seller-list-item">
                <nuxt-link class="seller-item-link" to="#">Реклама на сайте</nuxt-link>
              </li>
              <li class="seller-list-item">
                <nuxt-link class="seller-item-link" to="#">Техподдержка</nuxt-link>
              </li>
            </ul>
          </section>
          <section class="services col-3">
            <h3 class="services-title">Отдел по работе с клиентами</h3>
            <a class="services-contacts-email" href="tel: 093 333 33 33">093 333 33 33</a>
            <a class="services-contacts-phone" href="mailto: mail@gmail.com">mail@gmail.com</a>
            <p class="services-info">Все вопросы и пожелания вы можете отправить нам на почту или рассказать по телефону.</p>
          </section>
        </div>
      </div>
      <div class="rights">
        <p class="rights-description">© 2016—2020, autosill.ua</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
@import "~assets/scss/base/custom-bootstrap.scss";

.layout{
  @include init-font;
  display: flex;
  flex-direction: column;

  height: 100vh;

  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 14px 136px;

    background: #F2F7FA;

    .header-logo{
      width: 139px;
      height: 32px;

      .header-logo-icon{
        height: 100%;
        width: 100%;
      }
    }

    .navigations-bar{
      & a:first-child{
        margin-left: 0;
      }

      .navigations-link{
        margin-left: 32px;
        color: #222329;
      }
    }

    .personality{
      display: flex;
      align-items: center;

      .user-icon{
        width: 20px;
        height: 20px;
      }

      .authorization-link{
        margin-left: 8px;
      }

      .personal-cabinet-wrapper{
        display: none;
      }

      .authorization-alerts{
        display: none;

        .alerts-letter-icons{
          width: 20px;
          height: 16px;
        }

        .alerts-bell-icons{
          width: 24px;
          height: 24px;
        }
      }
    }
  }

  .footer{
    padding: 59px 136px 22px 136px;

    background: #F2F7FA;
    text-align: left;

    .footer-general{
      display: flex;
      padding-bottom: 39px;

      .social{
        .social-title{
          margin-top: 32px;
          
          font-size: 14px;
          line-height: 18px;
        }

        .social-list{
          display: flex;
          margin-top: 16px;

          & li:first-child{
            margin-left: 0;
          }

          .social-list-item{
            margin-left: 16px;


            .social-item-ref{
              display: inline-block;
  
              background-image: url("~assets/images/sprites/social-footer-icons.png");
            }
  
            .is-facebook{
              width: 32px;
              height: 32px;
  
              background-position: -10px -10px;
            }
  
            .is-instagram{
              @extend .is-facebook;
  
              background-position: -62px -10px;
            }
  
            .is-telegram{
              @extend .is-facebook;
  
              background-position: -10px -62px;
            }
  
            .is-twitter {
              @extend .is-facebook;
  
              background-position: -62px -62px;
            }
  
            .is-you-tube {
              @extend .is-facebook;
  
              background-position: -114px -10px;
            }
          }

        }
      }

      .about{
        .about-title{
          font-size: 20px;
          line-height: 22px;
          height: 44px;
        }

        .about-list{
          margin-top: 20px;

          & li:first-child{
            margin-top: 0px;
          }

          .about-list-item{
            margin-top: 12px;

            font-size: 14px;
            line-height: 18px;
          }
        }
      }

      .seller{
        @extend .about;

        .seller-title{
          @extend .about-title;
        }

        .seller-list{
          @extend .about-list;

          .seller-list-item{
            @extend .about-list-item;
          }
        }
      }

      .services{
        @extend .about;

        .services-title{
          @extend .about-title;
        }

        .services-contacts-email{
          display: block;
          margin-top: 20px;

          font-size: 14px;
          line-height: 18px;
        }

        .services-contacts-phone{
          @extend .services-contacts-email;
          margin-top: 12px;
        }

        .services-info{
          @extend .services-contacts-phone;
        }
      }
    }

    .rights{
      padding-top: 16px;
      border-top: 1px solid rgba(34, 35, 41, 0.1);
    }
  }
}

html {
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Segoe UI, Fira Sans, Roboto, Oxygen, Ubuntu, Droid Sans, Arial, sans-serif;
  }

body {
    margin: 0;
}
</style>>

