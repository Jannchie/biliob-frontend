var format = require("date-fns/format");
import formatNumber from "../util/format-number";
function drawChart(data, type = "line") {
  let series = data.map(e => {
    e[0].map(item => {
      return [format(item[0]), item[1]];
    });
    return {
      name: e[1],
      data: e[0],
      smooth: true,
      showSymbol: false,
      color: e[2],
      type: type
    };
  });
  let Chart = {
    legend: {
      selectedMode: "single"
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter"
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "20px"
      }
    ],
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        label: {
          formatter: function(params) {
            return Math.round(params.value);
          }
        }
      }
    },
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: function(params) {
            return "日期：" + format(params.value, "YYYY-MM-DD HH:mm");
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: formatNumber
        }
      }
    ],
    series: series
  };
  return Chart;
}
export default drawChart;
