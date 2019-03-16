<template>
  <div>
    <SiteChart :site-data="siteData" />
    <DetailCharts :options="onlineOptions"></DetailCharts>
  </div>
</template>
<script>
import SiteChart from "../components/main/SiteChart.vue";
import DetailCharts from "../components/main/DetailCharts.vue";
import getOnlineOptions from "../charts/online.js";

export default {
  components: { SiteChart, DetailCharts },
  data() {
    return {
      siteData: Object(),
      onlineOptions: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get(`/site`).then(response => {
      this.siteData = response.data;
    });
    this.axios.get(`/video/online`).then(response => {
      this.onlineOptions = getOnlineOptions(response.data);
    });
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
