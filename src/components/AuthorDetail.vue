<template>
  <el-row style="margin:5px">
    <el-col :span="24">
      <el-card class="card">
        <div slot="header">
          <div style="float:left">
          <img v-bind:src="authorData.face" class="face-img" width="49px" height="49px"/>
          </div>
          <div height="60px" style="overflow:auto;padding-left:20px">
            <h1 style="display:inline">
              {{ authorData.name}}
            </h1>
            <br>
            mid:{{ $route.params.mid }}
          </div>
        </div>
        <div class='card-holder'>
          <div>
            <!-- <img src="http://placehold.it/1088x300"> -->
            <chart theme="light" :auto-resize="true" :options="fans" style="width:100%;height:500px"></chart>
          </div>
          <div class="item">
            <el-table :data="authorData.data" height="500px">
              <el-table-column prop="datetime" label="日期"></el-table-column>
              <el-table-column prop="fans" label="粉丝数"></el-table-column>
              <el-table-column prop="archive" label="视频投稿数"></el-table-column>
              <el-table-column prop="article" label="专栏投稿数"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import drawfansGraph from '../charts/author-fans.js'
export default {
  name: 'ra',
  data () {
    return {
      'authorData': {},
      'fans': {}
    }
  },
  mounted () {
    this.axios.get('http://localhost:8081/author/' + this.$route.params.mid).then((response) => {
      this.authorData = response.data
      this.fans = drawfansGraph(response.data)
    })
  }
}

</script>

<style>
.face-img{
  border-radius: 25px;
}
</style>
