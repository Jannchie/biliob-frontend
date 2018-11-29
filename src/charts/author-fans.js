var moment = require("moment");

function drawGraph(data) {
  let fans = [];

  data.data.forEach(d => {
    fans.push([d["datetime"], d["fans"]]);
  });
  let graph = {
    title: {
      left: "center",
      subtext: "粉丝数变化趋势",
      text: data.name
    },
    legend: {
      data: ["粉丝数"],
      bottom: "5px"
    },
    grid: {
      bottom: "120px",
      right: "10px",
      left: "50px"
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter"
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "50px"
      }
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    xAxis: {
      type: "time",
      splitLine: {
        show: true
      },
      axisPointer: {
        label: {
          formatter: function(params) {
            return (
              "日期：" +
              moment(params.value)
                .utcOffset(0)
                .format("YYYY-MM-DD HH:mm")
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 10000) + "万";
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
      }
    ]
  };
  return graph;
}
export default drawGraph;
