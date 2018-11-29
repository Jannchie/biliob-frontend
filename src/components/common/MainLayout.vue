<template>
  <VContainer grid-list-md>
    <VLayout v-bind="binding">
      <VFlex lg8 md12>
        <slot name="main-cards"></slot>
      </VFlex>
      <VFlex lg4 md12>
        <slot name="aside-cards"></slot>
      </VFlex>
    </VLayout>
  </VContainer>
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
.container {
  padding: 0px;
}
</style>
