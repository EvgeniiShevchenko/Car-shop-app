<template>
  <div class="news-subscriptions">
    <p class="news-info mt-6">
      Чтобы быть в курсе событий и не пропустить важных новостей, Вы можете подписаться на новостную рассылку AutoSill. Вы будете получать рассылку каждое утро на почту с новостями за прошедший день.
      В любое время Вы сможете изменить темы подписки.
    </p>
    <div class="news-general row no-gutters mt-6">
      <div class="topics col-12 pr-0 col-sm-6 pr-sm-4">
        <h3 class="general-title">Темы рассылки AutoSill</h3>
        <CheckBox class="mt-4" :value="isSubscribleAllNews" label="Новости AutoSill" @change="subscribleAllNews" />
        <CheckBoxGroup class="general-subscrible mt-3" :value="topics" :collection="topicsList" @change="selectTopic" />
        <InputCustomField
          class="topics-email mt-4"
          placeholder="mail@mail.com"
          inputName="mail_newsletter"
          type="email"
          :isLabel="false"
          :value="email"
          :errorList="error.locations"
          :errorMessage="error.message"
          @change-field="changeEmail"
          @focus-field="handlerFocus"
        />
      </div>
      <div class="notifications col-12 col-sm-6 mt-4 mt-sm-0 pl-0 pl-sm-4">
        <h3 class="general-title">Уведомления от AutoSill</h3>
        <Tooltip class="mt-4" :isHover="true" text="Информация о размещении и сроках публикации ваших объявлений">
          <template slot="activator">
            <CheckBox :value="isAboutAds" label="Информация про объявления" @change="setAboutAds" />
          </template>
        </Tooltip>
        <Tooltip class="mt-3" :isHover="true" text="Уведомления о сообщениях от других пользователей касательно ваших объявлений">
          <template slot="activator">
            <CheckBox :value="isMessageFromUsers" label="Сообщения от пользователей" @change="setMessageFromUsers" />
          </template>
        </Tooltip>
      </div>
    </div>
    <button class="save-btn mt-6" type="button" @click="saveNewsSubscription">Сохранить изменения</button>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail';
// components
import InputCustomField from '~/components/base/InputCustomField.vue';
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
import CheckBox from '~/components/base/CheckBox.vue';
import Tooltip from '~/components/base/Tooltip.vue';
// mixins
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';

export default {
  name: 'SubscriptionsNews',
  mixins: [transformArrayForSelectBtn],
  data() {
    return {
      email: '',
      topics: [],
      topicsList: [],
      notifications: [],
      isAboutAds: null,
      isMessageFromUsers: null,
      userCollection: {},
      isSubscribleAllNews: false,
      error: {
        status: false,
        type: '',
        message: '',
        locations: new Set([]),
      },
    };
  },
  methods: {
    saveNewsSubscription() {
      const serverData = {
        tag_id: this.topics,
        mail_newsletter: this.email,
        message_user: this.isAboutAds ? 1 : 0,
        info_product: this.isMessageFromUsers ? 1 : 0,
      };

      if (!this.email.length) {
        if (!this.error.status) {
          this.error.message = 'Ошибка поля. Поле должно быть заполненным';
          this.error.type = 'empty';
          this.error.status = true;
        }

        this.error.locations.add('mail_newsletter');
      }

      if (this.error.type !== 'empty' && !isEmail(this.email)) {
        this.error.message = 'Ошибка поля. Емейл должен быть верным';
        this.error.status = true;
        this.error.type = 'email';
        this.error.locations.add('mail_newsletter');
      }

      if (!!this.error.locations.size) {
        this.error.locations = new Set(this.error.locations);

        return;
      }
      this.error = { ...this.error, status: false, message: '', type: '' };

      try {
        this.$services.user.setNewsSubscription(serverData);
      } catch (error) {
        console.error(error);
      }
    },

    subscribleAllNews(status) {
      if (status) {
        this.isSubscribleAllNews = status;
        this.topics = this.topicsList.map((item) => item.value);

        return;
      }

      this.isSubscribleAllNews = status;
      this.topics = [];
    },

    handlerFocus(fieldId) {
      if (this.error.locations.has(fieldId)) {
        this.error.locations.delete(fieldId);
        this.error.locations = new Set(this.error.locations);
      }

      if (!this.error.locations.size) {
        this.error = { ...this.error, status: false, message: '', type: '' };
      }
    },

    setAboutAds(isSelect) {
      this.isAboutAds = isSelect;
    },

    setMessageFromUsers(isSelect) {
      this.isMessageFromUsers = isSelect;
    },

    selectTopic(topicsOptions) {
      this.topics = topicsOptions;

      if (this.topics.length < this.topicsList.length) {
        this.isSubscribleAllNews = false;
      }
      if (this.topics.length === this.topicsList.length) {
        this.isSubscribleAllNews = true;
      }
    },

    changeEmail(value) {
      this.email = value;
    },
  },
  async mounted() {
    try {
      const { newsMail, user } = (await this.$services.user.getNewsSubscription()).data;

      this.isAboutAds = user.info_product === 0 ? null : true;
      this.isMessageFromUsers = user.message_user === 0 ? null : true;
      this.userCollection = user;
      this.topicsList = this.transformArrayForSelectBtn(newsMail);
      this.topics = newsMail.filter((item) => item.status).map((item) => item.id);
      this.email = !!user.mail_newsletter ? user.mail_newsletter : '';

      if (!newsMail.some((item) => !item.status)) this.isSubscribleAllNews = true;
    } catch (error) {
      console.error(error);
    }
  },
  components: {
    InputCustomField,
    CheckBoxGroup,
    CheckBox,
    Tooltip,
  },
};
</script>

<style lang="scss" scoped>
.news-subscriptions {
  .title-xl {
    @include init-title(#222329, 20px, 500, 22px);
  }

  .news-info {
    max-width: 865px;
    @include init-title(#222329, 14px, 400, 18px);
  }

  .news-general {
    .topics {
      .general-title {
        @extend .title-xl;
      }

      .topics-email {
        max-width: 314px;
        width: 100%;
      }
    }

    .notifications {
      @extend .topics;
    }
  }

  .save-btn {
    width: max-content;
    padding: 0 20px;
    @extend .accept-green-btn;
  }
}

@include xs {
  .news-subscriptions {
    .title-xl {
      font-size: 16px;
      line-height: 16px;
    }
  }
}
</style>
