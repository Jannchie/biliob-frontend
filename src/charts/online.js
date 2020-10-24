var format = require("date-fns/format");

function drawChart(data) {
  //TODO: get date min and max
  var dateSet = new Set();
  data.forEach((e) => {
    e.data.forEach((ed) => {
      dateSet.add(
        format(ed.datetime.replace("+00:00", ""), "YYYY-MM-DD HH:mm")
      );
    });
  });
  let dateArray = Array.from(dateSet).sort((a, b) => {
    return new Date(a) - new Date(b);
  });
  let dateMin = dateArray[0];
  let dateMax = dateArray[dateArray.length - 1];

  let series = data.map((d) => {
    let dd = d.data.map((ed) => {
      return [
        format(ed.datetime.replace("+00:00", ""), "YYYY-MM-DD HH:mm"),
        ed.number,
      ];
    });
    return {
      name: d.title,
      type: "line",
      symbol: "none",
      data: dd,
    };
  });

  // [{
  //   视频1: 0,
  //   视频2: 0,
  //   datetime: format(new Date(data.datetime), "YYYY-MM-DD HH:mm")
  // }]
  // [{[]},{[]}]

  let Chart = {
    title: {
      left: "center",
      top: "-5px",
      subtext: "各项指标总量",
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter",
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "10px",
      },
    ],
    tooltip: {
      confine: true,
      trigger: "axis",
      formatter: function(params) {
        let o = `日期：${params[0].value[0]}`;
        let tempData = [];

        params.forEach((e) => {
          tempData.push([e.seriesName, e.color, e.value[1]]);
        });
        tempData
          .sort((a, b) => b[2] - a[2])
          .forEach((e) => {
            o += `<div class="caption">
          <span style="color:${e[1]};width:10px;height:10px"> ● </span>
          <span">${e[0]}: ${e[2]}</span> 
          </div>
          `;
          });
        return o;
      },
    },
    xAxis: {
      type: "time",

      min: dateMin,
      max: dateMax,
    },
    yAxis: {
      type: "value",
      name: "同时在线人数",
      axisLabel: {
        formatter: function(params) {
          if (params >= 10000) {
            return Math.round(params / 100) / 100.0 + "万";
          } else {
            return params;
          }
        },
      },
    },
    series: series,
  };
  return Chart;
}
export default drawChart;
