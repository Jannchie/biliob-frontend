<template>
<div>
    <video-detail-title :title="videoData.title" :pic="videoData.pic"></video-detail-title>
    <video-detail-main-graph :mainGraph="mainGraph"></video-detail-main-graph>
    <video-detail-like-rate-graph :likeRateGraph="likeRateGraph"></video-detail-like-rate-graph>
</div>
</template>

<script>
import drawMainGraph from '../../charts/video-main.js'
import drawLikeRateGraph from '../../charts/video-likerate.js'
import VideoDetailTitle from '../main/VideoDetailTitle.vue'
import VideoDetailMainGraph from '../main/VideoDetailMainGraph.vue'
import VideoDetailLikeRateGraph from '../main/VideoDetailLikeRateGraph.vue'

export default {
  data () {
    return {
      'mainGraph': {},
      'likeRateGraph': {},
      'videoData': {}
    }
  },
  components: {
    VideoDetailTitle, VideoDetailMainGraph, VideoDetailLikeRateGraph
  },
  methods: {},
  mounted () {
    this.axios.get('/video/' + this.$route.params.aid).then((response) => {
      this.videoData = response.data
      this.mainGraph = drawMainGraph(response.data)
      this.likeRateGraph = drawLikeRateGraph(response.data)
    })
  },

  watch: {
    '$route.params.aid': function (val, o) {
      this.axios.get('/video/' + this.$route.params.aid).then((response) => {
        this.videoData = response.data
        this.mainGraph = drawMainGraph(response.data)
        this.likeRateGraph = drawLikeRateGraph(response.data)
      })
    }
  }
}
</script>

<style scoped>
.v-card{
  margin-bottom: 5px
}
</style>
