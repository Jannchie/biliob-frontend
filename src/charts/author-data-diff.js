import interpolation from "./util/interpolation";
import formatNumber from "@/util/format-number";
function drawChart(data) {
  data.forEach(e => {
    e[0] = interpolation(e[0]);
  });
  let series = data.map((e, i) => {
    return {
      name: e[1] + "变化",
      color: e[2],
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: i,
      data: e[0],
      tooltip: {
        formatter: params => {
          return `${params.seriesName} <br />
          日期：${params.value[0]}  <br />
          数值：${formatNumber(params.value[1])}`;
        }
      }
    };
  });

  let cals = data.map(() => {
    let week = new Date().getDay();
    let now = new Date();
    let front = new Date(now - 86400 * 366 * 1000 - (6 - week) * 86400 * 1000);
    if (document.body.offsetWidth < 768) {
      front = new Date(now - 86400 * 58 * 1000 - (6 - week) * 86400 * 1000);
    }
    now = new Date();
    return {
      right: "35",
      left: "10",
      splitLine: {
        show: false
      },
      itemStyle: {
        color: "#fff",
        borderWidth: 4,
        borderColor: "#fff"
      },
      cellSize: ["auto", "20"],
      range: [front, now],
      yearLabel: { show: false },
      dayLabel: { nameMap: "cn", position: "end", color: "#888", fontSize: 10 },
      monthLabel: { nameMap: "cn", color: "#888", fontSize: 10 }
    };
  });
  let vms = data.map((e, i) => {
    let max = Math.max.apply(
      Math,
      e[0].map(item => {
        return item[1];
      })
    );
    return {
      min: Math.min.apply(
        Math,
        e[0].map(item => {
          return item[1];
        })
      ),
      max: max,
      range: [0, max],
      outOfRange: {
        color: "#333",
        colorAlpha: [1, 0]
      },
      inRange: {
        color: e[2],
        colorAlpha: [0.2, 1]
      },

      orient: "horizontal",
      seriesIndex: i,
      left: "center",
      show: false,
      textStyle: {
        color: "#000"
      }
    };
  });
  let option = {
    legend: {
      selectedMode: "single"
    },
    tooltip: {},
    visualMap: vms,
    calendar: cals,
    series: series
  };

  return option;
}
export default drawChart;
