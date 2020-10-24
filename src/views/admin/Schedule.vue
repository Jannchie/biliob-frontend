<template>
  <VContainer>
    <VRow>
      <VCol cols="12">
        <AdminProgressCard
          :hidden="progressColor == ''"
          :title="`${progressTask.task_name}`"
          :value="progressTask.current_value"
          :small-value="progressTask.total_value"
          :sub-text="progressTask.msg"
          sub-icon="mdi-calendar"
          :sub-text-color="progressColor"
          :color="progressColor"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <VDataTable
          :headers="headers"
          :items="progressTasks"
          :items-per-page="20"
          class="elevation-1"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
import { distanceInWords } from "date-fns";
var cnLocale = require("date-fns/locale/zh_cn");

export default {
  data() {
    return {
      progressTask: Object(),
      progressTasks: Array(),
      headers: [
        { text: "计划任务名称", value: "taskName" },
        { text: "服务器名称", value: "computerName" },
        { text: "距离上次运行", value: "distanceTime" },
        { text: "上次运行耗时", value: "lastTime" },
        { text: "状态", value: "msg" }
      ],
      authorListLength: "",
      videoListLength: ""
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
    this.getLatestTaskInfo();
    this.axios(`/tracer/progress-task`).then((r) => {
      this.progressTasks = r.data.content;
      this.progressTasks.forEach((item) => {
        item["lastTime"] = this.lastTime(item.startTime, item.updateTime);
        item["distanceTime"] = this.lastTime(
          item.startTime.replace("+00:00", ""),
          new Date()
        );
      });
    });
    this.axios(`/tracer/author-queue`).then((r) => {
      this.authorListLength = String(r.data.length);
    });
    this.axios(`/tracer/video-queue`).then((r) => {
      this.videoListLength = String(r.data.length);
    });
    let timer = setInterval(this.getLatestTaskInfo, 5000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    lastTime(startTime, updateTime) {
      return distanceInWords(startTime, updateTime, { locale: cnLocale });
    },
    getStatus(value) {
      if (value === "0") {
        return "队列空闲中";
      } else {
        return "正在消化爬取队列";
      }
    },
    getColor(value) {
      if (value === "0" || value === "") {
        return "green";
      } else {
        return "orange";
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
    },
    successRate(item) {
      if (item.crawlCount == 0) {
        return "-";
      } else {
        return (
          (100 - (item.crawlFailed / item.crawlCount) * 100).toFixed(2) + "%"
        );
      }
    }
  }
};
</script>
