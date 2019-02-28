function drawChart(data) {
  var d = [];
  var sum = 0;
  var count = 0;
  for (const key in data) {
    sum += data[key];
    count += 1;
    d.push({
      name: key,
      value: data[key]
    });
  }
  let avg = sum / count;
  var maxSize = 64;
  if (avg <= 0.06) {
    maxSize = 92;
  } else if (avg <= 0.07) {
    maxSize = 88;
  } else if (avg <= 0.08) {
    maxSize = 84;
  } else if (avg <= 0.09) {
    maxSize = 80;
  } else if (avg <= 0.1) {
    maxSize = 76;
  } else if (avg <= 0.11) {
    maxSize = 72;
  } else if (avg <= 0.12) {
    maxSize = 68;
  }

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

        data: d
      }
    ]
  };
  return options;
}
export default drawChart;
