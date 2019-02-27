function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = "" + parseInt(secondTime) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}

function drawChart(data, duration) {
  console.log(data);
  console.log(duration);
  var tick = duration / 50;
  var x = [];
  for (let i = 0; i < 50; i++) {
    x.push(tick * i + 0.5 * tick);
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
          formatter: function(params) {
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
    xAxis: {
      type: "category",
      data: x,
      axisPointer: {
        label: {
          formatter: function(params) {
            return "时间：" + formatSeconds(params.value);
          }
        }
      }
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
        name: "弹幕密度",
        data: data,
        smooth: false,
        showSymbol: false,
        type: "line",
        areaStyle: {}
      }
    ]
  };
  return Chart;
}
export default drawChart;
