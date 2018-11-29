var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");
function drawGraph(data) {
  var _data = data.data;
  for (let index = 0; index < _data.length; index++) {
    _data[index].datetime = format(
      convertDateToUTC(new Date(_data[index].datetime)),
      "YYYY-MM-DD"
    );
  }

  let fansRate = [];
  fansRate.push([
    _data[_data.length - 1]["datetime"],
    _data[_data.length - 2]["fans"] - _data[_data.length - 1]["fans"]
  ]);
  var lastDate = _data[_data.length - 1]["datetime"];
  let f = 0;
  for (let i = _data.length - 2; i >= 0; i--) {
    if (new Date(_data[i]["datetime"]) > new Date(lastDate) || i === 0) {
      f += _data[i]["fans"] - _data[i + 1]["fans"];
      fansRate.push([_data[i]["datetime"], f]);
      lastDate = new Date(lastDate).setDate(new Date(lastDate).getDate() + 1);
      f = 0;
    } else {
      f += _data[i]["fans"] - _data[i + 1]["fans"];
    }
  }

  let graph = {
    title: {
      left: "center",
      subtext: "粉丝增长变化趋势"
      // text: data.name
    },
    legend: {
      data: ["粉丝增量"],
      bottom: "5px"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    grid: {
      left: "50px",
      right: "10px",
      bottom: "120px"
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
              format(convertDateToUTC(new Date(params.value)), "YYYY-MM-DD")
            );
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: function(value) {
          if (value.min > 0) {
            return 0;
          } else {
            return value.min;
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: "粉丝增量",
        data: fansRate,
        smooth: true,
        showSymbol: false,
        type: "bar",
        areaStyle: {}
      }
    ]
  };
  return graph;
}
export default drawGraph;
