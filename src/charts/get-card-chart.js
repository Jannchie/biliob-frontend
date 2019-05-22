function getBarChart(x, y, type) {
  return {
    grid: {
      left: "10px",
      right: "10px",
      bottom: "10px",
      top: "20px",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: x,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        type: type,
        lineStyle: {
          normal: {
            width: "5"
          }
        },
        barWidth: "10px",
        data: y
      }
    ]
  };
}
export default getBarChart;
