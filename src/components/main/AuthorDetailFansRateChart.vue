<template>
  <VCard class="card">
    <VResponsive :aspect-ratio="8 / 5">
      <Chart
        class="chart"
        :theme="theme"
        :auto-resize="true"
        :options="chartOptions"
      />
    </VResponsive>
  </VCard>
</template>

<script>
import drawFansRateChart from "../../charts/author-fans-rate.js";
var deepCopy = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var no = {};
    for (let i in o) {
      no[i] = deepCopy(o[i]);
    }
    return no;
  } else {
    return o;
  }
};
export default {
  props: { fansRate: Object() },
  data() {
    return {
      chartOptions: Object(),
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
    fansRate: function(val) {
      this.chartOptions = drawFansRateChart(deepCopy(val));
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

.chart {
  width: 100%;
  height: 100%;
}
</style>
