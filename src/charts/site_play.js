var format = require("date-fns/format");
import formatNumber from "../util/format-number";
function drawChart(data) {
  var xData = [];
  var playOninleData = [];
  var webOnlineData = [];
  data.forEach(e => {
    xData.unshift(format(new Date(e.datetime.replace(/-/g, "/")), "HH:mm"));
    playOninleData.unshift((e.playOnline / 10000).toFixed(2));
    webOnlineData.unshift((e.webOnline / 10000).toFixed(2));
  });
  var option = {
    title: {
      left: "center"
      // text: "过去24小时全站在线观看人数"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    grid: {
      left: "0px",
      right: "0px",
      bottom: "0px",
      top: "10px",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: xData
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: val => {
          return formatNumber(val * 10000);
        }
      }
    },
    series: [
      {
        name: "在线观看",
        itemStyle: {
          borderWidth: 2
        },
        data: playOninleData,
        type: "line"
      },
      {
        name: "在线人数",
        itemStyle: {
          borderWidth: 2
        },
        data: webOnlineData,
        type: "line"
      }
    ]
  };
  return option;
}
export default drawChart;
