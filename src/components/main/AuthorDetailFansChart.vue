<template>
  <VCard class="card">
    <VCardText  class='card-holder'>
        <Chart class="chart" theme="light" :auto-resize="true" :options="fans" ></Chart>
    </VCardText >
  </VCard>
</template>

<script>
import drawFansChart from "../../charts/author-fans.js";
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
  props: { authorData: Object() },
  data() {
    return {
      fans: Object()
    };
  },
  watch: {
    authorData: function(val) {
      this.fans = drawFansChart(deepCopy(val));
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
