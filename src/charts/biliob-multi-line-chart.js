import formatNumber from "../util/format-number";
import fmt from "date-fns/format";
function drawChart(data, type = "line", format = "YYYY-MM-DD HH:mm") {
  if (type == "bar") {
    console.log(data);
  }
  let series = data.map(e => {
    let localOffset = new Date().getTimezoneOffset() / 60;
    let offset = -8 - localOffset;
    e[0] = e[0].map(item => {
      let date = new Date(item[0]);
      date.setHours(date.getHours() + offset);
      return [date, item[1]];
    });

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
            return fmt(params.value, format);
          }
        }
      }
    },
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: function(params) {
            return "日期：" + fmt(params.value, format);
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
        axisLabel: {
          formatter: formatNumber
        }
      }
    ],
    series: series
  };
  return Chart;
}
export default drawChart;
