<template>
  <el-card class="card">
    <div slot="header">
      <div height="100px" style="overflow:auto;">
        <div style="float:left;padding-right:20px">
          <img class="video-img" v-bind:src="videoData.pic" />
        </div>
        <div style="float:left;max-width:85%">
          <h1 style="display:inline">
            {{ videoData.title}}
          </h1>
          <br>
          aid:{{ $route.params.aid }}
        </div>
      </div>
    </div>
    <div class='card-holder'>
      <div>
        <chart theme="light" :auto-resize="true" :options="mainGraph" style="width:100%;height:500px"></chart>
        <chart theme="light" :auto-resize="true" :options="likeRateGraph" style="width:100%;height:500px"></chart>
      </div>
    </div>
  </el-card>
</template>

<script>
import drawMainGraph from '../../charts/video-main.js'
import drawLikeRateGraph from '../../charts/video-likerate.js'
export default {
  data () {
    return {
      'mainGraph': {},
      'likeRateGraph': {},
      'videoData': {}
    }
  },
  methods: {},
  mounted () {
    this.axios.get(this.apiurl + '/video/' + this.$route.params.aid).then((response) => {
      this.videoData = response.data
      this.mainGraph = drawMainGraph(response.data)
      this.likeRateGraph = drawLikeRateGraph(response.data)
    })
  }
}
</script>

<style>
  .video-img {
    height: 70px;
    border-radius: 4px;
  }
</style>
