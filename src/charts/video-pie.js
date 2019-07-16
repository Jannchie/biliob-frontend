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
        selectedOffset: 1,
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
            value: data.cView / 100,
            selected: true,
            name: "百次播放"
          },
          {
            value: data.cDanmaku,
            name: "弹幕",
            selected: true
          }
        ]
      },
      {
        type: "pie",
        selectedOffset: 1,
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
            value: data.cView / 100,
            selected: true,
            name: "百次播放"
          },
          {
            value: data.cCoin,
            name: "硬币",
            selected: true
          }
        ]
      },

      {
        type: "pie",
        selectedOffset: 1,
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
            value: data.cView / 100,
            selected: true,
            name: "百次播放"
          },
          {
            value: data.cFavorite,
            name: "收藏",
            selected: true
          }
        ]
      },
      {
        type: "pie",
        selectedOffset: 1,
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
            value: data.cView / 100,
            selected: true,
            name: "百次播放"
          },
          {
            value: data.cShare,
            name: "分享",
            selected: true
          }
        ]
      },
      {
        type: "pie",
        selectedOffset: 1,
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
            value: data.cView / 100,
            selected: true,
            name: "百次播放"
          },
          {
            value: data.cLike,
            name: "点赞",
            selected: true
          }
        ]
      },
      {
        type: "pie",
        selectedOffset: 1,
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
            value: data.cLike,
            name: "点赞",
            selected: true
          },
          {
            value: data.cCoin,
            name: "硬币",
            selected: true
          },
          {
            value: data.cFavorite,
            name: "收藏",
            selected: true
          }
        ]
      }
    ]
  };
  return Chart;
}
export default drawChart;
