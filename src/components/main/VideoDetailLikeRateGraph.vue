<template>
  <v-card class="card">
    <v-card-text  class='card-holder'>
        <chart theme="light" id="chart-1" :auto-resize="true" :options="likeRateGraph" style="width:100%;height:20vmax;" ></chart>
    </v-card-text >
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      'videoData': {}
    }
  },
  props: ['likeRateGraph']
}
</script>

<style scoped>
  .video-img {
    height: 70px;
    border-radius: 4px;
  }
</style>
