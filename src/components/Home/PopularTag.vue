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
        if (e._id == "搞笑") e.value = 0;
        return { name: e._id, value: e.value };
      });
      this.tagOptions = getOptions(data);
    });
  }
};
</script>
