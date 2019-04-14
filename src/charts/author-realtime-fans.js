function drawChart(aData, bData, tData, aName, bName) {
  let Chart = {
    title: {
      left: "center",
      text: "实时粉丝变化趋势-近10分钟增长",
      subtext: `${aName} VS ${bName}`
    },
    legend: {
      data: [aName, bName],
      bottom: "5px"
    },
    grid: {
      bottom: "50px",
      right: "40px",
      left: "60px",
      top: "50px"
    },
    axisLabel: {
      formatter: function(params) {
        return params.slice(11);
      }
    },
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        label: {
          formatter: function(params) {
            return Math.round(params.value);
          }
        }
      }
    },
    xAxis: {
      type: "category",
      data: tData,
      axisPointer: {
        label: {
          formatter: function(params) {
            return "日期：" + params.value;
          }
        }
      }
    },
    yAxis: [
      {
        type: "value",
        min: "dataMin",
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
        name: aName,
        data: aData,
        smooth: true,
        showSymbol: false,
        type: "line"
      },
      {
        name: bName,
        data: bData,
        smooth: true,
        showSymbol: false,
        type: "line"
      }
    ]
  };
  return Chart;
}
export default drawChart;
