<template>
  <div class="dropzone-wrapper">
    <dropzone class="dropzone" ref="dropzone" id="dropzone" :options="options" :useCustomSlot="true" @vdropzone-thumbnail="addedFile" @vdropzone-error="handlerError">
      <slot name="drop-area">
        <div class="dropzone-custom-content">
          <h3 class="dropzone-custom-title" v-if="$vuetify.breakpoint.smAndUp">Перетяните фото вашего авто в эту область для загрузки на сайт</h3>
          <h3 class="dropzone-custom-title is-title-mobile" v-else>Нажмите чтобы добавить фото</h3>
          <button class="dropzone-btn" v-if="$vuetify.breakpoint.smAndUp" type="button">Нажмите чтобы открыть папку</button>
        </div>
      </slot>
    </dropzone>
    <ul class="preview-list" :key="reloadPreviewList" v-if="previewList.length">
      <li class="preview-item" :key="index" v-for="(item, index) in previewList">
        <div class="preview" :style="`background: url(${item.dataURL}) no-repeat center / cover`"></div>
        <div class="check-box-wrapper">
          <CheckBox class="check-box" :value="mainImageIndex === index" label="Главное фото" @change="selectMain(index)" />
        </div>
        <button class="cansel-btn" type="button" @click="canselImage(item)">
          <svg class="cansel-btn-icon">
            <use xlink:href="~assets/images/sprites/main.svg#close" />
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';
// components
import CheckBox from '~/components/base/CheckBox.vue';

export default {
  data() {
    return {
      options: {
        url: 'http://carsell-front.utest.space',
        autoProcessQueue: false,
        previewsContainer: false,
        maxFilesize: 10,
        acceptedFiles: '.jpeg,.jpg,.png,.pdf',
        maxFiles: 99,
      },
      previewList: [],
      mainImageIndex: null,
      reloadPreviewList: false,
    };
  },
  watch: {
    previewList: {
      deep: true,
      handler() {
        this.$emit('change-image', { images: this.previewList, main: this.mainImageIndex });
      },
    },
  },
  methods: {
    handlerError(file) {
      this.$refs.dropzone.removeFile(file);
      this.previewList = this.previewList.filter((item) => item.status !== 'error');
    },

    addedFile(dropItem) {
      if (dropItem.size < this.minSize) {
        this.$emit('min-size', { error: true, message: 'Фото меньше 50Кб' });

        return;
      }

      if (dropItem.size > this.maxSize) {
        this.$emit('min-size', { error: true, message: 'Фото больше 100Кб' });

        return;
      }

      this.previewList = [...this.previewList, dropItem];
    },

    canselImage(previewItem) {
      this.$refs.dropzone.removeFile(previewItem);
      this.previewList = this.previewList.filter((item) => item.upload.uuid !== previewItem.upload.uuid);
    },

    selectMain(indexItem) {
      this.mainImageIndex = this.mainImageIndex === indexItem ? null : indexItem;
    },
  },
  props: {
    minSize: {
      type: Number,
      default: 50000,
    },
    maxSize: {
      type: Number,
      default: 100000,
    },
  },
  components: {
    Dropzone,
    CheckBox,
  },
};
</script>

<style lang="scss" scoped>
.dropzone-wrapper {
  .dropzone {
    position: relative;

    height: 342px;

    border-radius: 4px;
    border: 1px dashed #70848e;
    background: #f2f7fa;

    .dropzone-custom-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .dropzone-custom-title {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        line-height: 20px;
        color: #4a4d5c;
      }

      .is-title-mobile {
        white-space: nowrap;
        font-size: 14px;
        line-height: 15px;
      }

      .dropzone-btn {
        margin-top: 37px;
        height: 43px;
        padding: 0 20px;

        border-radius: 2px;
        border: 1px solid #4a4d5c;
        background: #ffffff;

        font-size: 15px;
        font-weight: 500;
        line-height: 15px;
        color: #4a4d5c;

        &:hover {
          background: #f2f7fa;
        }
      }
    }
  }

  .preview-list {
    margin-top: 24px;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 190px));
    gap: 24px;

    .preview-item {
      position: relative;
      display: flex;
      justify-content: center;

      .preview {
        width: 100%;

        &::before {
          display: block;
          padding-top: 60%;
          content: '';
          width: 100%;
        }
      }

      .check-box-wrapper {
        position: absolute;
        padding: 9px 0 5px 0;
        bottom: 0;
        width: 100%;
        background: rgba(34, 35, 41, 0.6);

        .check-box {
          width: max-content;
          margin: 0 auto;

          ::v-deep .v-input__slot {
            .v-input--selection-controls__input {
              height: 22px;
              width: 22px;

              .v-icon {
                background: none;

                &::before {
                  border: 1px solid #ffffff;
                }
              }

              .mdi-checkbox-marked {
                &::before {
                  border: none;
                }
              }
            }

            .v-label {
              color: white;
            }
          }
        }
      }

      .cansel-btn {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;

        top: 0;
        right: 0;

        width: 32px;
        height: 32px;

        background: rgba(34, 35, 41, 0.6);

        &:hover .cansel-btn-icon {
          fill: #000000;
        }

        .cansel-btn-icon {
          width: 14px;
          height: 14px;
          fill: #ffffff;
        }
      }
    }
  }
}

@include xs {
  .dropzone-wrapper {
    .preview-list {
      grid-template-columns: repeat(auto-fill, minmax(120px, 136px));
      gap: 16px;

      .preview-item {
        .check-box-wrapper {
          padding: 9px 0 6px 0;

          .check-box {
            ::v-deep .v-input__slot {
              .v-input--selection-controls__input {
                height: 18px;
                width: 18px;

                .v-icon {
                  font-size: 24px;
                  width: 18px;
                  height: 18px;

                  &::before {
                    width: 18px;
                    height: 18px;
                  }
                }

                .mdi-checkbox-marked {
                  &::before {
                    width: auto;
                    height: auto;
                  }
                }
              }
            }

            .v-label {
              font-size: 14px;
            }
          }
        }

        .cansel-btn {
          width: 24px;
          height: 24px;
        }
      }
    }

    .dropzone {
      height: 96px;
      min-height: 96px;
    }
  }
}
</style>
