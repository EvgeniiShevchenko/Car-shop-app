<template>
  <div :class="`additional-options-wrapper is-${className}`" ref="additional">
    <div :class="`additional-option-wrapper ${mobileAdditionalShow === 1 ? 'is-mobile' : ''}`" v-if="carAnotherList.length">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Состояние машины</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(1)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Состояние машины
      </button>
      <CheckBoxGroup
        class="check-box is-states"
        ref="states"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="carStates"
        :collection="carStatesList"
        @change="$emit('change-states', $event)"
        :isFixAlign="true"
        :amountEmptyStirng="carStatesList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 2 ? 'is-mobile' : ''}`" v-if="carAnotherList.length">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Дополнительные опции</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(2)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Дополнительные опции
      </button>
      <CheckBoxGroup
        class="check-box is-comfort"
        ref="comfort"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="carComfort"
        :collection="carComfortList"
        @change="$emit('change-comfort', $event)"
        :isFixAlign="true"
        :amountEmptyStirng="carComfortList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 3 ? 'is-mobile' : ''}`" v-if="carAnotherList.length">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Мультимедиа</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(3)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Мультимедиа
      </button>
      <CheckBoxGroup
        class="check-box is-multimedia"
        ref="multimedia"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="carMultimedia"
        :collection="carComfortList"
        @change="$emit('change-multimedia', $event)"
        :isFixAlign="true"
        :amountEmptyStirng="carMultimediaList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 4 ? 'is-mobile' : ''}`" v-if="carAnotherList.length">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Безопасность</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(4)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Безопасность
      </button>
      <CheckBoxGroup
        class="check-box is-security"
        ref="security"
        v-show="$vuetify.breakpoint.smAndUp"
        :value="carSecurity"
        :collection="carSecurityList"
        @change="$emit('change-security', $event)"
        :isFixAlign="true"
        :amountEmptyStirng="carSecurityList.length"
      />
    </div>
    <div :class="`additional-option-wrapper mt-0 mt-sm-4 ${mobileAdditionalShow === 5 ? 'is-mobile' : ''}`" v-if="carAnotherList.length">
      <h3 class="additional-option-title" v-if="$vuetify.breakpoint.smAndUp">Другое</h3>
      <button class="additional-mobile-btn" type="button" @click="selectAdditional(5)">
        <svg class="additional-btn-icon">
          <use xlink:href="~assets/images/sprites/global.svg#arrow-w-7" />
        </svg>
        Другое
      </button>
      <CheckBoxGroup
        class="check-box"
        ref="another"
        :value="carAnother"
        v-show="$vuetify.breakpoint.smAndUp"
        :collection="carAnotherList"
        @change="$emit('change-another', $event)"
        :isFixAlign="true"
        :amountEmptyStirng="carAnotherList.length"
      />
    </div>
  </div>
</template>

<script>
// components
import CheckBoxGroup from '~/components/base/CheckBoxGroup.vue';
// mixins
import transformArrayForSelectBtn from '~/mixins/transformArrayForSelectBtn.js';

