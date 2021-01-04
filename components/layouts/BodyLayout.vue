<template>
  <main>
    <slot name="default" />
    <AuthLayout v-if="activeModalWindowName.length" />
  </main>
</template>

<script>
import { mapState } from 'vuex';
// layouts
import AuthLayout from '~/components/layouts/AuthLayout.vue';

export default {
  name: 'BodyLayout',
  computed: {
    ...mapState({ activeModalWindowName: (state) => state.activeModalWindowName }),
  },
  components: {
    AuthLayout,
  },
};
</script>

<style lang="scss" scoped></style>
