<template>
  <div>
    <VCard
      class="mb-2 pa-4"
      style="min-height: 150px;"
    >
      <div style="display: flex; justify-content: space-between">
        <div class="vs-text">
          <div class="display-4 font-weight-black red--text  hidden-sm-and-down"> VS </div>
          <div class="display-1">实时差距</div>
          <div>
            <VOdometer
              class="font-weight-black blue--text text--darken-1"
              :value="deltaFans"
              style="font-size: 50px; font-family: auto"
              format="(,ddd).d"
            ></VOdometer>
          </div>
        </div>
        <div class="hidden-sm-and-down">
          <VOdometer
            class="font-weight-black blue--text text--darken-1"
            :value="aFans"
            style="font-size: 72px; font-family: auto"
            format="(,ddd).d"
          ></VOdometer>
          <div style="text-align: center">
            <VAvatar
              size="100"
              @click.stop="jumpToAuthorPage(aMid)"
            >
              <VImg
                :src="aFace.replace('http:','')"
                :lazy-src="aFace.replace('http:','')"
              />
            </VAvatar>
          </div>
          <div
            :class="`display-2 grey--text text--darken-3`"
            style="text-align: center; margin-top: 10px"
          >
            {{aName}}
          </div>
        </div>
        <div class="hidden-sm-and-down">
          <VOdometer
            class="font-weight-black blue--text text--darken-1"
            :value="bFans"
            style="font-size: 72px; font-family: auto"
            format="(,ddd).d"
          ></VOdometer>
          <div style="text-align: center">
            <VAvatar
              size="100"
              style="text-align: center"
              @click.stop="jumpToAuthorPage(bMid)"
            >
              <VImg
                :src="bFace.replace('http:','')"
                :lazy-src="bFace.replace('http:','')"
              />
            </VAvatar>
          </div>
          <div
            :class="`display-2 grey--text text--darken-3`"
            style="text-align: center; margin-top: 10px"
          >
            {{bName}}
          </div>
        </div>
      </div>
    </VCard>
    <DetailCharts
      :hidden="!freq"
      :options="realtimeChartOptions"
    />
  </div>
</template>
<script>
var format = require("date-fns/format");
import VOdometer from "../components/common/VOdometer.vue";
import getOptions from "../charts/author-realtime-fans.js";
import DetailCharts from "../components/main/DetailCharts.vue";
export default {
  components: { VOdometer, DetailCharts },
  data() {
    return {
      aOfficial: String(),
      aName: String(),
      aFans: Number(),
      aFace: String(),
      bOfficial: String(),
      bName: String(),
      bFans: Number(),
      bFace: String(),
      counter: 0,
      aOriginData: Array(),
      bOriginData: Array(),
      datetimeArray: Array(),
      realtimeChartOptions: Object(),
      aggregateParam: 60
    };
  },
  computed: {
    deltaFans() {
      if (this.aFans != 0 && this.bFans != 0) {
        return this.aFans - this.bFans;
      } else {
        return 0;
      }
    },
    aMid() {
      return this.$route.query.aMid;
    },
    bMid() {
      return this.$route.query.bMid;
    },
    freq() {
      if (this.$route.query.freq !== undefined) {
        return this.$route.query.freq;
      } else {
        return false;
      }
    },
    dataIntegrity() {
      var a = this.aRealtimeData.length;
      var b = this.bRealtimeData.length;
      var t = this.datetimeArray.length;
      if (a === b && b === t) {
        return a;
      } else {
        return 0;
      }
    },
    aRealtimeData() {
      var data = [];
      for (
        var index = this.aggregateParam;
        index < this.aOriginData.length;
        index++
      ) {
        data.push(
          this.aOriginData[index] -
            this.aOriginData[index - this.aggregateParam]
        );
      }
      return data;
    },
    bRealtimeData() {
      var data = [];
      for (
        var index = this.aggregateParam;
        index < this.bOriginData.length;
        index++
      ) {
        data.push(
          this.bOriginData[index] -
            this.bOriginData[index - this.aggregateParam]
        );
      }
      return data;
    }
  },
  watch: {
    dataIntegrity() {
      this.refreshRealtimeChart();
    }
  },
  mounted() {
    this.axios
      .get(`/author/real-time?aMid=${this.aMid}&bMid=${this.bMid}`)
      .then(r => {
        r.data.aFans.reverse();
        r.data.bFans.reverse();
        r.data.datetime.reverse();
        this.aOriginData = r.data.aFans;
        this.bOriginData = r.data.bFans;
        this.datetimeArray = r.data.datetime.slice(this.aggregateParam);
      });
    this.refresh();
    setInterval(this.getNewData, 1000);
  },
  methods: {
    refreshRealtimeChart() {
      this.realtimeChartOptions = getOptions(
        this.aRealtimeData,
        this.bRealtimeData,
        this.datetimeArray,
        this.aName,
        this.bName
      );
    },
    getNewData() {
      this.counter += 1;
      if (this.counter % 5 == 0) {
        this.refresh();
      } else {
        if (this.freq) {
          this.randomize();
        }
      }
    },
    randomize() {
      var range = 1.5;
      this.aFans = this.aFans + Math.round(Math.random() * range - range / 2);
      this.bFans = this.bFans + Math.round(Math.random() * range - range / 2);
    },
    refresh() {
      this.axios.get(`/author/${this.aMid}/info`).then(response => {
        this.aName = response.data.name;
        this.aOfficial = response.data.official;
        this.aFans = response.data.cFans;
        this.aFace = response.data.face;
        this.aOriginData.push(this.aFans);
        this.aOriginData.shift();
      });
      this.axios.get(`/author/${this.bMid}/info`).then(response => {
        this.bName = response.data.name;
        this.bOfficial = response.data.official;
        this.bFans = response.data.cFans;
        this.bFace = response.data.face;
        this.bOriginData.push(this.bFans);
        this.bOriginData.shift();
      });
      var dataString = format(new Date(), "YYYY-MM-DD HH:mm:ss");
      this.datetimeArray.push(dataString);
      this.datetimeArray.shift();
      this.refreshRealtimeChart();
    }
  }
};
</script>
<style >
.vs-text {
  width: 200px;
  position: absolute;
  margin-left: -100px;
  left: 50%;
  text-align: center;
}
</style>
