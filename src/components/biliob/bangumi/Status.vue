<template>
  <VChip
    style="vertical-align: unset"
    x-small
    class="px-1 mr-2"
    label
    outlined
    :color="`${showColor} lighten-2`"
  >
    {{ displayText }}
  </VChip>
</template>

<script>
export default {
  props: {
    serializing: Boolean(),
    finished: Boolean(),
    state: Number()
  },
  computed: {
    displayText() {
      if (this.state == -1) return "已下架";
      else if (this.finished) return "已完结";
      else if (this.serializing) return "连载中";
      else return "未开播";
    },
    showColor() {
      if (this.state == -1) return "grey";
      else if (this.finished) return "pink";
      else if (this.serializing) return "green";
      else return "red";
    }
  }
};
</script>

<style></style>
