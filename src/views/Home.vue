<template>
  <div>
    <AuthorVersusCard
      :a-mid="firstMid"
      :b-mid="secondMid"
      title="粉丝数榜首争夺"
      a-title="冠军"
      b-title="亚军"
    />
    <SiteChart :site-data="siteData" />
    <!-- <DetailCharts :options="onlineOptions"></DetailCharts> -->
  </div>
</template>
<script>
import AuthorVersusCard from "../components/main/AuthorVersusCard.vue";
import SiteChart from "../components/main/SiteChart.vue";
// import DetailCharts from "../components/main/DetailCharts.vue";
// import getOnlineOptions from "../charts/online.js";

export default {
  components: { SiteChart, AuthorVersusCard },
  data() {
    return {
      siteData: Object(),
      onlineOptions: Object(),
      firstMid: Number(),
      secondMid: Number(),
      thirdMid: Number()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get(`/site`).then(response => {
      this.siteData = response.data;
    });
    this.axios.get("/author?page=0&pageSize=3&sort=0").then(r => {
      this.firstMid = r.data.content[0].mid;
      this.secondMid = r.data.content[1].mid;
      this.thirdMid = r.data.content[2].mid;
    });
    // this.axios.get(`/video/online`).then(response => {
    //   this.onlineOptions = getOnlineOptions(response.data);
    // });
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
