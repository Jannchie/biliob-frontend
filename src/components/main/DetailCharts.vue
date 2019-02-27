<template>
  <VCard class="card">
    <VResponsive :aspect-ratio="aspectRatio">
      <Chart
        :theme="theme"
        :auto-resize="true"
        :options="options"
        style="width:100%;height:100%;"
      />
    </VResponsive>
  </VCard>
</template>

<script>
export default {
  props: { options: Object(), aspectRatio: { type: Number, default: 2 } },
  data() {
    return {
      videoData: {},
      theme: "colorful"
    };
  },
  computed: {
    isDark() {
      return this.$store.state.dark;
    }
  },
  watch: {
    isDark(val) {
      if (val) {
        this.theme = "mydark";
      } else {
        this.theme = "colorful";
      }
    }
  },
  mounted() {
    if (this.$store.state.dark) {
      this.theme = "mydark";
    } else {
      this.theme = "colorful";
    }
  }
};
</script>

<style scoped>
.video-img {
  height: 70px;
  border-radius: 4px;
}
</style>
