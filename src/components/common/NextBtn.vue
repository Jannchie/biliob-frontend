<template>
  <VBtn
    block
    outlined
    style="border-width:1px"
    tile
    color="primary"
    :disabled="nextBtnDisabled"
    @click.stop="getData"
  >
    {{ nextBtnText }}
  </VBtn>
</template>
<script>
export default {
  props: {
    apiUrl: String()
  },
  data() {
    return {
      nextBtnDisabled: Boolean(),
      text: String(),
      nextBtnText: "请给我更多..."
    };
  },
  watch: {},
  methods: {
    getData() {
      this.axios.get(this.apiUrl).then(r => {
        if (r.data.last) {
          this.nextBtnText = "没有更多了";
          this.nextBtnDisabled = true;
        }
        this.$emit("getMoreData", r.data.content, r.data.number);
      });
    }
  }
};
</script>
