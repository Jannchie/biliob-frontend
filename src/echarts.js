import Vue from "vue";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/radar";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/graph";
import "echarts-wordcloud";

// // custom theme
import mydark from "./charts/theme/mydark.json";
import colorful from "./charts/theme/colorful.json";
import card from "./charts/theme/card.json";

// // registering custom theme
ECharts.registerTheme("mydark", mydark);
ECharts.registerTheme("colorful", colorful);
ECharts.registerTheme("card", card);

Vue.component("Chart", ECharts);
