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
      <BiliobCard v-else title="提示">
        <VCardTitle>
          <h2 class="primary--text">
            未能找到关键词为「
            <span class="error--text">{{ $route.params.keyword }}</span
            >」的指数
          </h2></VCardTitle
        >
        <VCardText>
          这可能是因为该关键词的出现频率过低，或是未完全抓取到相关视频条目。
        </VCardText>
      </BiliobCard>
    </VCol>
  </VRow>
</template>

<script>
import getMultiChartOptions from "@/charts/biliob-multi-line-chart.js";

export default {
  data() {
    return {
      data: "",
      options: Object(),
      notFound: false
    };
  },
  watch: {
    "$route.params.keyword"() {
      this.updateData();
    }
  },
  mounted() {
    console.log(this.$route.params.keyword);
    this.updateData();
  },
  methods: {
    updateData() {
      window.document.title = `${this.$route.params.keyword} - 见齐指数 - BiliOB观测者 - B站历史数据统计分析站点`;
      this.options = Object();
      this.notFound = false;
      this.axios
        .get(`/index?keyword=${this.$route.params.keyword}`)
        .then(res => {
          this.data = res.data;
          if (this.data.data.length == 0) {
            this.notFound = true;
            return;
          }
          this.options = getMultiChartOptions(
            [this.getData(this.data)],
            "line",
            "YYYY-MM-DD"
          );
        });
    },
    getDateRange(start, end, step = 1) {
      let result = [];
      while (start.getTime() <= end.getTime()) {
        result.push(start);
        start = new Date(start.getTime() + 86400000 * step);
      }
      return result;
    },
    getData(data) {
      // let rate = (m, x) => (Math.pow(m, x) / fact(x)) * Math.pow(2.71, -m);
      let dataList = [];
      let dateRange = this.getDateRange(
        this.$dateParse(data.data[0].datetime),
        this.$dateParse(data.data[data.data.length - 1].datetime)
      );
      dataList = dateRange.map(e => [e, 0]);
      data.data.forEach(d => {
        // 发布时间
        let datetime = this.$dateParse(d.datetime);
        let value = d.jannchie;

        dataList.forEach(item => {
          let deltaTime = item[0].getTime() - datetime.getTime();
          let deltaDay = deltaTime / 86400000;

          if (deltaDay >= 0) {
            // item[1] += Math.round(value * Math.pow(dailyDelta, deltaDay) * k);
            item[1] += Math.round(
              ((value * Math.pow(deltaDay / 7, 2)) / 2) *
                Math.pow(2.71, -deltaDay / 7)
            );
          }
        });
      });
      return [dataList, data.name, "#1e88e5"];
    }
  }
};
</script>

<style></style>
