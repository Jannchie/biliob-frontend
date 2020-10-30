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
    this.axios.get(`/video/v3/popular-tag?d=7`).then((r) => {
      let data = r.data.map((e) => {
        if (
          [
            "搞笑",
            "生活",
            "日常",
            "电子竞技",
            "新人",
            "萌宠",
            "美食",
            "娱乐",
            "漫画",
            "吐槽",
            "搞笑剪辑",
            "手机游戏",
            "情感",
            "沙雕",
            "搞笑视频",
            "精彩集锦",
            "游戏视频",
            "高能",
            "直播录像",
            "悬疑",
            "惊悚",
            "影评",
            "吃货",
            "翻唱",
            "日文翻唱",
            "外语翻唱",
            "单机游戏",
            "奇葩",
            "精彩操作",
            "预告片",
            "校园",
            "搞笑挑战",
            "单机联机"
          ].indexOf(e._id) != -1
        )
          e.value = 0;
        return { name: e._id, value: e.value };
      });
      this.tagOptions = getOptions(data);
    });
  }
};
</script>
