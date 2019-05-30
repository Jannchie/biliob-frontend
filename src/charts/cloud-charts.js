function drawChart(data, maxSize) {
  let options = {
    title: [{}],
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: "{a} <br/>{b}"
    },
    series: [
      {
        name: "关键词",
        type: "wordCloud",

        // 使用矩形
        shape: function shapeSquare(theta) {
          return Math.min(
            1 / Math.abs(Math.cos(theta)),
            1 / Math.abs(Math.sin(theta))
          );
        },

        left: "center",
        top: "center",
        width: "90%",
        height: "90%",
        right: null,
        bottom: null,
        sizeRange: [16, maxSize],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,

        textStyle: {
          normal: {
            fontWeight: "bold"
          }
        },

        data: data
      }
    ]
  };
  return options;
}
export default drawChart;
