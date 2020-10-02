<template>
  <VContainer>
    <VRow>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminStatsCard
          :value="spiderTasks.length"
          title="正在爬取爬虫数"
          small-value="个"
          icon="mdi-spider-web"
          sub-icon="mdi-check-circle"
          sub-text="正常运行中..."
          sub-text-color="green"
          color="green"
        />
      </VCol>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminCrawlCard
          title="作者爬虫运行状况"
          :value="authorListLength"
        />
      </VCol>
      <VCol
        cols="12"
        lg="4"
      >
        <AdminCrawlCard
          title="视频爬虫运行状况"
          :value="videoListLength"
        />
      </VCol>
    </VRow>
    <VRow>
      <VCol>
        <BiliobCard
          title="运行中爬虫详细信息"
          text="此处显示的是目前正在运行中的爬虫状态"
          border="bottom"
          light
        >
          <VDataTable
            :headers="headers"
            :items="spiderTasks"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success "
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.taskName }}</td>
              <td>{{ item.computerName }}</td>
              <td>{{ item.crawlCount }}</td>
              <td>{{ successRate(item) }}</td>
              <td>{{ lastTime(item.startTime, item.updateTime) }}</td>
            </template>
          </VDataTable>
        </BiliobCard>
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
      spiderTasks: Array(),
      headers: [
        { text: "爬虫名称", value: "taskName" },
        { text: "服务器名称", value: "computerName" },
        { text: "爬取次数", value: "crawlCount" },
        { text: "成功率", value: "successRate" },
        { text: "持续运行时间", value: "lastTime" }
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
      this.spiderTasks = r.data.content.map(item => {
        return {
          taskName: item.taskName,
          computerName: item.computerName,
          crawlCount: item.crawlCount,
          successRate: this.successRate(item),
          lastTime: this.lastTime(item.startTime, item.updateTime)
        };
      });
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
