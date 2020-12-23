<template>
  <n-link :class="`catalog-card ${extends_view ? 'extend-price' : ''}`" :to="`auto/${collection.alias}`">
    <div class="preview-wrapper" :style="`background:  ${!!collection.mainImage ? 'url(' + collection.mainImage + ') no-repeat center / cover' : ''}`"></div>
    <div class="general">
      <p class="id">ID {{ collection.unique_id }}</p>
      <h3 class="item-title">{{ collection.format_name || collection.name }}</h3>
      <div class="stats">
        <div class="speed">
          <span class="icon-wrapper">
            <svg class="speed-icon">
              <use xlink:href="~assets/images/sprites/main.svg#icon-speedometer" />
            </svg>
          </span>
          <p class="speed-title">{{ collection.mileage }} км</p>
        </div>
        <div class="fuel" v-if="extends_view">
          <span class="icon-wrapper">
            <svg class="fuel-icon">
              <use xlink:href="~assets/images/sprites/catalog.svg#icon-canister" />
            </svg>
          </span>
          <p class="fuel-title">{{ collection.fuel.name }}</p>
        </div>
        <div class="transmision" v-if="extends_view">
          <span class="icon-wrapper">
            <svg class="transmision-icon">
              <use xlink:href="~assets/images/sprites/catalog.svg#icon-transmission" />
            </svg>
          </span>
          <p class="transmision-title">{{ collection.transmission.name }}</p>
        </div>
        <div class="location">
          <span class="icon-wrapper">
            <svg class="location-icon">
              <use xlink:href="~assets/images/sprites/main.svg#icon-location-mark" />
            </svg>
          </span>
          <p class="location-title">{{ typeof collection.city === 'string' ? collection.city : collection.city.name }}</p>
        </div>
      </div>
      <div class="price-wrapper">
        <p class="price-title">
          {{ collection.currency_default || collection.currencyDefault }} {{ collection.price }}
          <span class="old-price">{{ collection.currencyDefault }} {{ collection.old_price }}</span>
        </p>
        <div class="servises-btn-wrapper" v-if="extends_view">
          <button :class="`libra-btn ${compareList.has(collection.unique_id) ? 'is-compare' : ''}`" v-if="!isMobile" type="button" @click.prevent.stop="$emit('add-comparison', collection.unique_id)">
            <svg class="libra-icon">
              <use xlink:href="~assets/images/sprites/catalog.svg#icon-Libra" />
            </svg>
          </button>
          <button v-if="!collection.is_wishlist && this.$cookies.get('accessToken')" class="favorites-btn" type="button" @click.prevent.stop="$emit('add-bookmarks', collection.unique_id)">
            <svg class="favorites-icon">
              <use xlink:href="~assets/images/sprites/catalog.svg#icon-star" />
            </svg>
          </button>
          <button
            v-if="collection.is_wishlist && this.$cookies.get('accessToken')"
            class="favorites-btn"
            style="width: 20px; height: 20px"
            type="button"
            @click.prevent.stop="$emit('add-bookmarks', collection.unique_id)"
          >
            <v-icon color="#51a9f2">mdi-star</v-icon>
          </button>
        </div>
      </div>
      <div class="vin" v-if="collection.vin_code_verified">
        <svg class="vin-icon">
          <use xlink:href="~assets/images/sprites/main.svg#icon-vin-approved" />
        </svg>
        <p class="vin-title">Проверенный VIN-код</p>
      </div>
    </div>
  </n-link>
</template>

<script>
export default {
  name: 'CatalogCardsPreview',
  props: {
    collection: {
      type: [Object, String],
    },
    extends_view: {
      type: Boolean,
      default: false,
    },
    compareList: {
      type: Set,
      default() {
        return new Set();
      },
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog-card {
  display: flex;
  max-height: 170px;

  .preview-wrapper {
    max-width: 154px;
    width: 100%;

    border-radius: 4px 0 0 4px;
    background: url('~assets/images/image-empty-car.png') no-repeat;
    background-size: cover;
    background-position: 50% 50%;

    .preview {
      width: 100%;
      height: 100%;
    }
  }

  &:hover .general .item-title {
    color: #1768ac;
  }

  .general {
    position: relative;

    padding: 20px 16px;

    width: 100%;

    border: 1px solid #b1c4cd;
    border-radius: 0px 4px 4px 0px;
    border-left: 0;

    .id {
      margin-bottom: 8px;

      font-size: 13px;
      line-height: 16px;
      color: #70848e;
    }

    .item-title {
      margin-bottom: 12px;

      font-weight: 500;
      font-size: 18px;
      line-height: 20px;
      color: #4a4d5c;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 13px;

      .speed {
        display: flex;
        align-items: center;

        .speed-icon {
          width: 18px;
          height: 14px;
        }

        .speed-title {
          margin-bottom: 0;
          margin-left: 8px;

          font-size: 14px;
          line-height: 18px;
          color: #4a4d5c;
        }
      }

      .fuel {
        @extend .speed;

        .fuel-icon {
          width: 20px;
          height: 20px;
        }

        .fuel-title {
          @extend .speed-title;
        }
      }

      .transmision {
        @extend .speed;

        .transmision-icon {
          width: 16px;
          height: 16px;
        }

        .transmision-title {
          @extend .speed-title;
        }
      }

      .location {
        @extend .speed;

        .location-icon {
          width: 12px;
          height: 17px;
        }

        .location-title {
          @extend .speed-title;
        }
      }
    }

    .price-wrapper {
      .price-title {
        margin-bottom: 0;

        font-size: 20px;
        font-weight: 500;
        line-height: 22px;
        color: #4cad33;

        .old-price {
          display: none;
        }
      }

      .servises-btn-wrapper {
        .libra-btn {
          margin-right: 17px;
          font-size: 0;

          .libra-icon {
            width: 28px;
            height: 22px;

            fill: #8fa5b0;
          }
        }

        .is-compare {
          .libra-icon {
            fill: #51a9f2;
          }
        }

        .favorites-btn {
          font-size: 0;

          .favorites-icon {
            width: 20px;
            height: 20px;

            fill: #8fa5b0;
          }
        }
      }
    }

    .vin {
      position: absolute;
      display: flex;

      padding: 5px 6px;
      right: 0;
      top: 8px;

      border-radius: 2px 0px 0px 2px;
      background: #51a9f2;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);

      .vin-icon {
        width: 16px;
        height: 16px;
      }

      .vin-title {
        margin-bottom: 0;
        margin-left: 8px;

        font-size: 12px;
        line-height: 14px;
        color: #ffffff;
      }
    }
  }
}

.extend-price .general {
  .stats {
    margin-bottom: 17px;
  }

  .price-wrapper {
    display: flex;
    justify-content: space-between;

    padding-top: 16px;
    box-shadow: 0 -2px 0 -0.5px rgba(0, 0, 0, 0.1);

    .price-title {
      display: flex;
      align-items: center;

      .old-price {
        display: inline;

        margin-left: 8px;

        text-decoration: line-through;
        font-size: 16px;
        line-height: 18px;
        color: #b1c4cd;
      }
    }

    .servises-btn-wrapper {
      display: flex;

      .libra-btn:hover .libra-icon {
        fill: #51a9f2;
      }

      .favorites-btn:hover .favorites-icon {
        fill: #51a9f2;
      }
    }
  }
}

@include sm {
  .catalog-card .general {
    width: 100%;
  }
}
</style>
