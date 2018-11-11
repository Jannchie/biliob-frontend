<template>
  <v-card class="card">
    <v-card-text  class='card-holder'>
        <chart theme="light" id="chart-1" :auto-resize="true" :options="mainGraph" style="width:100%;height:25vmax;" ></chart>
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
  props: ['mainGraph']
}
</script>

<style scoped>
  .video-img {
    height: 70px;
    border-radius: 4px;
  }
</style>
