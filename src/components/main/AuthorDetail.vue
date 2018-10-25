<template>
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
        <chart theme="light" :auto-resize="true" :options="fansRate" style="width:100%;height:500px"></chart>
      </div>
    </div>
  </el-card>
</template>

<script>
import drawfansGraph from '../../charts/author-fans.js'
import drawfansRateGraph from '../../charts/author-fans-rate.js'
export default {
  name: 'ra',
  data () {
    return {
      'authorData': {},
      'fans': {},
      'fansRate': {}
    }
  },
  mounted () {
    this.axios.get(this.apiurl + '/author/' + this.$route.params.mid).then((response) => {
      this.authorData = response.data
      this.fansRate = drawfansRateGraph(response.data)
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
