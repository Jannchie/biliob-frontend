<template>
  <MainDetailCharts
    :options="tagOptions"
    title="全站飙升关键词"
    sub-title="统计包括最近一周"
  />
</template>
<script>
import getOptions from "../../charts/cloud-charts.js";
export default {
  data() {
    return {
      tagOptions: Object()
    };
  },
  mounted() {
    this.axios.get(`/video/popular-keyword`).then(r => {
      let data = r.data.map(e => {
        return { name: e._id, value: e.value };
      });
      let size = window.innerWidth / 15;
      if (size <= 60) {
        size = 60;
      }
      this.tagOptions = getOptions(data, size);
    });
  }
};
</script>
