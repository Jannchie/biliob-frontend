<template>
  <div>
    <VideoDetailTitle
      :title="videoData.title"
      :pic="videoData.pic"
    ></VideoDetailTitle>
    <VideoDetailMainChart :main-chart="mainChart"></VideoDetailMainChart>
    <VideoDetailLikeRateChart
      :like-rate-chart="likeRateChart"
    ></VideoDetailLikeRateChart>
  </div>
</template>

<script>
import drawMainChart from "../../charts/video-main.js";
import drawLikeRateChart from "../../charts/video-likerate.js";
import VideoDetailTitle from "../main/VideoDetailTitle.vue";
import VideoDetailMainChart from "../main/VideoDetailMainChart.vue";
import VideoDetailLikeRateChart from "../main/VideoDetailLikeRateChart.vue";
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
  components: {
    VideoDetailTitle,
    VideoDetailMainChart,
    VideoDetailLikeRateChart
  },
  data() {
    return {
      mainChart: {},
      likeRateChart: {},
      videoData: {}
    };
  },

  watch: {
    "$route.params.aid": function() {
      this.axios.get("/video/" + this.$route.params.aid).then(response => {
        this.videoData = response.data;
        this.videoData.pic = this.videoData.pic.slice(5);
        this.mainChart = drawMainChart(deepCopy(response.data));
        this.likeRateChart = drawLikeRateChart(deepCopy(response.data));
      });
    }
  },
  mounted() {
    this.axios.get("/video/" + this.$route.params.aid).then(response => {
      this.videoData = response.data;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainChart = drawMainChart(deepCopy(response.data));
      this.likeRateChart = drawLikeRateChart(deepCopy(response.data));
    });
  },
  methods: {}
};
</script>

<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
