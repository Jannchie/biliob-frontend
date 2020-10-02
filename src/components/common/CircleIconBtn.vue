<template>
  <VBtn
    icon
    :class="`grey ${brightness}-2`"
    small
  >
    <VIcon
      :class="iconClass"
      small
    >
      <slot />
    </VIcon>
  </VBtn>
</template>
<script>
export default {
  computed: {
    brightness() {
      if (this.$store.state.dark) {
        return "lighten";
      } else {
        return "darken";
      }
    },
    iconClass() {
      if (this.$store.state.dark) {
        return "icon-dark";
      } else {
        return "icon-light";
      }
    }
  }
};
</script>
<style scoped>
.icon-dark {
  color: #424242 !important;
}
.icon-light {
  color: #fff !important;
}
</style>
