var format = require("date-fns/format");
var {
  convertDateToUTC
} = require("./util/convertDateToUTC");

function interpolation(data) {
  data = data.sort((a, b) => {
    return new Date(a.datetime) - new Date(b.datetime);
  });
  let new_data = [];
  // var l_date = "";
  var c_datetime = new Date(data[0].datetime.replace("+0000", ""));
  var c_fans = data[0].fans;
  for (let index = 1; index < data.length; index++) {
    var n_datetime = new Date(data[index].datetime.replace("+0000", ""));
    var n_fans = data[index].fans;
    var linear_int = date => {
      return Math.round(
        ((n_fans - c_fans) / (n_datetime - c_datetime)) *
        (new Date(date).getTime() - c_datetime) +
        c_fans
      );
    };
    if (c_datetime.getDate() != n_datetime.getDate()) {
      var temp_date = new Date(c_datetime.getTime());
      while (temp_date.getDate() != n_datetime.getDate()) {
        temp_date = new Date(temp_date.getTime() + 86400000);
        new_data.push({
          datetime: format(temp_date, "YYYY-MM-DD"),
          fans: linear_int(format(temp_date, "YYYY-MM-DD"))
        });
      }
      c_datetime = n_datetime;
      c_fans = n_fans;
    }
  }
  console.log(new_data);
  return new_data.reverse();
}

function drawChart(data) {
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
      confine: true,
      axisPointer: {
        label: {
          formatter: function (params) {
            return Math.round(params.value);
          }
        }
      }
    },
    grid: {
      left: "60px",
      right: "40px",
      bottom: "90px"
    },
    dataZoom: [{
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
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              "日期：" +
              format(convertDateToUTC(new Date(params.value)), "YYYY-MM-DD")
            );
          }
        }
      }
    },
    yAxis: [{
      type: "value",
      min: function (value) {
        if (value.min > 0) {
          return 0;
        } else {
          return value.min;
        }
      },
      splitLine: {
        show: true
      }
    }],
    series: [{
      name: "粉丝增量",
      data: fansRate,
      smooth: false,
      showSymbol: false,
      type: "bar",
      areaStyle: {}
    }]
  };
  return Chart;
}
export default drawChart;