import formatNumber from "../util/format-number";
import fmt from "date-fns/format";
function drawChart(data, type = "line", format = "YYYY-MM-DD HH:mm") {
  if (data.length == 0) return undefined;
  let series = data.map(e => {
    let localOffset = new Date().getTimezoneOffset() / 60;
    let offset = -8 - localOffset;
    e[0] = e[0].map(item => {
      let date;
      if (typeof item[0] == "string") {
        date = new Date(item[0].replace(new RegExp(/-/gm), "/"));
        date.setHours(date.getHours() + offset);
      } else {
        date = item[0];
      }
      return [date, item[1]];
    });
    let result = {
      name: e[1],
      data: e[0],
      smooth: false,
      showSymbol: false,
      color: e[2]
    };
    if (type == "area") {
      result.type = "line";
      result.name += "增长";
      result.areaStyle = {
        color: e[2] + "33"
      };
    } else {
      result.type = type;
    }
    return result;
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
        min: function(value) {
          return value.min > 0 && type == "area" ? 0 : value.min;
        },
        axisLabel: {
          formatter: formatNumber
        }
      }
    ],
    series: series.filter(s => {
      return s.data.length == 0 ? false : true;
    })
  };

  return Chart;
}
export default drawChart;
