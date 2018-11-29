<template>
  <div>
    <VideoDetailTitle
      :title="videoData.title"
      :pic="videoData.pic"
    ></VideoDetailTitle>
    <VideoDetailMainGraph :main-graph="mainGraph"></VideoDetailMainGraph>
    <VideoDetailLikeRateGraph
      :like-rate-graph="likeRateGraph"
    ></VideoDetailLikeRateGraph>
  </div>
</template>

<script>
import drawMainGraph from "../../charts/video-main.js";
import drawLikeRateGraph from "../../charts/video-likerate.js";
import VideoDetailTitle from "../main/VideoDetailTitle.vue";
import VideoDetailMainGraph from "../main/VideoDetailMainGraph.vue";
import VideoDetailLikeRateGraph from "../main/VideoDetailLikeRateGraph.vue";

export default {
  components: {
    VideoDetailTitle,
    VideoDetailMainGraph,
    VideoDetailLikeRateGraph
  },
  data() {
    return {
      mainGraph: {},
      likeRateGraph: {},
      videoData: {}
    };
  },

  watch: {
    "$route.params.aid": function() {
      this.axios.get("/video/" + this.$route.params.aid).then(response => {
        this.videoData = response.data;
        this.videoData.pic = this.videoData.pic.slice(5);
        this.mainGraph = drawMainGraph(response.data);
        this.likeRateGraph = drawLikeRateGraph(response.data);
      });
    }
  },
  mounted() {
    this.axios.get("/video/" + this.$route.params.aid).then(response => {
      this.videoData = response.data;
      this.videoData.pic = this.videoData.pic.slice(5);
      this.mainGraph = drawMainGraph(response.data);
      this.likeRateGraph = drawLikeRateGraph(response.data);
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
