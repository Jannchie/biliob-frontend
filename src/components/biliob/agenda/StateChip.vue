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
        case 0:
          return "等待处理";
        case 1:
          return "已经完成";
        case 2:
          return "已被关闭";
        case 3:
          return "正在处理";
        default:
          return "议题重复";
      }
    },
    color() {
      switch (this.value) {
        case 0:
          return "orange";
        case 1:
          return "green";
        case 2:
          return "red";
        case 3:
          return "blue";
        default:
          return "red";
      }
    }
  }
};
</script>

<style>
</style>