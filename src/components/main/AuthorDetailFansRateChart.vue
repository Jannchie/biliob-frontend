<template>
  <VCard class="card">
    <Chart
      class="chart"
      :theme="theme"
      :auto-resize="true"
      :options="chartOptions"
    />
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
}

@media only screen and (min-width: 1029px) {
  .chart {
    height: 20vmax;
  }
}

@media only screen and (max-width: 1029px) {
  .chart {
    height: 74vmin;
  }
}
</style>
