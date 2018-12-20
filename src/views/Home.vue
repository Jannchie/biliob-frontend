<template>
  <div>
    <SiteChart :site-data="siteData"></SiteChart>
  </div>
</template>
<script>
import SiteChart from "../components/main/SiteChart.vue";
export default {
  components: { SiteChart },
  data() {
    return {
      siteData: Object()
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.axios.get(`/site`).then(response => {
      this.siteData = response.data;
    });
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
