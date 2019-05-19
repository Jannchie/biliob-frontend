<template>
  <VLayout wrap>
    <VFlex
      lg3
      md12
    >
      <MaterialStatsCard
        :value="sumSpiderCount"
        title="正在爬取爬虫数"
        small-value="个"
        icon="mdi-spider-web"
        sub-icon="mdi-check-circle"
        sub-text="正常运行中..."
        sub-text-color="green"
      ></MaterialStatsCard>
    </VFlex>
    <VFlex
      lg9
      md12
    >
      <MaterialProgressCard
        title="任务名称"
        value="1000"
        small-value="1150"
        sub-text="任务执行中"
        sub-icon="mdi-calendar"
        sub-text-color="orange"
      ></MaterialProgressCard>
    </VFlex>
    <VFlex
      lg3
      md12
    >
      <MaterialStatsCard
        :value="userCount"
        title="观测者总数"
        icon="mdi-telescope"
        sub-icon="mdi-calendar-blank"
        small-value="人"
        :sub-text="currentDate"
      ></MaterialStatsCard>
    </VFlex>
    <VFlex
      lg3
      md12
    >
      <MaterialStatsCard
        :value="checkedInCount"
        title="8小时内签到用户数"
        icon="mdi-account"
        small-value="人"
        sub-icon="mdi-calendar-blank"
        :sub-text="currentDate"
      ></MaterialStatsCard>
    </VFlex>

  </VLayout>
</template>

<script>
var format = require("date-fns/format");
export default {
  data() {
    return {
      userCount: Number(),
      sumSpiderCount: Number(),
      checkedInCount: Number(),
      currentDate: String()
    };
  },
  mounted() {
    this.currentDate = format(new Date(), "YYYY-MM-DD HH:mm");
    this.axios.get(`/tracer/dashboard`).then(r => {
      this.sumSpiderCount = r.data.sumSpiderCount;
      this.checkedInCount = r.data.checkedInCount;
      this.userCount = r.data.userCount;
    });
  },
  methods: {
    getUpdateTime() {}
  }
};
</script>
