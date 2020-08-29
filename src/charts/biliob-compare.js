import formatNumber from "../util/format-number";
import fmt from "date-fns/format";
function drawChart(
  authors,
  type = "line",
  format = "YYYY-MM-DD HH:mm",
  key = "fans"
) {
  if (authors.length == 0) return undefined;
  let series = authors.map(author => {
    let localOffset = new Date().getTimezoneOffset() / 60;
    let offset = -8 - localOffset;
    let date;
    let data = author.data.map(d => {
      if (typeof d.datetime == "string") {
        date = new Date(d.datetime.replace(new RegExp(/-/gm), "/"));
        date.setHours(date.getHours() + offset);
      } else {
        date = d.datetime;
      }
      return [date, d[key]];
    });

    let result = {
      name: author.name,
      data: data,
      smooth: false,
      type: "line",
      showSymbol: false
    };
    return result;
  });

  let Chart = {
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "filter"
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
          formatter: function (params) {
            return fmt(params.value, format);
          }
        }
      }
    },
    xAxis: {
      type: "time",
      data: authors[0].data.map(e => e.datetime),
      axisPointer: {
        label: {
          formatter: function (params) {
            return "日期：" + fmt(params.value, format);
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: function (value) {
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
