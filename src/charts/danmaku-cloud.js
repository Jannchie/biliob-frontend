function drawChart(data) {
  var d = [];
  console.log(data);
  for (const key in data) {
    d.push({
      name: key,
      value: data[key]
    });
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

        // The shape of the "cloud" to draw. Can be any polar equation represented as a
        // callback function, or a keyword present. Available presents are circle (default),
        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

        shape: "circle",

        // A silhouette image which the white area will be excluded from drawing texts.
        // The shape option will continue to apply as the shape of the cloud to grow.

        // maskImage: maskImage,

        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.

        left: "center",
        top: "center",
        width: "90%",
        height: "80%",
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.
        sizeRange: [16, 68],

        rotationRange: [0, 0],
        rotationStep: 45,

        gridSize: 8,

        drawOutOfBound: false,

        // Global text style
        textStyle: {
          normal: {
            fontWeight: "bold"
          }
        },

        // Data is an array. Each array item must have name and value property.
        data: d
      }
    ]
  };
  return options;
}
export default drawChart;
