<template>
  <div>
    <DetailCharts />
  </div>
</template>
<script>
import DetailCharts from "../components/main/DetailCharts.vue";

export default {
  components: { DetailCharts },
  data() {
    return {
      siteData: Object(),
      onlineOptions: Object(),
      firstMid: Number(),
      secondMid: Number()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get("/author?page=0&pageSize=2&sort=0").then((r) => {
      this.firstMid = r.data.content[0].mid;
      this.secondMid = r.data.content[1].mid;
    });
  }
};
</script>
