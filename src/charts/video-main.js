var moment = require('moment')

function drawGraph (data) {
  let graph = {
    title: {
      left: 'center',
      subtext: '各项指标总量',
      text: data.title
    },
    legend: {
      data: ['播放', '弹幕', '收藏', '分享', '硬币', '点赞', '差评'],
      bottom: '5px'
    },
    dataZoom: [{
      type: 'inside',
      filterMode: 'weakFilter'
    }, {
      handleSize: '100%',
      handleStyle: {
      },
      bottom: '50px'
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      bottom: '120px'
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return '日期：' + moment(params.value).utcOffset(0).format('YYYY-MM-DD HH:mm')
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
    dataset: {
      source: data.data.reverse()
    },
    series: [{
      type: 'line',
      dimensions: ['datetime', 'view'],
      name: '播放',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 1
    }, {
      type: 'line',
      dimensions: ['datetime', 'danmaku'],
      name: '弹幕',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }, {
      type: 'line',
      dimensions: ['datetime', 'coin'],
      name: '硬币',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }, {
      type: 'line',
      dimensions: ['datetime', 'favorite'],
      name: '收藏',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }, {
      type: 'line',
      dimensions: ['datetime', 'share'],
      name: '分享',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }, {
      type: 'line',
      dimensions: ['datetime', 'like'],
      name: '点赞',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }, {
      type: 'line',
      dimensions: ['datetime', 'dislike'],
      name: '差评',
      smoothMonotone: 'x',
      smooth: true,
      showSymbol: false,
      yAxisIndex: 0
    }]
  }
  return graph
}
export default drawGraph
