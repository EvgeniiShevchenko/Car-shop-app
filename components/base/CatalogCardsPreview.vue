<template>
  <n-link class="catalog-card" :to="`auto/${collection.alias}`">
    <div class="preview-wrapper" :style="`background:  ${!!collection.mainImage ? 'url(' + collection.mainImage + ') no-repeat center / cover' : ''}`"></div>
    <div class="general">
      <p class="id">ID {{ collection.unique_id }}</p>
      <h3 class="item-title">{{ collection.format_name }}</h3>
      <div class="stats">
        <div class="speed">
          <svg class="speed-icon">
            <use xlink:href="~assets/images/sprites/main.svg#icon-speedometer" />
          </svg>
          <p class="speed-title">{{ collection.mileage }} км</p>
        </div>
        <div class="location">
          <svg class="location-icon">
            <use xlink:href="~assets/images/sprites/main.svg#icon-location-mark" />
          </svg>
          <p class="location-title">{{ collection.city }}</p>
        </div>
      </div>
      <div class="price">
        <p class="price-title">{{ collection.currency_default }} {{ collection.price }}</p>
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
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.catalog-card {
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

    .price {
      .price-title {
        margin-bottom: 0;

        font-size: 20px;
        font-weight: 500;
        line-height: 22px;
        color: #4cad33;
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

@include sm {
  .catalog-card .general {
    width: 100%;
  }
}
</style>
