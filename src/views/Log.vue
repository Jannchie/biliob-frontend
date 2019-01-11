<template>
  <VTimeline dense>
    <VSlideYTransition group>
      <VTimelineItem
        v-for="eachPost in timelinePost"
        :key="eachPost.title"
        :color="getColor(eachPost.type)"
        :icon="getIcon(eachPost.type)"
        :large="isLarge(eachPost.type)"
      >
        <VLayout pt-3>
          <VFlex>
            <strong>{{eachPost.title}}</strong>
            <br>
            <strong class="caption mb-1">{{eachPost.date}}</strong>
            <div class="caption mb-2">
              <li v-for="eachLine in eachPost.text" :key="eachLine" type="circle">{{eachLine}}</li>
            </div>
          </VFlex>
        </VLayout>
      </VTimelineItem>
    </VSlideYTransition>
  </VTimeline>
</template>
<script>
export default {
  data() {
    return {
      timelinePost: [
        {
          title: "里程碑-项目启动",
          date: "2018-08-03",
          text: ["初始化了前后端工程，标志着该项目正式启动。"],
          type: "milestone"
        },
        {
          title: "综合更新 ver.0.1.0",
          date: "2018-10-26",
          text: [
            "完成了基本的数据可视化。",
            "完成了注册登录模块。",
            "使用Vuetify完全地重构了前端的代码。",
            "现在能够更加合理地统一手机端和PC端的UI风格，可能现在还比较简陋，我会不断添加新的功能和美化界面的。"
          ],
          type: "mix"
        },
        {
          title: "里程碑-首次公开",
          date: "2018-10-28",
          text: [
            "第一次公开这个网站，收获了首批用户。",
            "目前大概有两百多个注册账号，这些都是宝贵的财富。",
            "大家能够通过添加视频和作者的追踪使得这个网站更加完善和全面。"
          ],
          type: "milestone"
        },
        {
          title: "架构更新",
          date: "2018-11-10",
          text: [
            "使用CDN缓存，减少了低配服务器的带宽压力。",
            "使用Ngnix反向代理。现在不会暴露某些不该暴露的端口了。",
            "如果存在一些安全方面的漏洞，希望大佬能够邮件我报告问题。"
          ],
          type: "structure"
        },
        {
          title: "错误修复 ver.0.1.1",
          date: "2018-11-20",
          text: [
            "修复了关注UP主呈现错误的Bug。",
            "之前的关注UP主读取的是关注视频的列表，是个非常愚蠢的错误，然而没有人给我报告这个问题，看来用这网站的人真的很少_(:з」∠)_"
          ],
          type: "fix"
        },
        {
          title: "里程碑-获得域名",
          date: "2018-11-20",
          text: ['现在可以通过"www.biliob.com"这个网址进入这个网站了。'],
          type: "milestone"
        },
        {
          title: "美化页面 ver.0.1.2",
          date: "2018-11-21",
          text: [
            "给这个网站添加了一个简单的小图标。感觉不是很耐看，以后会重新制作一个。"
          ],
          type: "beautify"
        },
        {
          title: "架构更新",
          date: "2018-11-22",
          text: [
            "使用Jenkins对后端进行持续集成。经过一段时间的摸索，我终于良好地实现自动部署了。",
            "现在配置文件也获得了更新，使用环境变量存储敏感信息，使用更为简洁的yaml配置文件，并且github上不再缺失配置文件了。"
          ],
          type: "structure"
        },
        {
          title: "架构更新",
          date: "2018-11-23",
          text: [
            "采用HTTPS传输数据，更加安全...或许吧，其实我只是因为不安全网站无法显示小图标感到心塞塞才应用的HTTPS。",
            "使用相对协议，同时支持HTTP请求和HTTPS请求。"
          ],
          type: "structure"
        },
        {
          title: "修复错误 ver.0.1.3",
          date: "2018-11-23",
          text: ["现在标题的下方不会出现丑陋的白边了。"],
          type: "fix"
        },
        {
          title: "功能更新 ver.0.1.4",
          date: "2018-11-23",
          text: [
            "现在点击UP主的头像能进入UP主的页面了，不过是BiliOB站内的页面。"
          ],
          type: "feature"
        },
        {
          title: "修复错误 ver.0.1.5",
          date: "2018-11-23",
          text: [
            "提高了兼容性，但是还不完美。研究了很长时间，现在应该能兼容大部分手机了，但是非常奇怪的是，IE11会显示白屏。",
            "经过长时间的排查，发现是vue-echarts模块的问题，但我尝试使用babel处理却无效，以后再搞这个吧，现已加入待办事项。"
          ],
          type: "fix"
        },
        {
          title: "功能更新 ver.0.1.6",
          date: "2018-11-24",
          text: [
            "萌化了系统提示(*^▽^*)。",
            "优化了前端的状态管理。",
            "左下角的小球球显示更加正常了，并且现在绿色问号有了正常的行为。"
          ],
          type: "feature"
        },
        {
          title: "修复错误 ver.0.1.7",
          date: "2018-11-24",
          text: ["现在能够成功观测一些本来蜜汁不能的up主。"],
          type: "fix"
        },
        {
          title: "综合更新 ver.0.2.0",
          date: "2018-11-29",
          text: [
            "升级至Webpack4.0，现在能完全兼容IE11了。",
            "并且搭建了PWA和单元测试基础设施，使用了更加合理的代码风格约束规范。",
            "随手制作了一个看上去更精致的图标。",
            "最后使用了代码拆分的技术，去掉了一些特别巨大的模块，试图减少首屏加载时间(好像效果极其不明显)。",
            "修正了作者粉丝变化率的图表，使之成为柱状图，更加合理。"
          ],
          type: "mix"
        },
        {
          title: "功能更新 ver.0.2.1",
          date: "2018-12-07",
          text: [
            "现在可以更方便地关注UP主和收藏视频了。",
            "现在可以在作者页面获得作者浏览量最高的视频了。",
            "重构了部分前端代码，更加科学了，大概吧。"
          ],
          type: "feature"
        },
        {
          title: "功能更新-首页 ver.0.2.2",
          date: "2018-12-08",
          text: ["在首页增加了近24小时以来的在线人数图表。"],
          type: "feature"
        },
        {
          title: "修复错误-列表 ver.0.2.3",
          date: "2018-12-09",
          text: [
            "修复了在包含搜索词时所有UP主或视频列表翻页错误的问题。",
            "事实上现在没有翻页这玩意了，在滑到底端时自动刷出下一页的内容。"
          ],
          type: "fix"
        },
        {
          title: "美化页面 ver.0.2.4",
          date: "2018-12-09",
          text: [
            "现在关注按钮和收藏按钮更加美观了",
            "收窄了PC端页面的大小，添加了链接卡片,添加了跳转到B站的按钮。"
          ],
          type: "beautify"
        },
        {
          title: "功能更新 ver.0.2.5",
          date: "2018-12-11",
          text: ["添加了排行榜页面。"],
          type: "feature"
        },
        {
          title: "功能更新 ver.0.2.6",
          date: "2018-12-16",
          text: ["添加了关于页面。"],
          type: "feature"
        },
        {
          title: "功能更新 ver.0.2.7",
          date: "2018-12-21",
          text: ["添加事件页面，对B站的粉丝突变进行观测。"],
          type: "feature"
        },
        {
          title: "架构更新-Google Analysis",
          date: "2018-12-26",
          text: ["嵌入Google Analysis对站点进行分析。"],
          type: "structure"
        },
        {
          title: "综合更新 ver.0.3.0",
          date: "2019-01-03",
          text: [
            "加入了夜间模式。",
            "替换了许多图标，使得整体更为美观。",
            "添加了Banner图片。",
            "原先在底部或顶部出现的事件按钮被移动到了隐藏菜单栏中。",
            "侧边栏得到了扩充。",
            "添加了作者最近作品的列表。",
            "并且作品列表增加了投稿时间以及封面图片的显示。",
            "在视频播放页面加入了私货广告卡片。",
            "日志记录现在是倒着安排的，所以最上面能看到最新的变化。"
          ],
          type: "mix"
        },
        {
          title: "界面美化 ver.0.3.1",
          date: "2019-01-05",
          text: ["添加了侧边栏主题站娘图片的显示。"],
          type: "beautify"
        },
        {
          title: "界面美化 ver.0.3.2",
          date: "2019-01-11",
          text: [
            "修正了日志页面的时间错误。",
            "使用列表来重新组织了日志页面。",
            "添加了新的日志滑动动画。",
            "美化小图标。"
          ],
          type: "beautify"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("toElse");
    this.timelinePost.reverse();
  },
  methods: {
    isLarge: function(type) {
      let isSmall;
      type === "milestone" || type === "mix"
        ? (isSmall = true)
        : (isSmall = false);
      return isSmall;
    },
    getIcon: function(type) {
      switch (type) {
        case "feature":
          return "mdi-lightbulb";
        case "structure":
          return "mdi-cloud";
        case "milestone":
          return "mdi-flag";
        case "fix":
          return "mdi-bug-check";
        case "mix":
          return "mdi-coffee";
        case "beautify":
          return "mdi-flower-tulip";
        default:
          break;
      }
    },
    getColor: function(type) {
      switch (type) {
        case "feature":
          return "orange lighten-1";
        case "structure":
          return "indigo lighten-1";
        case "milestone":
          return "green lighten-1";
        case "fix":
          return "red lighten-1";
        case "mix":
          return "blue lighten-1";
        case "beautify":
          return "pink lighten-1";
        default:
          break;
      }
    }
  }
};
</script>
