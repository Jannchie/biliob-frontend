import interpolation from "./util/interpolation";
function drawChart(data) {
  data.forEach(e => {
    e[0] = interpolation(e[0]);
  });
  let series = data.map((e, i) => {
    return {
      name: e[1] + "变化率",
      color: e[2],
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: i,
      data: e[0]
    };
  });

  let cals = data.map(() => {
    let now = new Date();
    let front = new Date(now - 86400 * 363 * 1000);
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
      dayLabel: { nameMap: "cn", position: "end", color: "#888" },
      monthLabel: { nameMap: "cn", color: "#888" }
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
        color: "#111",
        colorAlpha: [1, 0.2]
      },
      inRange: {
        color: e[2],
        colorAlpha: [0.2, 10]
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
