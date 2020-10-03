<template>
  <VSlideYTransition mode="out-in">
    <VLayout
      v-if="loaded"
      wrap
    >
      <VFlex
        lg4
        md12
        xs12
      >
        <MaterialTracerCrawlCard
          title="作者爬虫运行状况"
          :value="authorCrawlLength"
        />
      </VFlex>
      <VFlex
        lg4
        xs12
        md12
      >
        <MaterialTracerCrawlCard
          title="视频爬虫运行状况"
          :value="videoCrawlLength"
        />
      </VFlex>
      <VFlex
        lg4
        xs12
        md12
      >
        <MaterialProgressCard
          :hidden="progressColor == ''"
          :title="`${progressTask.task_name}`"
          :value="progressTask.current_value"
          :small-value="progressTask.total_value"
          :sub-text="progressTask.msg"
          sub-icon="mdi-calendar"
          :sub-text-color="progressColor"
          :color="progressColor"
        />
      </VFlex>
      <VFlex
        lg3
        xs12
        md12
      >
        <MaterialStatsCard
          :value="userCount"
          title="观测者总数"
          icon="mdi-telescope"
          sub-icon="mdi-calendar-blank"
          small-value="人"
          color="info"
          :sub-text="currentDate"
        />
      </VFlex>
      <VFlex
        lg3
        xs12
        md12
      >
        <MaterialStatsCard
          :value="checkedInCount"
          title="8小时内签到用户数"
          icon="mdi-account-check"
          color="info"
          small-value="人"
          sub-icon="mdi-calendar-blank"
          :sub-text="currentDate"
        />
      </VFlex>
      <VFlex
        lg3
        md12
        xs12
      >
        <MaterialStatsCard
          :value="recordCount"
          title="观测者有效操作数"
          icon="mdi-receipt"
          color="info"
          small-value="次"
          sub-icon="mdi-calendar-blank"
          :sub-text="currentDate"
        />
      </VFlex>
      <VFlex
        lg3
        md12
        xs12
      >
        <MaterialStatsCard
          value="计划任务系统"
          title="存在检测"
          icon="mdi-timer"
          color="info"
          small-value=""
          sub-icon="mdi-check-circle"
          sub-text="正常运行中..."
          sub-text-color="green"
        />
      </VFlex>
      <VFlex
        lg4
        md12
        xs12
      >
        <MaterialChartCard :options="userOptions">
          <h4>用户经验值分布</h4>
        </MaterialChartCard>
      </VFlex>
      <VFlex
        lg4
        md12
        xs12
      >
        <MaterialChartCard :options="signInOptions">
          <h4>每月注册用户增量</h4>
        </MaterialChartCard>
      </VFlex>
      <VFlex
        lg4
        md12
        xs12
      >
        <MaterialChartCard :options="checkInOptions">
          <h4>每周活跃注册用户数</h4>
        </MaterialChartCard>
      </VFlex>
    </VLayout>
  </VSlideYTransition>
</template>

<script>
import getCardChart from "@/charts/get-card-chart.js";
var format = require("date-fns/format");
export default {
  data() {
    return {
      loaded: false,
      userCount: String(),
      sumSpiderCount: String(),
      checkedInCount: String(),
      currentDate: String(),
      progressTask: Object(),
      scheduleTask: Object(),
      userOptions: Object(),
      checkInOptions: Object(),
      signInOptions: Object(),
      recordCount: String(),
      authorCrawlLength: Object(),
      videoCrawlLength: Object()
    };
  },
  computed: {
    progressColor() {
      switch (this.progressTask != null && this.progressTask.status) {
        case 9:
          return "green";
        case 4:
          return "red";
        case 2:
          return "orange";
        default:
          return "";
      }
    }
  },
  mounted() {
    this.currentDate = format(new Date(), "YYYY-MM-DD HH:mm");
    this.axios.get("/tracer/exists-tasks").then((r) => {
      this.scheduleTask = r.data;
    });

    this.axios.get(`/tracer/dashboard`).then((r) => {
      this.sumSpiderCount = r.data.sumSpiderCount;
      this.checkedInCount = r.data.checkedInCount;
      this.recordCount = r.data.recordCount;
      this.userCount = r.data.userCount;
      this.authorCrawlLength = r.data.authorCrawlLength;
      this.videoCrawlLength = r.data.videoCrawlLength;
      this.updateTask(r.data);

      let data = r.data.userBucketResult;
      let userX = data.map((x) => {
        if (x._id.min == null) {
          x._id.min = "未签到";
        } else {
          x._id.min = ">" + x._id.min;
        }
        return x._id.min;
      });
      let userY = data.map((x) => {
        return x.count;
      });
      this.userOptions = getCardChart(userX, userY, "bar");
      this.signInOptions = getCardChart(
        r.data.monthlySignIn.map((e) => {
          return e.month + "月";
        }),
        r.data.monthlySignIn.map((e) => {
          return e.count;
        }),
        "line"
      );
      this.checkInOptions = getCardChart(
        r.data.weeklyCheckIn.map((e) => {
          return "第" + e.week + "周";
        }),
        r.data.weeklyCheckIn.map((e) => {
          return e.count;
        }),
        "bar"
      );
      this.loaded = true;
    });
    let timer = setInterval(this.getLatestTaskInfo, 5000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getUpdateTime() {},
    getStatus(value) {
      if (value === "0") {
        return "队列空闲中";
      } else {
        return "正在消化爬取队列";
      }
    },
    getColor(value) {
      if (value === 0 || value === "") {
        return "green";
      } else {
        return "orange";
      }
    },
    successRate(item) {
      if (item.crawlCount == 0) {
        return "-";
      } else {
        return (
          (100 - (item.crawlFailed / item.crawlCount) * 100).toFixed(2) + "%"
        );
      }
    },
    updateTask(data) {
      if (data.lastRunningProgressTask == null) {
        this.progressTask = data.lastFinishedProgressTask;
      } else {
        this.progressTask = data.lastRunningProgressTask;
      }
    },
    getLatestTaskInfo() {
      this.axios.get(`/tracer/latest-progress`).then((r) => {
        this.updateTask(r.data);
      });
      this.axios.get(`/tracer/latest-spider`).then((r) => {
        this.authorCrawlLength = r.data.authorCrawlLength;
        this.videoCrawlLength = r.data.videoCrawlLength;
      });
    }
  }
};
</script>
