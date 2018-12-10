<template>
  <VCard class="card">
    <VCardText  class='card-holder'>
        <Chart class="chart" theme="light" :auto-resize="true" :options="siteOptions" style="width:100%;" ></Chart>
    </VCardText >
  </VCard>
</template>

<script>
import drawSitePlay from "../../charts/site_play.js";
export default {
  props: { siteData: Object() },
  data() {
    return {
      siteOptions: Object()
    };
  },
  watch: {
    siteData: function(val) {
      this.siteData = val;
      this.siteOptions = drawSitePlay(val);
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
