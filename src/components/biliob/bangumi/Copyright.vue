<template>
  <VChip
    style="vertical-align: unset"
    x-small
    class="px-1 mr-2"
    label
    outlined
    color="pink lighten-2"
  >
    {{ displayCopyright }} {{ charge }}
  </VChip>
</template>

<script>
export default {
  props: {
    copyright: String(),
    charge: String()
  },
  computed: {
    displayCopyright() {
      if (this.copyright == "dujia") {
        return "B站独家";
      } else if (this.copyright == "bilibili") {
        return "B站正版";
      } else if (this.copyright == "ugc") {
        return "UGC";
      }
      return this.copyright;
    }
  }
};
</script>

<style></style>
