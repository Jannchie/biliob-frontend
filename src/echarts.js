import Vue from "vue";
import ECharts from "vue-echarts/components/ECharts";
// import ECharts modules manually to reduce bundle size
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
Vue.component("Chart", ECharts);
