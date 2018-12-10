var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  let fans = [];
  data.data.forEach(d => {
    fans.push([d["datetime"], d["fans"]]);
  });
  let Chart = {
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
      bottom: "90px",
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
        bottom: "20px"
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
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 1000) / 10.0 + "万";
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
  return Chart;
}
export default drawChart;
