var format = require("date-fns/format");
function drawChart(data, type = "line") {
  let series = data.map(e => {
    return {
      name: e[1],
      data: e[0],
      smooth: true,
      showSymbol: false,
      color: e[2],
      type: type
    };
  });
  let Chart = {
    legend: {
      selectedMode: "single"
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
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
              "日期：" + format(new Date(params.value), "YYYY-MM-DD HH:mm")
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
          formatter: function toThousands(num) {
            let postfix = "";
            if (num > 100000000) {
              postfix = "亿";
              num /= 100000000;
            } else if (num > 10000) {
              postfix = "万";
              num /= 10000;
            } else {
              return num;
            }
            num = num.toFixed(2);
            let [int, dec] = num.split(".");
            let inter = "";
            while (int != "") {
              inter = int.slice(-3) + "," + inter;
              int = int.slice(0, -3);
            }
            return `${inter.slice(0, -1)}.${dec}${postfix}`;
          }
        }
      }
    ],
    series: series
  };
  return Chart;
}
export default drawChart;
