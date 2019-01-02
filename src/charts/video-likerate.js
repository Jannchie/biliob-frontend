function drawChart(data) {
  let Chart = {
    title: [
      {
        left: "center",
        subtext: "好评率"
      },
      {
        left: "50%",
        top: "center",
        textAlign: "center",
        text: "点赞/播放",
        color: "#123151"
      }
    ],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        type: "pie",
        name: "点赞/播放",
        radius: ["50%", "70%"],
        center: ["50%", "50%"],
        data: [
          { value: data.data[0].like, name: "点赞" },
          { value: data.data[0].view, name: "播放" }
        ]
      }
    ]
  };
  return Chart;
}
export default drawChart;
