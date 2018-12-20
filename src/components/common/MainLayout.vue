<template>
    <VLayout v-bind="binding">
      <VFlex lg8 md12>
        <slot name="main-cards"></slot>
      </VFlex>
      <VFlex lg4 md12>
        <slot name="aside-cards" class=" hidden-lg-and-down"></slot>
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
<style scoped>
@media only screen and (max-width: 1029px) {
  .main-container {
    padding: 16px 0;
  }
}
</style>
