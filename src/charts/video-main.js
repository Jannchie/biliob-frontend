function drawGraph (data) {
  let view = []
  let danmaku = []
  let favorite = []
  let coin = []
  let like = []
  let dislike = []
  let share = []
  data.data.forEach(d => {
    view.push([d['datetime'], d['view']])
    danmaku.push([d['datetime'], d['danmaku']])
    favorite.push([d['datetime'], d['favorite']])
    coin.push([d['datetime'], d['coin']])
    share.push([d['datetime'], d['share']])
    like.push([d['datetime'], d['like']])
    dislike.push([d['datetime'], d['dislike']])
  })
  let graph = {
    title: {
      left: 'center',
      subtext: '各项指标总量',
      text: data.title
    },
    legend: {
      data: ['播放量', '弹幕数', '收藏数', '硬币数', '分享数', '点赞数', '差评数'],
      bottom: '5px'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            let date = new Date(params.value)
            return '日期：' + (date.getFullYear()) + '-' + (date.getMonth() + 1) + '-' + date.getUTCDate() + ' ' +
              date.getHours() + ':' + date.getMinutes()
          }
        }
      }
    },
    yAxis: [{
      type: 'value',
      splitLine: {
        show: true
      }
    }, {
      type: 'value',
      splitLine: {
        show: true
      }
    }],
    series: [{
      name: '播放量',
      data: view,
      smooth: true,
      showSymbol: false,
      yAxisIndex: 1,
      type: 'line'
    }, {
      name: '弹幕数',
      smooth: true,
      data: danmaku,
      showSymbol: false,
      type: 'line'
    }, {
      name: '收藏数',
      smooth: true,
      data: favorite,
      showSymbol: false,
      type: 'line'
    }, {
      name: '硬币数',
      smooth: true,
      data: coin,
      showSymbol: false,
      type: 'line'
    }, {
      name: '点赞数',
      smooth: true,
      data: like,
      showSymbol: false,
      type: 'line'
    }, {
      name: '差评数',
      data: dislike,
      showSymbol: false,
      type: 'line'
    }, {
      name: '分享数',
      data: share,
      showSymbol: false,
      type: 'line'
    }]
  }
  return graph
}
export default drawGraph
