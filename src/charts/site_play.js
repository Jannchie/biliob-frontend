var format = require("date-fns/format");

function drawChart(data) {
  var xData = [];
  var yData = [];
  data.forEach(e => {
    xData.unshift(format(new Date(e.datetime.replace(/-/g, "/")), "HH:mm"));
    yData.unshift(e.playOnline);
  });
  var option = {
    title: {
      left: "center",
      text: "过去24小时全站在线观看人数"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          precision: 0
        },
        backgroundColor: "rgba(50,50,50,0.7)"
      }
    },
    grid: {
      bottom: "30px",
      right: "10px",
      left: "50px"
    },
    xAxis: {
      type: "category",
      data: xData
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: function(params) {
          if (params > 10000) {
            return Math.round(params / 1000) / 10.0 + "万";
          }
        }
      }
    },
    series: [
      {
        data: yData,
        type: "line",
        symbolSize: 6
      }
    ]
  };
  return option;
}
export default drawChart;