export default {
  name: 'CarAdditionalStats',
  mixins: [transformArrayForSelectBtn],
  data() {
    return {
      mobileAdditionalShow: null,
      carStatesList: [],
      carComfortList: [],
      carMultimediaList: [],
      carSecurityList: [],
      carAnotherList: [],
      multimediaHeight: 0,
      statesHeight: 0,
      comfortHeight: 0,
      securityHeight: 0,
      anotheHeight: 0,
    };
  },
  methods: {
    selectAdditional(additionalShowId) {
      if (additionalShowId === this.mobileAdditionalShow) {
        this.mobileAdditionalShow = null;
        document.body.classList.remove('hide-scroll-bar');

        return;
      }

      this.mobileAdditionalShow = additionalShowId;
      document.body.classList.add('hide-scroll-bar');
    },

    setContainerWidth() {
      const nodeWidth = this.$refs.additional.clientWidth;

      this.$refs.additional.style.maxWidth = nodeWidth + 'px';

      console.log('🚀 ~ file: CarAdditionalStats.vue ~ line 129 ~ setContainerWidth ~ setContainerWidth', this, this.$refs.additional.clientWidth);
    },

    defineContainerHeight() {
      const setContainerHeight = (breakpointName) => {
        this.multimediaHeight = (this.carComfortList.length * this.configuration.rowHeight) / this.configuration[breakpointName].colums + 36;
        this.statesHeight = (this.carStatesList.length * this.configuration.rowHeight) / this.configuration[breakpointName].colums + 36;
        this.comfortHeight = (this.carComfortList.length * this.configuration.rowHeight) / this.configuration[breakpointName].colums + 36;
        this.securityHeight = (this.carSecurityList.length * this.configuration.rowHeight) / this.configuration[breakpointName].colums + 36;
        this.anotheHeight = (this.carAnotherList.length * this.configuration.rowHeight) / this.configuration[breakpointName].colums + 36;

        console.log(this.$refs.states);
        this.$refs.states.$el.style.maxHeight = this.statesHeight + 'px';
        this.$refs.comfort.$el.style.maxHeight = this.comfortHeight + 'px';
        this.$refs.multimedia.$el.style.maxHeight = this.multimediaHeight + 'px';
        this.$refs.security.$el.style.maxHeight = this.securityHeight + 'px';
        this.$refs.another.$el.style.maxHeight = this.anotheHeight + 'px';
      };

      switch (this.$vuetify.breakpoint.name) {
        case 'md':
          setContainerHeight('md');
          break;
        case 'sm':
          setContainerHeight('sm');
          break;
        case 'xs':
          setContainerHeight('xs');
          break;
        default:
          setContainerHeight('lg');
          break;
      }
    },
  },
  mounted() {
    this.setContainerWidth();

    this.$nextTick(async () => {
      await (async () => {
        try {
          this.carStatesList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarCondition(this.carType)).data.carCondition);
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          this.carComfortList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarComfort(this.carType)).data.carComfort);
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          this.carMultimediaList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarMultimedia(this.carType)).data.carMultimedia);
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          this.carSecurityList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarSecurity(this.carType)).data.carSecurity);
        } catch (error) {
          console.error(error);
        }
      })();

      await (async () => {
        try {
          this.carAnotherList = this.transformArrayForSelectBtn((await this.$services.filter.getFilterCarAnother(this.carType)).data.carAnother);
        } catch (error) {
          console.error(error);
        }
      })();

      this.defineContainerHeight();
    });
  },
  props: {
    carType: {
      type: [String, Number],
      required: true,
    },
    carStates: {
      type: Array,
      required: true,
    },
    carComfort: {
      type: Array,
      required: true,
    },
    carMultimedia: {
      type: Array,
      required: true,
    },
    carSecurity: {
      type: Array,
      required: true,
    },
    carAnother: {
      type: Array,
      required: true,
    },
    className: {
      type: String,
      default: 'sample',
    },
    configuration: {
      type: Object,
      default() {
        return {
          rowHeight: 36,
          lg: {
            colums: 3,
          },
          md: {
            colums: 3,
          },
          sm: {
            colums: 2,
          },
          xs: {
            colums: 1,
          },
        };
      },
    },
  },
  components: {
    CheckBoxGroup,
  },
};
</script>

<style lang="scss" scoped>
.additional-options-wrapper {
  .additional-option-wrapper {
    margin-top: 20px;

    .title-l {
      @include init-title(#4a4d5c, 18px, 500, 20px);
    }

    .additional-option-title {
      @extend .title-l;
    }

    .additional-mobile-btn {
      display: none;
      align-items: center;
      justify-content: left;

      padding: 11px 0;
      width: 100%;
      box-shadow: 0 -1px 0 0 rgba(34, 35, 41, 0.1);

      .additional-btn-icon {
        display: none;
        margin: 0 9px;
        width: 7px;
        height: 12px;
        transform: rotate(180deg);
      }
    }

    .check-box {
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      gap: 12px 10px;

      & ::v-deep .check-box-item {
        margin-top: 0;
        max-width: calc((100% - 36px) / 3);
        width: 100%;

        .v-label {
          display: inline-block;

          width: 100%;

          text-overflow: ellipsis;
          overflow-x: hidden;
          white-space: nowrap;
        }
      }
    }
  }

  .is-mobile {
    position: fixed;

    top: 0;
    left: 0;
    padding: 11px 16px;
    margin-top: 0;

    width: 100%;
    height: 100vh;

    background: #ffffff;
    overflow-y: auto;
  }
}

.is-subscriptions {
  div:last-child {
    padding-bottom: 0;
    box-shadow: none;
  }

  .additional-option-wrapper {
    margin-top: 24px;
    padding-bottom: 24px;
    box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

    .check-box {
      ::v-deep .check-box-item {
        max-width: calc((100% - 24px) / 3);
      }
    }
  }
}

@include sm {
  .additional-options-wrapper .additional-option-wrapper {
    .check-box {
      ::v-deep .check-box-item {
        max-width: calc((100% - 24px) / 2);
      }
    }
  }
}

@include xs {
  .additional-options-wrapper .additional-option-wrapper {
    .additional-option-title {
      display: none;
    }

    .additional-mobile-btn {
      display: flex;
    }

    .check-box {
      display: none;
    }

    .check-box {
      ::v-deep .check-box-item {
        max-width: calc((100% - 12px) / 1);
      }
    }
  }

  .is-mobile {
    .additional-mobile-btn {
      padding: 2px 0 11px 0;
      box-shadow: 0 1px 0 0 rgba(34, 35, 41, 0.1);

      .additional-btn-icon {
        display: block !important;
      }
    }

    .check-box {
      display: flex !important;
      flex-wrap: nowrap;
      margin-top: 24px;

      ::v-deep .check-box-item {
        max-width: max-content;
      }
    }
  }
}
</style>
