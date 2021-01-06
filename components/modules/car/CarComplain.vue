<template>
  <div class="complain mt-11">
    <div class="preview-wrapper">
      <div class="preview">
        <img class="preview-icon" :src="!!collection.user.image ? collection.user.image : '~/assets/images/car-ask-frame.png'" />
      </div>
      <h3 class="preview-title" v-if="$vuetify.breakpoint.xs">
        {{ !!collection.user.first_name ? collection.user.first_name : '' }} {{ !!collection.user.last_name ? collection.user.last_name : '' }}
        {{ !!collection.user.middle_name ? collection.user.middle_name : '' }}
      </h3>
    </div>
    <div class="general">
      <h3 class="general-title">
        {{ !!collection.user.first_name ? collection.user.first_name : '' }} {{ !!collection.user.last_name ? collection.user.last_name : '' }}
        {{ !!collection.user.middle_name ? collection.user.middle_name : '' }}
      </h3>
      <textarea
        :class="`general-field ${isFieldEmpty ? 'is-empty' : ''}`"
        cols="30"
        rows="10"
        v-model="message"
        :placeholder="isFieldEmpty ? `Поле должно быть заполненым` : `Текст вашего сообщения`"
        @focus="focusField"
      ></textarea>
      <button class="send-btn mt-2" type="button" @click="sendComplain">Отправить</button>
    </div>
    <button class="close-btn" type="button" @click="close">
      <svg class="close-btn-icon">
        <use xlink:href="~assets/images/sprites/global.svg#close" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarComplain',
  data() {
    return {
      message: '',
      isFieldEmpty: false,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },

    focusField() {
      this.isFieldEmpty = false;
    },

    async sendComplain() {
      const serverData = {
        user_id: this.collection.user.id,
        product_id: this.collection.id,
        text: this.message,
      };

      if (!serverData.text) {
        this.isFieldEmpty = true;

        return;
      }

      try {
        await this.$services.car.sendCarComplainMessage(serverData);
        this.$root.$emit('show-popup', { error: false, message: 'Спасибо за ваше уведомление. Мы рассмотрим его в ближайшее время и предпримем все необходимые меры.', timer: 4000 });

        this.message = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
  props: {
    collection: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.complain {
  position: relative;
  display: flex;

  padding: 26px 47px 39px 26px;

  max-width: 567px;
  width: 100%;

  border-radius: 4px;
  background: #f2f7fa;

  .preview-wrapper {
    .preview {
      height: 96px;
      width: 96px;
      min-width: 96px;

      .preview-icon {
        height: 100%;
        width: 100%;
      }
    }

    .preview-title {
      margin-left: 16px;
      @include init-title(#222329, 16px, 500, 18px);
    }
  }

  .general {
    margin: 39px 0 0 25px;
    width: 100%;

    .general-title {
      margin-left: 8px;
      @include init-title(#222329, 16px, 500, 18px);
    }

    .general-field {
      display: block;
      @extend .text-area-classic;
      margin-top: 18px;
      max-height: 100px;
    }

    .is-empty {
      &::placeholder {
        color: #f05156;
      }
    }

    .send-btn {
      @extend .accept-green-btn;
      height: 35px;
      max-width: 120px;
    }
  }

  .close-btn {
    position: absolute;
    padding: 10px;

    right: 0;
    top: 0;

    &:hover .close-btn-icon {
      fill: #222329;
    }

    .close-btn-icon {
      width: 14px;
      height: 14px;

      fill: #8fa5b0;
    }
  }
}

@include xs {
  .complain {
    flex-direction: column;
    padding: 16px;

    .preview-wrapper {
      display: flex;
      align-items: center;
    }

    .general {
      margin: 16px 0 0 0;

      .general-title {
        display: none;
      }

      .general-field {
        margin-top: 0;
      }
    }
  }
}
</style>
