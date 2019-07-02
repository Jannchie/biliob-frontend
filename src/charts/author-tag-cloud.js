function drawChart(data, type = 0) {
  var d = [];
  if (type == 0) {
    for (let e in data) {
      d.push({ name: data[e]._id, value: data[e].count });
    }
  } else if (type == 1) {
    for (let e in data) {
      d.push({ name: data[e]._id, value: data[e].totalView });
    }
  }

  var maxSize = 72;

  let options = {
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
        sizeRange: [24, maxSize],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,

        textStyle: {
          normal: {
            fontWeight: "bold"
          }
        },

        data: d
      }
    ]
  };

  return options;
}
export default drawChart;
