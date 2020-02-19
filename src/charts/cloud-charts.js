function drawChart(data) {
  let textSize = (window.innerWidth + 1000) / 50;
  data.forEach(e => {
    if (e.value < 0) {
      e.value = 0;
    } else {
      e.value = Math.pow(e.value, 0.3);
    }
  });
  let max = Math.max.apply(
    null,
    data.map(e => e.value)
  );
  let min = Math.min.apply(
    null,
    data.map(e => e.value)
  );
  function scale(a, b) {
    return function(c, d) {
      let delta = b - a;
      return function(e) {
        let r = (e - a) / delta;
        let d2 = d - c;
        return r * d2 + c;
      };
    };
  }
  let f = scale(min, max)(0.2, 1);
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
        sizeRange: [textSize / 3, textSize],
        rotationRange: [0, 0],
        rotationStep: 45,
        gridSize: 4,
        drawOutOfBound: false,

        textStyle: {
          normal: {
            color: function(e) {
              // Random color
              return "rgba(" + [30, 136, 229, f(e.value)].join(",") + ")";
            },
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
