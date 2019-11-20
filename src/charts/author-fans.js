var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  let fans = [];
  let view = [];
  let like = [];
  data.data.forEach(d => {
    if (d["archiveView"] != null) {
      view.push([d["datetime"], d["archiveView"]]);
    }
  });
  data.data.forEach(d => {
    if (d["fans"] != null) {
      fans.push([d["datetime"], d["fans"]]);
    }
  });

  data.data.forEach(d => {
    if (d["like"] != null) {
      like.push([d["datetime"], d["like"]]);
    }
  });

  let Chart = {
    legend: {
      data: ["粉丝数", "播放量", "获赞数"],
      bottom: "5px"
    },
    grid: {
      left: "10px",
      right: "10px",
      top: "10px",
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
            return (
              "日期：" +
              format(
                convertDateToUTC(new Date(params.value)),
                "YYYY-MM-DD HH:mm"
              )
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 100) / 100.0 + "万";
            } else {
              return params;
            }
          }
        }
      },
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 100) / 100.0 + "万";
            } else {
              return params;
            }
          }
        }
      }
    ],
    series: [
      {
        name: "粉丝数",
        data: fans.reverse(),
        smooth: true,
        showSymbol: false,
        type: "line"
      },
      {
        name: "播放量",
        data: view.reverse(),
        smooth: true,
        showSymbol: false,
        type: "line",
        yAxisIndex: 1
      },
      {
        name: "获赞数",
        data: like.reverse(),
        smooth: true,
        showSymbol: false,
        type: "line"
      }
    ]
  };
  return Chart;
}
export default drawChart;
