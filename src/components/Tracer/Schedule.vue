<template>
  <VFadeTransition mode="out-in">
    <VLayout
      v-if="loaded"
      wrap
    >
      <VFlex md12>
        <MaterialProgressCard
          :hidden="progressColor == ''"
          :title="`${progressTask.task_name}`"
          :value="progressTask.current_value"
          :small-value="progressTask.total_value"
          :sub-text="progressTask.msg"
          sub-icon="mdi-calendar"
          :sub-text-color="progressColor"
          :color="progressColor"
        ></MaterialProgressCard>
      </VFlex>

      <VFlex lg12>

        <MaterialCard
          color="green"
          title="计划任务运行情况"
          text="计划任务运行时长和耗时分析"
        >
          <VDataTable
            :headers="headers"
            :items="progressTasks"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.taskName }}</td>
              <td>{{ item.computerName }}</td>
              <td>{{ lastTime(item.startTime.replace('+0000',''),new Date())}}</td>
              <td>{{ lastTime(item.startTime,item.updateTime)}}</td>
              <td>{{ item.msg}}</td>

            </template>
          </VDataTable>
        </MaterialCard>
      </VFlex>
    </VLayout>
  </VFadeTransition>
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
        { text: "爬虫名称", sortable: false },
        { text: "服务器名称", sortable: false },
        { text: "距离上次运行", sortable: false },
        { text: "上次运行耗时", sortable: false },
        { text: "状态", sortable: false }
      ],
      authorListLength: "",
      videoListLength: "",
      loaded: false
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
    this.axios(`/tracer/progress-task`).then(r => {
      this.progressTasks = r.data.content;
    });
    this.axios(`/tracer/author-queue`).then(r => {
      this.authorListLength = String(r.data.length);
    });
    this.axios(`/tracer/video-queue`).then(r => {
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
      this.axios.get(`/tracer/latest-progress`).then(r => {
        this.updateTask(r.data);
        this.loaded = true;
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
