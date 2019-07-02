<template>
  <VLayout>
    <VFlex lg6 md12>
      <VCard class="channel-card">
        <Chart
          id="channel-chart"
          :theme="theme"
          :auto-resize="true"
          :options="channelChart"
          style="width:100%;"
        />
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
      channelChart: Object(),
      theme: "colorful"
    };
  },
  computed: {
    isDark() {
      return this.$store.state.dark;
    }
  },
  watch: {
    isDark(val) {
      if (val) {
        this.theme = "mydark";
      } else {
        this.theme = "colorful";
      }
    },
    channels: function(val) {
      this.channelChart = drawChannelChart(val);
    }
  },
  mounted() {
    if (this.$store.state.dark) {
      this.theme = "mydark";
    } else {
      this.theme = "colorful";
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
