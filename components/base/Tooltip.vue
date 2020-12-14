<template>
  <div class="tooltipe-wrapper" @mouseover="handlerMouseOver" @mouseout="handlerMouseOut">
    <div class="activator" @click="showTooltip">
      <slot name="activator">
        <button type="button">Tooltipe</button>
      </slot>
    </div>
    <div class="tooltipe" ref="tooltip" v-if="isSocialNetworks" v-click-outside="hideSocialNetworks">
      <slot name="tooltipe">
        <p class="tooltipe-content">{{ text }}</p>
      </slot>
      <div class="triangle" ref="triangle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  data() {
    return {
      isSocialNetworks: false,
    };
  },
  methods: {
    showTooltip(event) {
      this.isSocialNetworks = true;

      this.$nextTick(() => {
        const tooltipNode = this.$refs.tooltip;
        const x = event.pageX;
        const screenWidth = window.screen.width;
        const targetWidth = tooltipNode.offsetWidth;

        if (screenWidth - x < targetWidth) {
          this.$refs.tooltip.style.transform = `translateX(calc(${27}px - 100%))`;

          if (!this.$refs.triangle.classList.contains('is-triangle-left')) this.$refs.triangle.classList.add('is-triangle-left');

          return;
        }

        if (this.$refs.triangle.classList.contains('is-triangle-left')) this.$refs.triangle.classList.remove('is-triangle-left');
      });
    },

    hideSocialNetworks() {
      this.isSocialNetworks = false;
    },

    handlerMouseOver(e) {
      if (this.isHover) this.showTooltip(e);
    },

    handlerMouseOut(e) {
      if (this.isHover) this.isSocialNetworks = false;
    },
  },
  props: {
    text: {
      type: String,
      default: 'Your text there',
    },
    isHover: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltipe-wrapper {
  position: relative;

  .tooltipe {
    position: absolute;

    padding: 16px;
    margin-top: 10px;

    width: max-content;

    border-radius: 8px;
    background: #ffffff;
    z-index: 10;

    .tooltipe-content {
      max-width: 600px;
    }

    .triangle {
      position: absolute;

      top: 0;
      left: 12px;

      transform: translateY(-100%);
      border: 7.5px solid transparent; /* Прозрачные границы */
      border-bottom: 7.5px solid #ffffff; /* Добавляем треугольник */
    }

    .is-triangle-left {
      left: auto;
      right: 12px;
    }
  }
}

@include xs {
  .tooltipe-wrapper .tooltipe .tooltipe-content {
    max-width: 200px;
  }
}
</style>
