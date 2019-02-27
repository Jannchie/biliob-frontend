<template>
  <MainLayout>
    <VideoMain slot="main-cards">
      <VideoDetailTitle
        slot="title"
        :title="videoData.title"
        :aid="videoData.aid"
        :pic="videoData.pic"
      />
      <VideoDetailRank
        slot="rank"
        v-bind="videoData.rank"
      ></VideoDetailRank>
      <VideoDetailMainChart
        slot="main"
        :main-chart="mainChart"
      />
      <DetailCharts
        v-if="hasDanmakuAggregate"
        slot="danmaku-density"
        :options="danmakuDensityOptions"
      />
      <VideoDetailPieChart
        slot="like-rate"
        :like-rate-chart="likeRateChart"
      />
      <DetailCharts
        v-if="hasDanmakuAggregate"
        slot="danmaku-cloud"
        :options="wordCloudOptions"
      />
    </VideoMain>
    <VideoAside slot="aside-cards">
      <AuthorInfo
        slot="author-operation"
        :author-data="authorData"
      />
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
    </VideoAside>
  </MainLayout>
</template>
<script>
import VideoDetailRank from "../components/main/VideoDetailRank.vue";
import VideoDetailTitle from "../components/main/VideoDetailTitle.vue";
import VideoDetailMainChart from "../components/main/VideoDetailMainChart.vue";
import VideoDetailPieChart from "../components/main/VideoDetailPieChart.vue";
import DetailCharts from "../components/main/DetailCharts.vue";
import MainLayout from "../components/common/MainLayout.vue";
import VideoAside from "../components/aside/VideoAside.vue";
import VideoMain from "../components/main/VideoMain.vue";
import AuthorInfo from "../components/aside/AuthorInfo.vue";
import AuthorVideo from "../components/aside/AuthorVideo.vue";
import Recommand from "../components/aside/Recommand.vue";
import VideoOperation from "../components/aside/VideoOperation.vue";
import drawMainChart from "../charts/video-main.js";
import drawVideoPieChart from "../charts/video-pie.js";
import drawDanmakuCloud from "../charts/danmaku-cloud.js";
import drawDanmakuDensity from "../charts/danmaku-density.js";
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
  name: "AuthorList",
  components: {
    MainLayout,
    VideoDetailRank,
    VideoDetailTitle,
    VideoDetailMainChart,
    VideoDetailPieChart,
    VideoAside,
    DetailCharts,
    VideoMain,
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
      hasDanmakuAggregate: false
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
    getVideoData(response) {
      this.videoData = response.data;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainChart = drawMainChart(deepCopy(response.data));
      this.likeRateChart = drawVideoPieChart(deepCopy(response.data));
      this.drawDanmakuCloud = drawVideoPieChart(deepCopy(response.data));
      if (response.data.hasOwnProperty("danmakuAggregate")) {
        this.hasDanmakuAggregate = true;
        this.wordCloudOptions = drawDanmakuCloud(
          response.data.danmakuAggregate[1]["word_frequency"]
        );
        this.danmakuDensityOptions = drawDanmakuDensity(
          response.data.danmakuAggregate[1]["danmaku_density"],
          response.data.danmakuAggregate[1]["duration"]
        );
      } else {
        this.hasDanmakuAggregate = false;
      }
    },
    getDataFromAid() {
      this.$store.commit("toVideo");
      this.axios.get("/author/" + this.$route.params.mid).then(response => {
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
    }
  }
};
</script>
