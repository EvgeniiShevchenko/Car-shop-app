<template>
  <v-expansion-panels :accordion="true" :value="isOpen">
    <v-expansion-panel :class="`accordion is-${className}`">
      <v-expansion-panel-header>
        <slot name="header">
          <h3 class="accordion-title">{{ title }}</h3>
        </slot>
        <template v-slot:actions v-if="isCustomizingMark">
          <v-icon :style="`font-size: ${sizeMark}px;`" :color="colorMark"> $expand </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="accordion-content">
        <slot name="content"> </slot>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'AcordionSingle',
  methods: {
    openAccordion() {
      this.isOpen = !this.isOpen;
    },
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    isOpen: {
      type: [Number, undefined],
      default: undefined,
    },
    className: {
      type: String,
      default: 'default',
    },
    isCustomizingMark: {
      type: Boolean,
      default: false,
    },
    sizeMark: {
      type: Number,
      default: 24,
    },
    colorMark: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss" scoped>
.accordion {
  padding: 20px 0;

  border-radius: 8px;
  border: 1px solid #d6e1e7;

  .accordion-title {
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    color: #222329;
  }

  .accordion-content {
  }
}

.is-simple {
  padding: 19px 0;
  border: none;
  background-color: transparent !important;
  border-radius: 0 !important;
  box-shadow: 0 2px 0 -1px rgba(34, 35, 41, 0.1);

  &::before {
    content: none;
  }

  ::v-deep .v-expansion-panel-header {
    padding: 0 !important;

    .accordion-title {
      font-size: 16px;
      font-weight: 500;
      line-height: 18px;
    }
  }

  ::v-deep .v-expansion-panel-content__wrap {
    padding: 0;
  }
}
</style>
