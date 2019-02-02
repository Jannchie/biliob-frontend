// var format = require("date-fns/format");
// var { convertDateToUTC } = require("./util/convertDateToUTC");

function drawChart(data) {
  var max = 0;
  var indicator = [];
  var value = [];
  data.forEach(e => {
    value.push(e.count);
    if (e.count > max) {
      max = e.count;
    }
  });
  data.forEach(e => {
    indicator.push({
      name: e.name,
      max: max
    });
  });

  let option = {
    title: {
      text: "投稿分区分布"
    },
    tooltip: {},
    legend: {
      data: ["投稿分布"]
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: indicator
    },
    series: [
      {
        name: "",
        type: "radar",
        // areaStyle: {normal: {}},
        data: [
          {
            value: value,
            name: "投稿分配"
          }
        ]
      }
    ]
  };
  return option;
}
export default drawChart;
