<template>
  <el-row style="margin:5px">
    <el-col :span="24">
      <el-card class="card">
        <div slot="header">
          <div height="100px" style="overflow:auto;">
            <div style="float:left;padding-right:20px">
              <img class="video-img" v-bind:src="videoData.pic"/>
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
            <img src="http://placehold.it/1088x300" style="max-width:100%">
          </div>
          <div class="item">
            <el-table :data="videoData.data" height="500px">
              <el-table-column prop="datetime" label="日期"></el-table-column>
              <el-table-column prop="view" label="播放"></el-table-column>
              <el-table-column prop="coin" label="硬币"></el-table-column>
              <el-table-column prop="favorite" label="收藏"></el-table-column>
              <el-table-column prop="share" label="分享"></el-table-column>
              <el-table-column prop="danmaku" label="弹幕"></el-table-column>
              <el-table-column prop="like" label="好评"></el-table-column>
              <el-table-column prop="dislike" label="差评"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'v',
  data () {
    return {
      'videoData': {}
    }
  },
  mounted () {
    this.axios.get('http://localhost:8081/video/' + this.$route.params.aid).then((response) => {
      this.videoData = response.data
      console.log(response.status)
    })
  }
}

</script>

<style>
.video-img{
  height:70px;
  border-radius: 4px;
}
</style>
