var format = require("date-fns/format");
var { convertDateToUTC } = require("./util/convertDateToUTC");

function interpolation(data) {
  data = data.sort((a, b) => a.datetime - b.datetime);
  let new_data = [];
  for (let index = 0; index < data.length - 1; index++) {
    let days = Math.round(
      (new Date(data[index].datetime) - new Date(data[index + 1].datetime)) /
        (24 * 60 * 60 * 1000)
    );
    if (days <= 1) {
      new_data.push(data[index]);
    } else {
      let deltaFans = data[index].fans - data[index + 1].fans;
      let cFans = data[index].fans;
      let fans = deltaFans / days;
      let offset = 0;
      while (days >= 1) {
        days--;
        new_data.push({
          fans: Math.round(-fans * offset + cFans),
          datetime:
            new Date(data[index].datetime).getTime() -
            24 * 60 * 60 * 1000 * offset
        });
        offset++;
      }
    }
  }
  return new_data;
}

function drawChart(data) {
  console.log(data);
  data = data.data;
  data = interpolation(data);
  for (let index = 0; index < data.length; index++) {
    data[index].datetime = format(
      convertDateToUTC(new Date(data[index].datetime)),
      "YYYY-MM-DD"
    );
  }

  let fansRate = [];
  fansRate.push([data[data.length - 1]["datetime"], 0]);
  var lastDate = data[data.length - 1]["datetime"];
  let f = 0;
  for (let i = data.length - 2; i >= 0; i--) {
    if (new Date(data[i]["datetime"]) > new Date(lastDate) || i === 0) {
      f += data[i]["fans"] - data[i + 1]["fans"];
      fansRate.push([data[i]["datetime"], f]);
      lastDate = new Date(lastDate).setDate(new Date(lastDate).getDate() + 1);
      f = 0;
    } else {
      f += data[i]["fans"] - data[i + 1]["fans"];
    }
  }
  if (fansRate[fansRate.length - 2][0] == fansRate[fansRate.length - 1][0]) {
    fansRate[fansRate.length - 1][0] = format(
      new Date().setDate(
        new Date(fansRate[fansRate.length - 1][0]).getDate() + 1
      ),
      "YYYY-MM-DD"
    );
  }
  let Chart = {
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
        label: {
          formatter: function(params) {
            return Math.round(params.value);
          }
        }
      }
    },
    grid: {
      left: "60px",
      right: "60px",
      bottom: "90px"
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
        smooth: false,
        showSymbol: false,
        type: "bar",
        areaStyle: {}
      }
    ]
  };
  return Chart;
}
export default drawChart;
