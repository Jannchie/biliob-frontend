<template>
  <div>
    <AuthorVersusCard
      :a-mid="firstMid"
      :b-mid="secondMid"
      title="粉丝数榜首争夺"
      a-title="冠军"
      b-title="亚军"
    />
    <DetailCharts :options="siteData" />
    <!-- <DetailCharts :options="onlineOptions"></DetailCharts> -->
  </div>
</template>
<script>
import AuthorVersusCard from "../components/main/AuthorVersusCard.vue";
import DetailCharts from "../components/main/DetailCharts.vue";
import drawSitePlay from "../charts/site_play.js";
// import getOnlineOptions from "../charts/online.js";

export default {
  components: { AuthorVersusCard, DetailCharts },
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
      this.siteData = drawSitePlay(response.data);
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
