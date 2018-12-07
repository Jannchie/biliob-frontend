<template>
  <VCard class="card">
    <VCardText  class='card-holder'>
        <Chart id="chart-1" theme="light" :auto-resize="true" :options="mainChart" style="width:100%;height:25vmax;" ></Chart>
    </VCardText >
  </VCard>
</template>

<script>
export default {
  props: { mainChart: Object() }
};
</script>

<style scoped>
.video-img {
  height: 70px;
  border-radius: 4px;
}
</style>
