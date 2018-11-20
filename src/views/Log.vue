<template>
  <v-timeline dense>
     <v-timeline-item :key="eachPost.title" v-for="eachPost in timelinePost" fill-dot :color="getColor(eachPost.type)" :icon="getIcon(eachPost.type)" :small="isSmall(eachPost.type)">
          <v-layout pt-3>
            <v-flex>
              <strong>{{eachPost.title}}</strong>
              <strong class="caption mb-1">{{eachPost.date}}</strong>
              <div class="caption mb-2">{{eachPost.text}}</div>
            </v-flex>
          </v-layout>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  methods: {
    isSmall: function (type) {
      let isSmall
      type === 'milestone' ? isSmall = false : isSmall = true
      return isSmall
    },
    getIcon: function (type) {
      switch (type) {
        case 'feature':
          return 'mdi-lightbulb'
        case 'structure':
          return 'mdi-cloud'
        case 'milestone':
          return 'mdi-flag'
        default:
          break
      }
    },
    getColor: function (type) {
      switch (type) {
        case 'feature':
          return 'orange'
        case 'structure':
          return 'blue'
        case 'milestone':
          return 'green'
        default:
          break
      }
    }
  },
  data () {
    return {
      timelinePost: [
        {
          title: '项目启动',
          date: '2018-08-03',
          text: '初始化了前后端工程，标志着该项目正式启动。',
          type: 'milestone'
        }, {
          title: '功能更新 ver.0.0.1',
          date: '2018-10-26',
          text: '完成了基本的数据可视化，完成了注册登录模块，使用Vuetify完全地重构了前端的代码。现在能够更加合理地在手机端和电脑端无差别使用。',
          type: 'feature'
        }, {
          title: '首次公开',
          date: '2018-10-28',
          text: '第一次公开这个网站，收获了首批用户。',
          type: 'milestone'
        }, {
          title: '架构更新',
          date: '2018-11-10',
          text: '正式启用域名，使用CDN缓存，使用Ngnix反向代理。',
          type: 'structure'
        }
      ]
    }
  }
}
</script>
