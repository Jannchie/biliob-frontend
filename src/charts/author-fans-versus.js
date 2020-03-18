var format = require("date-fns/format");
var parse = require("date-fns/parse");
function getTimeStamp(date) {
  return parse(date).getTime();
}
function drawChart(aData, bData, aName, bName) {
  var data = [{}, {}];
  [
    [aData, aName],
    [bData, bName]
  ].forEach(element => {
    var eachData = element[0];
    let offset = 8;
    eachData.map(e => {
      if (typeof e.datetime == "string") {
        let date;
        date = parse(e.datetime);
        date.setHours(date.getHours() - offset);
        e.datetime = date;
      }
      return e;
    });
    var name = element[1];
    var i = 1;
    if (name == aName) {
      i = 0;
    }

    let endDate = parse(eachData[0].datetime).getTime();
    endDate -= endDate % 60000;
    for (let index = 1; index < eachData.length - 1; index++) {
      const element = eachData[index];
      const lastElement = eachData[index - 1];
      const nextElement = eachData[index + 1];
      let lTimestamp = getTimeStamp(format(lastElement.datetime));
      let cTimestamp = getTimeStamp(format(element.datetime));
      let nTimestamp = getTimeStamp(format(nextElement.datetime));
      let lFans = getTimeStamp(lastElement.fans);
      let cFans = element.fans;
      let nFans = nextElement.fans;
      while (cTimestamp < endDate) {
        let value =
          ((lFans - cFans) / (lTimestamp - cTimestamp)) *
            (endDate - cTimestamp) +
          cFans;

        data[i][format(endDate, "HH:mm")] = Math.round(value);
        endDate -= 60000;
      }

      while (cTimestamp > endDate && nTimestamp < endDate - 60000) {
        let value =
          ((cFans - nFans) / (cTimestamp - nTimestamp)) *
            (endDate - nTimestamp) +
          nFans;
        data[i][format(endDate, "HH:mm")] = Math.round(value);
        endDate -= 60000;
      }
    }
  });
  let keys = Object.keys(data[0]);
  let ds = [];
  keys.forEach((e, idx) => {
    let deltaA = data[0][keys[idx]] - data[0][keys[idx + 10]];
    let deltaB = data[1][keys[idx]] - data[1][keys[idx + 10]];
    if (deltaB - deltaA) {
      ds.unshift([e, deltaA - deltaB]);
    }
  });
  ds.unshift(["date", "da", "db", "d"]);

  let Chart = {
    dataset: {
      source: ds
    },
    title: {
      left: "center"
      // text: "实时粉丝变化趋势-近10分钟增长",
      // subtext: `${aName} VS ${bName}`
    },
    legend: {
      data: [aName, bName],
      bottom: "5px"
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "10px",
      containLabel: true
    },
    axisLabel: {
      // formatter: function(params) {
      //   return params.slice(11);
      // }
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        label: {
          formatter: function(params) {
            return params.value;
          }
        }
      }
    },
    xAxis: {
      type: "category"
    },
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: function(params) {
            if (params > 10000) {
              return Math.round(params / 100) / 100.0 + "万";
            } else {
              return params;
            }
          }
        },
        splitLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: "差距变化",
        smooth: true,
        showSymbol: false,
        type: "bar",
        animationDelay: function(idx) {
          return idx * 10;
        }
      }
    ],
    animationEasing: "elasticOut",
    animationDelayUpdate: function(idx) {
      return idx * 5;
    }
  };
  return Chart;
}
export default drawChart;
