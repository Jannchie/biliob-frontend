<template>
  <VChip
    style="vertical-align: unset"
    x-small
    class="px-1 mr-2"
    label
    outlined
    :color="`${color}`"
  >
    {{ displayType }}
  </VChip>
</template>

<script>
export default {
  props: {
    type: String()
  },
  computed: {
    // 1: 番剧
    // 2: 电影
    // 3: 纪录片
    // 4: 国创
    // 5: 电视剧
    // 7: 综艺
    color() {
      if (this.type == 1) {
        return "pink";
      } else if (this.type == 2) {
        return "green";
      } else if (this.type == 3) {
        return "green";
      } else if (this.type == 4) {
        return "red";
      } else if (this.type == 5) {
        return "orange";
      } else if (this.type == 6) {
        return "black";
      } else if (this.type == 7) {
        return "orange";
      }
      return "black";
    },
    displayType() {
      if (this.type == 1) {
        return "番剧";
      } else if (this.type == 2) {
        return "电影";
      } else if (this.type == 3) {
        return "纪录片";
      } else if (this.type == 4) {
        return "国创";
      } else if (this.type == 5) {
        return "电视剧";
      } else if (this.type == 6) {
        return "不明";
      } else if (this.type == 7) {
        return "综艺";
      }
      return "不明";
    }
  }
};
</script>

<style></style>
