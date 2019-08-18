<template>
  <div>
    <BiliobCard title="数据说明">
      <div class="body-1">
        <li>
          这里可以查询所有<span class="green--text">正在追踪</span>的UP主。
        </li>
        <li>
          <span
            class="white--text px-1 "
            style="background-color:#22AA77;border-radius:2px;margin-right:5px"
          >
            观测中
          </span>
          一天更新一次UP主的数据。
        </li>
        <li>
          <span
            class="white--text px-1 "
            style="background-color:#FF5722;border-radius:2px;margin-right:5px"
            >保守观测</span
          >
          变化幅度太小的UP主数据将停止更新，但可以手动刷新。
        </li>
        <li>
          <span
            class="white--text px-1 "
            style="background-color:#1188CC;border-radius:2px;margin-right:5px"
          >
            强行观测
          </span>
          消耗200积分，可以强行每日更新UP主的数据，即使它本已进入保守观测组。
        </li>
        <VDivider class="my-2"></VDivider>
        <div>
          目前，如果UP主的视频<span>同时在线人数达到全站前20</span>，那么该UP主的数据更新频率会强行加快到<span>每10分钟采集一次</span>。以此获取更加精密实时的数据。
        </div>
      </div>
    </BiliobCard>
    <MaterialChartCard :options="options" class="body-1">
      <p>收录UP主总数 {{ count }}</p>
      <p>正在观测UP主总数 {{ focusCount }}</p>
      <p>强行观测UP主总数 {{ forceFocusCount }}</p>
    </MaterialChartCard>
    <slot name="link" />
  </div>
</template>
<script>
import getCardChart from "@/charts/get-card-chart.js";

export default {
  name: "AuthorListAside",
  data() {
    return {
      count: Number(),
      focusCount: Number(),
      forceFocusCount: Number()
    };
  },
  computed: {
    options() {
      return getCardChart(
        ["收录数", "正在观测", "强行观测"],
        [this.count, this.focusCount, this.forceFocusCount],
        "bar"
      );
    }
  },
  mounted() {
    this.axios(`/site/author/count`).then(response => {
      this.count = response.data.count;
      this.forceFocusCount = response.data.forceFocusCount;
      this.focusCount = response.data.focusCount;
    });
  }
};
</script>
