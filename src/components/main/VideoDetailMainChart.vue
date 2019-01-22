<template>
  <VCard class="card">
    <VCardText class="card-holder">
      <Chart
        id="chart-1"
        :theme="theme"
        :auto-resize="true"
        :options="mainChart"
        style="width:100%;height:25vmax;"
      />
    </VCardText>
  </VCard>
</template>

<script>
export default {
  props: { mainChart: Object() },
  data() {
    return {
      theme: "light"
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
        this.theme = "dark";
      } else {
        this.theme = "light";
      }
    }
  },
  mounted() {
    if (this.$store.state.dark) {
      this.theme = "dark";
    } else {
      this.theme = "light";
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
