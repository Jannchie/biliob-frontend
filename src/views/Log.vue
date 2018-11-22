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
        case 'fix':
          return 'mdi-bug'
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
        case 'fix':
          return 'red'
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
          text: '初始化了前后端工程，标志着该项目正式启动。\n这里记录了项目的所有进度。\n希望我能够把这个项目坚持下去。',
          type: 'milestone'
        }, {
          title: '功能更新',
          date: '2018-10-26',
          text: '完成了基本的数据可视化，完成了注册登录模块，使用Vuetify完全地重构了前端的代码。\n总体来说，现在能够更加合理地统一手机端和PC端的UI风格，可能现在还比较简陋，我会不断添加新的功能和美化界面的。',
          type: 'feature'
        }, {
          title: '首次公开',
          date: '2018-10-28',
          text: '第一次公开这个网站，收获了首批用户。目前大概有两百多个注册账号，这些都是宝贵的财富，你们能够通过添加视频和作者的追踪使得这个数据库更加完善和全面。',
          type: 'milestone'
        }, {
          title: '架构更新',
          date: '2018-11-10',
          text: '使用CDN缓存，使用Ngnix反向代理。\n现在不会暴露某些不该暴露的端口了。如果存在一些安全方面的漏洞，希望大佬能够邮件我报告问题。',
          type: 'structure'
        }, {
          title: '错误修复',
          date: '2018-11-20',
          text: '修复了关注UP主呈现错误的Bug。之前的关注UP主读取的是关注视频的列表，是个非常愚蠢的错误，而且居然没有人给我报告这个问题，看来用这网站的人真的很少_(:з」∠)_\n',
          type: 'fix'
        }, {
          title: '获得域名',
          date: '2018-11-20',
          text: '现在可以通过"www.biliob.com"这个网址进入这个网站了。\n',
          type: 'milestone'
        }, {
          title: '有图标辣',
          date: '2018-11-21',
          text: '给这个网站添加了一个简单的小图标。感觉不是很耐看，以后会重新制作一个。',
          type: 'feature'
        }, {
          title: '架构更新',
          date: '2018-11-22',
          text: '使用Jenkins对后端进行持续集成。经过一段时间的摸索，我终于良好地实现自动部署了。\n现在配置文件也获得了更新，使用环境变量存储敏感信息，使用更为简洁的yaml配置文件，并且github上不再缺失配置文件了。',
          type: 'structure'
        }
      ]
    }
  }
}
</script>
