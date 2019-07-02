<template>
  <VLayout wrap>
    <VFlex lg4 md12>
      <MaterialStatsCard
        :value="spiderTasks.length"
        title="正在爬取爬虫数"
        small-value="个"
        icon="mdi-spider-web"
        sub-icon="mdi-check-circle"
        sub-text="正常运行中..."
        sub-text-color="green"
        color="green"
      ></MaterialStatsCard>
    </VFlex>
    <VFlex lg4 md12>
      <MaterialTracerCrawlCard
        title="作者爬虫运行状况"
        :value="authorListLength"
      ></MaterialTracerCrawlCard>
    </VFlex>

    <VFlex lg4 md12>
      <MaterialTracerCrawlCard
        title="视频爬虫运行状况"
        :value="videoListLength"
      ></MaterialTracerCrawlCard>
    </VFlex>
    <VFlex lg12>
      <MaterialCard
        color="green"
        title="运行中爬虫详细信息"
        text="此处显示的是目前正在运行中的爬虫状态"
      >
        <VDataTable :headers="headers" :items="spiderTasks" hide-actions>
          <template slot="headerCell" slot-scope="{ header }">
            <span
              class="subheading font-weight-light text-success text--darken-3"
              v-text="header.text"
            />
          </template>
          <template slot="items" slot-scope="{ item }">
            <td>{{ item.taskName }}</td>
            <td>{{ item.computerName }}</td>
            <td>{{ item.crawlCount }}</td>
            <td>{{ successRate(item) }}</td>
            <td>{{ lastTime(item.startTime, item.updateTime) }}</td>
          </template>
        </VDataTable>
      </MaterialCard>
    </VFlex>
  </VLayout>
</template>
<script>
import { distanceInWords } from "date-fns";
var cnLocale = require("date-fns/locale/zh_cn");
export default {
  data() {
    return {
      spiderTasks: Array(),
      headers: [
        { text: "爬虫名称", sortable: false },
        { text: "服务器名称", sortable: false },
        { text: "爬取次数", sortable: false },
        { text: "成功率", sortable: false },
        { text: "持续运行时间", sortable: false }
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
    this.axios(`/tracer/spider-tasks?type=1`).then(r => {
      this.spiderTasks = r.data.content;
    });
    this.axios(`/tracer/author-queue`).then(r => {
      this.authorListLength = r.data.length;
    });
    this.axios(`/tracer/video-queue`).then(r => {
      this.videoListLength = r.data.length;
    });
    let timer = setInterval(this.getLatestSpiderInfo, 5000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getLatestSpiderInfo() {
      this.axios.get(`/tracer/latest-spider`).then(r => {
        this.authorCrawlLength = r.data.authorCrawlLength;
        this.authorCrawlLength = r.data.videoCrawlLength;
      });
    },
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
    }
  }
};
</script>
