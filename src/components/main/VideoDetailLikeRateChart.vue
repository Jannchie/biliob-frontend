<template>
  <VCard class="card">
    <VCardText  class='card-holder'>
        <Chart id="chart-1" theme="light" :auto-resize="true" :options="likeRateChart" style="width:100%;height:20vmax;" ></Chart>
    </VCardText >
  </VCard>
</template>

<script>
export default {
  props: { likeRateChart: Object() },
  data() {
    return {
      videoData: {}
    };
  }
};
</script>

<style scoped>
.video-img {
  height: 70px;
  border-radius: 4px;
}
</style>
