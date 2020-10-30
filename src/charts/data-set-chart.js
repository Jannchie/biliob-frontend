import fmt from "date-fns/format";

export default function getOpions(data, dateKey, fieldDict) {
  return {
    legend: {
      selectedMode: "single",
    },
    tooltip: {
      show: true,
      axisPointer: { type: "cross" },
      trigger: "axis",
    },
    grid: {
      left: "10px",
      right: "50px",
      top: "30px",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
        filterMode: "weakFilter",
      },
      {
        handleSize: "100%",
        handleStyle: {},
        bottom: "20px",
      },
    ],
    xAxis: {
      type: "time",
      axisPointer: {
        label: {
          formatter: (d) => fmt(d.value, "YYYY-MM-DD HH:mm"),
        },
      },
    },
    yAxis: {
      min: "dataMin",
      axisPointer: {
        label: {
          formatter: (d) => d.value.toFixed(0),
        },
      },
      axisLabel: {
        formatter: (d) =>
          new Intl.NumberFormat("zh-CN", {
            notation: "compact",
            maximumFractionDigits: 2,
          }).format(d.toFixed(0)),
        type: "value",
      },
    },
    dataset: { source: data },
    series: Object.keys(fieldDict).map((k, i) => {
      return {
        type: "line",
        name: fieldDict[k],
        showSymbol: false,
        encode: { x: dateKey, y: k },
      };
    }),
  };
}
