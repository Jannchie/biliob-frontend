var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  console.log(data);
  var xData = [];
  var yData = [];
  data.forEach(e => {
    xData.unshift(format(convertDateToUTC(new Date(e.datetime)), "HH:mm"));
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
        type: "cross"
      }
    },
    grid: {
      bottom: "20px",
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
        type: "line"
      }
    ]
  };
  return option;
}
export default drawChart;
