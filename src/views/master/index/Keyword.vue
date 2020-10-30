<template>
  <VRow dense>
    <VCol cols="12">
      <MainDetailCharts
        v-if="notFound == false"
        class="mb-2"
        title="见齐指数变化趋势"
        :height="300"
        :options="options"
      />
      <BiliobCard
        v-else
        title="提示"
      >
        <VCardTitle>
          <h2 class="primary--text">
            未能找到关键词为「
            <span class="error--text">{{ $route.params.keyword }}</span>」的指数
          </h2>
        </VCardTitle>
        <VCardText>
          这可能是因为该关键词的出现频率过低，或是未完全抓取到相关视频条目。
        </VCardText>
      </BiliobCard>
    </VCol>
    <VCol cols="12">
      <BiliobTitle>领衔作者 </BiliobTitle>
    </VCol>
    <VCol
      v-for="(a,i) in authors == undefined? [] :authors"
      :key="i"
      cols="12"
      lg="6"
    >
      <BiliobAuthorInfoCard :author="a" />
    </VCol>
  </VRow>
</template>

<script>
// import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";
import getOptions from "@/charts/data-set-chart.js";
// import getIndexOptions from "@/charts/data-with-ma.js";
export default {
  data() {
    return {
      data: "",
      options: Object(),
      notFound: false,
      authors: undefined
    };
  },
  watch: {
    "$route.params.keyword"() {
      this.updateData();
    }
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      window.document.title = `${this.$route.params.keyword} - 见齐指数 - BiliOB观测者 - B站历史数据统计分析站点`;
      this.options = Object();
      this.notFound = false;
      this.axios
        .get(`/video/v3/topic-author?kw=${this.$route.params.keyword}`)
        .then((res) => {
          this.authors = res.data;
        });

      this.axios
        .get(`/video/v3/index?kw=${this.$route.params.keyword}`)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (i < 7) {
              res.data[i].week = "-";
              continue;
            }
            res.data[i].week = (
              _(res.data)
                .slice(i - 7, i)
                .sumBy((d) => d.val) / 7
            ).toFixed(0);
          }
          this.data = res.data;
          if (this.data.length == 0) {
            this.notFound = true;
            return;
          }
          this.options = getOptions(this.data, "_id", {
            week: "周均线",
            val: "日均线"
          });
        });
    }
  }
};
</script>

<style></style>
