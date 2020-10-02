<template>
  <VLayout v-bind="binding">
    <VFlex
      lg8
      md12
      order-lg1
      :order-xs2="reverse"
    >
      <slot name="main-cards" />
    </VFlex>
    <VFlex
      lg4
      md12
      order-lg2
      :order-xs1="reverse"
    >
      <slot name="aside-cards" />
    </VFlex>
  </VLayout>
</template>
<script>
export default {
  props: { reverse: { default: false, type: Boolean } },
  computed: {
    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;
      return binding;
    }
  }
};
</script>
<style scoped>
@media only screen and (max-width: 1029px) {
  .main-container {
    padding: 16px 0;
  }
}
</style>
