function drawGraph (data) {
  let fans = []

  data.data.forEach(d => {
    fans.push([d['datetime'], d['fans']])
  })
  let graph = {
    title: {
      left: 'center',
      subtext: '粉丝数变化趋势',
      text: data.name
    },
    legend: {
      data: ['粉丝数'],
      bottom: '5px'
    },
    grid: {
      bottom: '120px'
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
      min: 'dataMin',
      splitLine: {
        show: true
      }
    }],
    series: [{
      name: '粉丝数',
      data: fans.reverse(),
      smooth: true,
      showSymbol: false,
      type: 'line'
    }]
  }
  return graph
}
export default drawGraph
