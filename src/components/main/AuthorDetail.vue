<template>
  <v-card class="card">
    <div>

      <div>
      <v-img v-bind:src="authorData.face" class="face-img"/>
      </div>
    </div>
    <div class='card-holder'>
      <div>
        <!-- <img src="http://placehold.it/1088x300"> -->
        <chart theme="light" :auto-resize="true" :options="fans" style="width:100%;height:80vmin;"></chart>
        <chart theme="light" :auto-resize="true" :options="fansRate" style="width:100%;height:80vmin;"></chart>
      </div>
    </div>
  </v-card>
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
  width: 100%;
  height:250px
}
</style>
