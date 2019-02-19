<template>
  <VCard class="card">
    <VCardText class="card-holder">
      <Chart
        class="chart"
        :theme="theme"
        :auto-resize="true"
        :options="siteOptions"
        style="width:100%;"
      />
    </VCardText>
  </VCard>
</template>

<script>
import drawSitePlay from "../../charts/site_play.js";
export default {
  props: { siteData: Object() },
  data() {
    return {
      siteOptions: Object(),
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
    },
    siteData: function(val) {
      this.siteData = val;
      this.siteOptions = drawSitePlay(val);
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
.chart {
  height: 25vmax;
}
@media only screen and (max-width: 1029px) {
  .chart {
    height: 60vmin;
  }
}
</style>
