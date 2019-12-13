function drawChart(data) {
  let series = data.map((e, i) => {
    return {
      name: e[1],
      //   color: e[2],
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: i,
      data: e[0]
    };
  });
  let cals = data.map(() => {
    let now = new Date();
    let front = new Date(now.setFullYear(now.getFullYear() - 1));
    now = new Date();
    return {
      right: "25",
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
    return {
      min: Math.min.apply(
        Math,
        e[0].map(item => {
          return item[1];
        })
      ),
      max: Math.max.apply(
        Math,
        e[0].map(item => {
          return item[1];
        })
      ),
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
