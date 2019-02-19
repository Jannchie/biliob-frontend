<template>
  <VLayout v-bind="binding">
    <VFlex
      lg8
      md12
    >
      <slot name="main-cards" />
    </VFlex>
    <VFlex
      lg4
      md12
    >
      <slot name="aside-cards" />
    </VFlex>
  </VLayout>
</template>
<script>
export default {
  computed: {
    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true;
      return binding;
    }
  }
};
</script>
<style>
@media only screen and (max-width: 1029px) {
  .main-container {
    padding: 16px 0;
  }
}
@media only screen and (min-width: 960px) {
  .container {
    max-width: 1500px;
  }
}
</style>
