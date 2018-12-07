<template>
  <VLayout>
  <VFlex lg6 md12>
  <VCard class="channel-card">
    <VCardText  class='card-holder'>
        <Chart id="channel-chart" theme="light" :auto-resize="true" :options="channelChart" style="width:100%;" ></Chart>
    </VCardText >
  </VCard>
  </VFlex>
</VLayout>
</template>

<script>
import drawChannelChart from "../../charts/author-channel.js";

export default {
  props: { channels: Object() },
  data() {
    return {
      channelChart: Object()
    };
  },
  watch: {
    channels: function(val) {
      this.channelChart = drawChannelChart(val);
    }
  }
};
</script>


<style scoped>
.video-img {
  height: 70px;
  border-radius: 4px;
}
@media only screen and (min-width: 1029px) {
  #channel-chart {
    height: 20vmax;
  }
}
@media only screen and (max-width: 1029px) {
  #channel-chart {
    height: 45vmax;
  }
}
</style>
