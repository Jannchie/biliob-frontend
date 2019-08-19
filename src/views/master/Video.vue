<template>
  <VRow>
    <VCol cols="12" md="8">
      <VideoDetailTitle
        slot="title"
        class="mb-2"
        :title="videoData.title"
        :aid="videoData.aid"
        :pic="videoData.pic"
      />
      <VideoDetailRank slot="rank" class="mb-2" v-bind="rank"></VideoDetailRank>
      <DetailCharts
        slot="main"
        class="mb-2"
        title="视频详细历史数据"
        :options="mainChart"
      />
      <DetailCharts
        v-if="hasDanmakuAggregate"
        slot="danmaku-density"
        class="mb-2"
        :options="danmakuDensityOptions"
        title="弹幕统计-弹幕密度"
      />
      <DetailCharts
        slot="like-rate"
        class="mb-2"
        title="各指标比率统计"
        :options="likeRateChart"
      />
      <DetailCharts
        v-if="hasDanmakuAggregate"
        slot="danmaku-cloud"
        class="mb-2"
        title="弹幕统计-弹幕云关键词"
        :options="wordCloudOptions"
      />
      <BiliobCard
        v-if="hasDanmakuAggregate"
        slot="danmaku-switch"
        class="mb-2"
        title="弹幕统计-分P选择"
      >
        <div>
          <VSelect
            v-model="defaultPage"
            class="mb-2"
            solo
            prepend-inner-icon="mdi-video-outline"
            :items="pageItems"
            :messages="
              `<span>选择分P</span><span style='float: right'>更新时间: ${danmakuUpdateTime}</span>`
            "
            @change="pageChange"
          ></VSelect>
        </div>
      </BiliobCard>
    </VCol>
    <VCol cols="12" md="4">
      <AuthorInfo slot="author-operation" :author-data="authorData" />
      <AuthorVideo
        slot="other-video"
        title="UP主其他已追踪视频"
        :author-top-video="otherVideo"
      />
      <VideoOperation
        slot="video-to-bilibili"
        :aid="videoData.aid"
        :pic="videoData.pic"
        :title="videoData.title"
      />
      <Recommand slot="recommand" />
    </VCol>
  </VRow>
</template>
<script>
import VideoDetailRank from "@/components/main/VideoDetailRank.vue";
import VideoDetailTitle from "@/components/main/VideoDetailTitle.vue";
import DetailCharts from "@/components/main/DetailCharts.vue";
import AuthorInfo from "@/components/aside/AuthorInfo.vue";
import AuthorVideo from "@/components/aside/AuthorVideo.vue";
import Recommand from "@/components/aside/Recommand.vue";
import VideoOperation from "@/components/aside/VideoOperation.vue";
import drawMainChart from "@/charts/video-main.js";
import drawVideoPieChart from "@/charts/video-pie.js";
import drawDanmakuCloud from "@/charts/danmaku-cloud.js";
import drawDanmakuDensity from "@/charts/danmaku-density.js";
var deepCopy = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var no = {};
    for (let i in o) {
      no[i] = deepCopy(o[i]);
    }
    return no;
  } else {
    return o;
  }
};
export default {
  name: "VideoDetail",
  components: {
    VideoDetailRank,
    VideoDetailTitle,
    DetailCharts,
    AuthorInfo,
    AuthorVideo,
    Recommand,
    VideoOperation
  },
  data() {
    return {
      videoData: Object(),
      authorData: Object(),
      mainChart: Object(),
      likeRateChart: Object(),
      wordCloudOptions: Object(),
      otherVideo: Object(),
      danmakuDensityOptions: Object(),
      hasDanmakuAggregate: false,
      pageItems: Array(),
      danmakuUpdateTime: "未记录",
      defaultPage: String(),
      rank: { pViewRank: -1, updateTime: Date() }
    };
  },
  watch: {
    "$route.params.aid": function() {
      this.getDataFromAid();
    }
  },
  mounted() {
    this.getDataFromAid();
  },
  methods: {
    pageChange(val) {
      this.redrawDanmakuCharts(val);
    },
    getVideoData(response) {
      this.videoData = response.data;
      document.title = `${
        this.videoData.title
      } - 视频详细数据 - biliOB观测者 - B站历史数据统计分析站点`;
      this.rank = this.videoData.rank;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainChart = drawMainChart(deepCopy(response.data));
      this.likeRateChart = drawVideoPieChart(deepCopy(response.data));
      this.drawDanmakuCloud = drawVideoPieChart(deepCopy(response.data));
      if (
        Object.prototype.hasOwnProperty.call(response.data, "danmakuAggregate")
      ) {
        this.hasDanmakuAggregate = true;
        let pagelist = [];
        for (let eachPage in response.data.danmakuAggregate) {
          pagelist.push(eachPage);
          if (eachPage == "updatetime") {
            this.danmakuUpdateTime = response.data.danmakuAggregate.updatetime;
            continue;
          }
          this.pageItems.push({
            text: `P${eachPage}: ${
              response.data.danmakuAggregate[eachPage]["p_name"]
            }`,
            value: eachPage
          });
          this.defaultPage = this.pageItems[0];
        }
        this.redrawDanmakuCharts(pagelist[0]);
      } else {
        this.hasDanmakuAggregate = false;
      }
    },
    getDataFromAid() {
      this.$store.commit("toVideo");
      this.axios
        .get("/author/" + this.$route.params.mid + "/info")
        .then(response => {
          this.authorData = response.data;
        });
      this.axios.get("/video/" + this.$route.params.aid).then(response => {
        this.getVideoData(response);
      });
      this.axios
        .get(
          `/author/${this.$route.params.mid}/video/${this.$route.params.aid}`
        )
        .then(response => {
          this.otherVideo = response.data;
        });
    },
    redrawDanmakuCharts(page) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.videoData.danmakuAggregate[page],
          "word_frequency"
        )
      ) {
        this.wordCloudOptions = drawDanmakuCloud(
          this.videoData.danmakuAggregate[page]["word_frequency"]
        );
      }
      this.danmakuDensityOptions = drawDanmakuDensity(
        this.videoData.danmakuAggregate[page]["danmaku_density"],
        this.videoData.danmakuAggregate[page]["duration"]
      );
    }
  }
};
</script>
