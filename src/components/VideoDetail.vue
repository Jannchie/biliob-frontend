<template>
  <el-row style="margin:5px">
    <el-col :span="24">
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
            <!-- <img src="http://placehold.it/1088x300" style="max-width:100%"> -->
            <chart theme="light" :auto-resize="true" :options="mainGraph" style="width:100%;height:500px"></chart>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import drawMaingraph from '../charts/video-main.js'
export default {
  name: 'videlDetail',
  data () {
    return {
      'videoData': {},
      'mainGraph': {}
    }
  },
  methods: {},
  mounted () {
    this.axios.get('http://localhost:8081/video/' + this.$route.params.aid).then((response) => {
      this.videoData = response.data
      this.mainGraph = drawMaingraph(this.videoData)
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
