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
  mounted () {
    this.$store.commit('toElse')
  },
  data () {
    return {
      timelinePost: [
        {
          title: '里程碑-项目启动',
          date: '2018-08-03',
          text: '初始化了前后端工程，标志着该项目正式启动。\n这里记录了项目的所有进度。\n希望我能够把这个项目坚持下去。',
          type: 'milestone'
        }, {
          title: '功能更新-数据可视化、注册登录',
          date: '2018-10-26',
          text: '完成了基本的数据可视化，完成了注册登录模块，使用Vuetify完全地重构了前端的代码。\n总体来说，现在能够更加合理地统一手机端和PC端的UI风格，可能现在还比较简陋，我会不断添加新的功能和美化界面的。',
          type: 'feature'
        }, {
          title: '里程碑-首次公开',
          date: '2018-10-28',
          text: '第一次公开这个网站，收获了首批用户。目前大概有两百多个注册账号，这些都是宝贵的财富，你们能够通过添加视频和作者的追踪使得这个数据库更加完善和全面。',
          type: 'milestone'
        }, {
          title: '架构更新-采用CDN、Nginx反向代理',
          date: '2018-11-10',
          text: '使用CDN缓存，使用Ngnix反向代理。\n现在不会暴露某些不该暴露的端口了。如果存在一些安全方面的漏洞，希望大佬能够邮件我报告问题。',
          type: 'structure'
        }, {
          title: '错误修复-关注UP主列表',
          date: '2018-11-20',
          text: '修复了关注UP主呈现错误的Bug。之前的关注UP主读取的是关注视频的列表，是个非常愚蠢的错误，而且居然没有人给我报告这个问题，看来用这网站的人真的很少_(:з」∠)_\n',
          type: 'fix'
        }, {
          title: '里程碑-获得域名',
          date: '2018-11-20',
          text: '现在可以通过"www.biliob.com"这个网址进入这个网站了。\n',
          type: 'milestone'
        }, {
          title: '功能更新-有图标辣',
          date: '2018-11-21',
          text: '给这个网站添加了一个简单的小图标。感觉不是很耐看，以后会重新制作一个。',
          type: 'feature'
        }, {
          title: '架构更新-后端自动部署',
          date: '2018-11-22',
          text: '使用Jenkins对后端进行持续集成。经过一段时间的摸索，我终于良好地实现自动部署了。\n现在配置文件也获得了更新，使用环境变量存储敏感信息，使用更为简洁的yaml配置文件，并且github上不再缺失配置文件了。',
          type: 'structure'
        }, {
          title: '架构更新-采用HTTPS',
          date: '2018-11-23',
          text: '采用HTTPS传输数据，更加安全...或许吧，其实我只是因为不安全网站无法显示小图标感到心塞塞才应用的HTTPS。并且使用相对协议，同时支持HTTP请求和HTTPS请求。',
          type: 'structure'
        }, {
          title: '修复错误-修复显示错误',
          date: '2018-11-23',
          text: '现在标题的下方不会出现丑陋的白边了，感觉可能会好看一点吧。',
          type: 'fix'
        }, {
          title: '功能更新-UP主头像超链接',
          date: '2018-11-23',
          text: '现在点击UP主的头像能进入UP主的页面了，当然是站内的页面，之后需要做一个按钮之类的导航到B站个人中心。',
          type: 'feature'
        }, {
          title: '修复错误-提高兼容性',
          date: '2018-11-23',
          text: '提高了兼容性，但是还不完美。研究了很长时间，现在应该能兼容大部分手机了，但是非常奇怪的是，IE11会显示白屏。经过长时间的排查，发现是vue-echarts模块的问题，但我尝试使用babel处理却无效，以后再搞这个吧，现已加入待办事项。',
          type: 'fix'
        }, {
          title: '功能更新-萌化，状态管理',
          date: '2018-11-24',
          text: '萌化了系统提示(*^▽^*)，优化了前端的状态管理，具体来说，就是左下角的小球球显示更加正常了，并且现在绿色问号有了正常的行为。',
          type: 'feature'
        }, {
          title: '修复错误-个别UP主现可观测',
          date: '2018-11-24',
          text: '现在能够成功观测一些本来蜜汁不能的up主。',
          type: 'fix'
        }
      ]
    }
  }
}
</script>
