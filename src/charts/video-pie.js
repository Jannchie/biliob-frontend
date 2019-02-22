function drawChart(data) {
  let Chart = {
    title: [
      {
        left: "50%",
        top: "40%",
        textAlign: "center",
        subtext: "各维度数据比较"
      }
    ],
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        type: "pie",
        name: "弹幕率（弹幕数:百次播放）",
        radius: ["25%", "30%"],
        center: ["50%", "25%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].view / 100,
            name: "百次播放"
          },
          {
            value: data.data[0].danmaku,
            name: "弹幕"
          }
        ]
      },
      {
        type: "pie",
        name: "硬币率（硬币数:百次播放）",
        radius: ["25%", "30%"],
        center: ["75%", "25%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].view / 100,
            name: "百次播放"
          },
          {
            value: data.data[0].coin,
            name: "硬币"
          }
        ]
      },

      {
        type: "pie",
        name: "收藏率（收藏数:百次播放）",
        radius: ["25%", "30%"],
        center: ["75%", "75%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].view / 100,
            name: "百次播放"
          },
          {
            value: data.data[0].favorite,
            name: "收藏"
          }
        ]
      },
      {
        type: "pie",
        name: "分享率（分享数:百次播放）",
        radius: ["25%", "30%"],
        center: ["50%", "75%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].view / 100,
            name: "百次播放"
          },
          {
            value: data.data[0].share,
            name: "分享"
          }
        ]
      },
      {
        type: "pie",
        name: "点赞率（点赞数:百次播放）",
        radius: ["25%", "30%"],
        center: ["25%", "75%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].view / 100,
            name: "百次播放"
          },
          {
            value: data.data[0].like,
            name: "点赞"
          }
        ]
      },
      {
        type: "pie",
        name: "三维(点赞：硬币：收藏)",
        radius: ["25%", "30%"],
        center: ["25%", "25%"],
        hoverOffset: 2,
        emphasis: {},
        label: {
          position: "inner"
        },
        data: [
          {
            value: data.data[0].like,
            name: "点赞"
          },
          {
            value: data.data[0].coin,
            name: "硬币"
          },
          {
            value: data.data[0].favorite,
            name: "收藏"
          }
        ]
      }
    ]
  };
  return Chart;
}
export default drawChart;
