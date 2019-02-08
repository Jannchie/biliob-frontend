<template>
  <MainLayout>
    <VideoMain slot="main-cards">
      <VideoDetailTitle
        slot="title"
        :title="videoData.title"
        :aid="videoData.aid"
        :pic="videoData.pic"
      />
      <VideoDetailMainChart
        slot="main"
        :main-chart="mainChart" 
      />
      <VideoDetailLikeRateChart
        slot="like-rate"
        :like-rate-chart="likeRateChart"
      />
    </VideoMain>
    <VideoAside slot="aside-cards">
      <AuthorOperation
        slot="author-operation"
        :author-data="authorData" 
      />
      <AuthorVideo
        slot="other-video"
        title="UP主其他已追踪视频"
        :author-top-video="otherVideo" 
      />
      <VideoToBilibili
        slot="video-to-bilibili"
        :aid="videoData.aid" 
      />
      <Recommand slot="recommand" />
    </VideoAside>
  </MainLayout>
</template>
<script>
import VideoDetailTitle from "../components/main/VideoDetailTitle.vue";
import VideoDetailMainChart from "../components/main/VideoDetailMainChart.vue";
import VideoDetailLikeRateChart from "../components/main/VideoDetailLikeRateChart.vue";
import MainLayout from "../components/common/MainLayout.vue";
import VideoAside from "../components/aside/VideoAside.vue";
import VideoMain from "../components/main/VideoMain.vue";
import AuthorOperation from "../components/aside/AuthorOperation.vue";
import AuthorVideo from "../components/aside/AuthorVideo.vue";
import Recommand from "../components/aside/Recommand.vue";
import VideoToBilibili from "../components/aside/VideoToBilibili.vue";
import drawMainChart from "../charts/video-main.js";
import drawLikeRateChart from "../charts/video-likerate.js";
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
    VideoDetailTitle,
    VideoDetailMainChart,
    VideoDetailLikeRateChart,
    VideoAside,
    VideoMain,
    AuthorOperation,
    AuthorVideo,
    Recommand,
    VideoToBilibili
  },
  data() {
    return {
      videoData: Object(),
      authorData: Object(),
      mainChart: Object(),
      likeRateChart: Object(),
      otherVideo: Object()
    };
  },
  watch: {
    "$route.params.aid": function() {
      this.$store.commit("toVideo");
      this.axios.get("/author/" + this.$route.params.mid).then(response => {
        this.authorData = response.data;
      });
      this.axios.get("/video/" + this.$route.params.aid).then(response => {
        this.videoData = response.data;
        this.videoData.pic = this.videoData.pic.slice(5);
        this.mainChart = drawMainChart(deepCopy(response.data));
        this.likeRateChart = drawLikeRateChart(deepCopy(response.data));
      });
      this.axios
        .get(
          `/author/${this.$route.params.mid}/video/${this.$route.params.aid}`
        )
        .then(response => {
          this.otherVideo = response.data;
        });
    }
  },
  mounted() {
    this.$store.commit("toVideo");
    this.axios.get("/author/" + this.$route.params.mid).then(response => {
      this.authorData = response.data;
    });
    this.axios.get("/video/" + this.$route.params.aid).then(response => {
      this.videoData = response.data;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainChart = drawMainChart(deepCopy(response.data));
      this.likeRateChart = drawLikeRateChart(deepCopy(response.data));
    });
    this.axios
      .get(`/author/${this.$route.params.mid}/video/${this.$route.params.aid}`)
      .then(response => {
        this.otherVideo = response.data;
      });
  }
};
</script>
