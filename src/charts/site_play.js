var format = require("date-fns/format");

function drawChart(data) {
  var xData = [];
  var playOninleData = [];
  var webOnlineData = [];
  data.forEach(e => {
    xData.unshift(format(new Date(e.datetime.replace(/-/g, "/")), "HH:mm"));
    playOninleData.unshift(e.playOnline);
    webOnlineData.unshift(e.webOnline);
  });
  var option = {
    title: {
      left: "center"
      // text: "过去24小时全站在线观看人数"
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
      left: "-20px",
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
        formatter: function(params) {
          if (params > 10000) {
            return Math.round(params / 1000) / 10.0 + "万";
          }
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
