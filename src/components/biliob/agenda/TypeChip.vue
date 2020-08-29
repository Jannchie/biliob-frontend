<template>
  <VChip
    class="mr-2"
    label
    outlined
    small
    :color="color"
  >
    {{ text }}
  </VChip>
</template>

<script>
export default {
  props: {
    value: { default: 4, type: Number }
  },
  computed: {
    text() {
      switch (this.value) {
        case 1:
          return "增强功能";
        case 2:
          return "添加功能";
        case 3:
          return "修复错误";
        default:
          return "其他";
      }
    },
    color() {
      switch (this.value) {
        case 1:
          return "blue";
        case 2:
          return "blue";
        case 3:
          return "blue";
        default:
          return "blue";
      }
    }
  }
};
</script>

<style>
</style>