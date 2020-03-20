import formatNumber from "../util/format-number";
function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}
function getOption(data) {
  let date = [];
  let value = [];
  data.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  data.forEach(e => {
    if (e.min == 2147483647) {
      return;
    }
    date.push(e.date);
    value.push([e.first, e.last, e.min, e.max]);
  });

  let option = {
    xAxis: {
      data: date
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
      bottom: "30px",
      containLabel: true
    },
    yAxis: {
      min: "dataMin",
      max: "dataMax",
      axisLabel: {
        formatter: formatNumber
      }
    },
    tooltip: {},
    series: [
      {
        type: "candlestick",
        data: value,
        itemStyle: {
          color: "#c12e34",
          color0: "#2b821d",
          borderColor: "#c12e34",
          borderColor0: "#2b821d"
        },
        tooltip: {
          formatter: params => {
            return `${params.name} <br />首天最值：
            ${formatNumber(params.value[1])}
            <br />末天最值：
            ${formatNumber(params.value[2])}
            <br />周最小值：
            ${formatNumber(params.value[3])}
            <br />周最大值：
            ${formatNumber(params.value[4])}<br />`;
          }
        }
      },
      {
        name: "4周均线",
        type: "line",
        data: calculateMA(4, value),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        },
        showSymbol: false
      },
      {
        name: "12周均线",
        type: "line",
        data: calculateMA(12, value),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        },
        showSymbol: false
      }
    ]
  };

  return option;
}
export default getOption;
