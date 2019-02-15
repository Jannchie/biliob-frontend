<template>
  <VTimeline
    class="timeline"
    dense
  >
    <VSlideYTransition group>
      <VTimelineItem
        v-for="(eachPost,index) in timelinePost"
        :key="index"
        :color="getColor(eachPost.type)"
        :icon="getIcon(eachPost.type)"
        :large="isLarge(eachPost.type)"
      >
        <VLayout pt-3>
          <VFlex>
            <strong>{{ eachPost.title }}</strong><span
              class="grey white--text darken-2"
              style="border-radius:3px;padding:1px 5px;margin:0px 5px"
            >{{eachPost.version}}</span>
            <br>
            <strong class="caption mb-1">
              {{ eachPost.date }}
            </strong>
            <div class="caption mb-2">
              <li
                v-for="eachLine in eachPost.list"
                :key="eachLine.text"
                type="circle"
              >
                <VIcon small>{{getListIcon(eachLine.type)}}</VIcon>
                {{ eachLine.text }}
              </li>
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
          version: "ver.0.0.0",
          date: "2018-08-03",
          list: [
            { text: "初始化了前后端工程", type: "stone" },
            { text: "标志着该项目正式启动", type: "stone" }
          ],
          type: "holyshit"
        },
        {
          title: "综合更新",
          version: "ver.0.1.0",
          date: "2018-10-26",
          list: [
            { text: "完成了基本的数据可视化", type: "feature" },
            { text: "完成了注册登录模块", type: "feature" },
            { text: "使用Vuetify完全地重构了前端的代码", type: "beautify" },
            { text: "更加合理地统一手机端和PC端的UI风格", type: "beautify" },
            { text: "我会不断添加新的功能和美化界面的", type: "beautify" }
          ],
          type: "ordinary"
        },
        {
          title: "里程碑-首次公开",
          version: "ver.0.1.0",
          date: "2018-10-28",
          list: [
            { text: "收获了首批用户", type: "stone" },
            { text: "大家能够通过添加视频和作者的追踪", type: "stone" },
            { text: "这能使得这个网站更加完善和全面", type: "stone" }
          ],
          type: "important"
        },
        {
          title: "架构更新",
          version: "ver.0.1.0",
          date: "2018-11-10",
          list: [
            { text: "使用CDN缓存，减少了带宽压力", type: "cloud" },
            { text: "使用Ngnix反向代理", type: "cloud" },
            { text: "希望大佬能够邮件我报告可能存在的问题", type: "cloud" }
          ],
          type: "important"
        },
        {
          title: "错误修复",
          version: "ver.0.1.1",
          date: "2018-11-20",
          list: [{ text: "修复了关注UP主呈现错误的Bug", type: "fix" }],
          type: "unimportant"
        },
        {
          version: "ver.0.1.1",
          title: "里程碑-获得域名",
          date: "2018-11-20",
          list: [
            { text: '可以通过"www.biliob.com"进入这个网站了', type: "cloud" }
          ],
          type: "important"
        },
        {
          title: "美化页面",
          version: "ver.0.1.2",
          date: "2018-11-21",
          list: [
            { text: "添加了一个简单的小图标", type: "beautify" },
            { text: "以后会重新制作一个", type: "beautify" }
          ],
          type: "unimportant"
        },
        {
          title: "架构更新",
          version: "ver.0.1.3",
          date: "2018-11-22",
          list: [
            { text: "使用Jenkins对后端进行持续集成", type: "cloud" },
            { text: "我终于良好地实现自动部署了", type: "cloud" },
            { text: "现在配置文件获得了更新", type: "cloud" },
            { text: "使用环境变量存储敏感信息", type: "cloud" },
            { text: "使用更为简洁的yaml配置文件", type: "cloud" },
            { text: "github上不再缺失配置文件了", type: "cloud" }
          ],
          type: "ordinary"
        },
        {
          title: "架构更新",
          version: "ver.0.1.4",
          date: "2018-11-23",
          list: [
            { text: "采用HTTPS传输数据，更加安全", type: "cloud" },
            { text: "使用相对协议", type: "cloud" },
            { text: "现在标题的下方不会出现丑陋的白边了", type: "beautify" },
            { text: "提高了兼容性，但是还不完美", type: "feature" },
            { text: "现在应该能兼容大部分手机了", type: "feature" },
            { text: "现在点击UP主的头像能进入UP主的页面了", type: "feature" }
          ],
          type: "important"
        },
        {
          title: "功能更新",
          version: "ver.0.1.5",
          date: "2018-11-24",
          list: [
            { text: "萌化了系统提示(*^▽^*)", type: "beautify" },
            { text: "优化了前端的状态管理", type: "feature" },
            { text: "左下角的小球球显示更加正常了", type: "fix" },
            { text: "现在能够成功观测一些本来蜜汁不能的up主", type: "fix" },
            { text: "现在绿色问号有了正常的行为", type: "fix" }
          ],
          type: "ordinary"
        },
        {
          title: "综合更新",
          version: "ver.0.2.0",
          date: "2018-11-29",
          list: [
            { text: "升级至Webpack4.0，现在能完全兼容IE11了", type: "cloud" },
            { text: "并且搭建了PWA和单元测试基础设施", type: "cloud" },
            { text: "使用了更加合理的代码风格约束规范", type: "cloud" },
            { text: "随手制作了一个看上去更精致的图标", type: "beautify" },
            {
              text: "最后使用了代码拆分的技术，减少首屏加载时间",
              type: "xxxx"
            },
            { text: "作者粉丝变化率做成柱状图，更加合理", type: "beautify" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.2.1",
          date: "2018-12-07",
          list: [
            { text: "可以更方便地关注UP主和收藏视频了", type: "feature" },
            { text: "可以获得作者浏览量最高的视频了", type: "feature" },
            { text: "重构了部分前端代码，更加科学了，大概吧", type: "cloud" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新-首页",
          version: "ver.0.2.2",
          date: "2018-12-08",
          list: [
            { text: "在首页增加了近24小时以来的在线人数图表", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "修复错误-列表",
          version: "ver.0.2.3",
          date: "2018-12-09",
          list: [
            { text: "修复了翻页错误的问题", type: "fix" },
            { text: "事实上现在没有翻页这玩意了", type: "fix" },
            { text: "在滑到底端时自动刷出下一页的内容", type: "fix" }
          ],
          type: "ordinary"
        },
        {
          title: "美化页面",
          version: "ver.0.2.4",
          date: "2018-12-09",
          list: [
            { text: "现在关注按钮和收藏按钮更加美观了", type: "beautify" },
            { text: "收窄了PC端页面的大小", type: "beautify" },
            { text: "添加了链接卡片", type: "feature" },
            { text: "添加了跳转到B站的按钮", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.2.5",
          date: "2018-12-11",
          list: [{ text: "添加了排行榜页面", type: "feature" }],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.2.6",
          date: "2018-12-16",
          list: [{ text: "添加了关于页面", type: "feature" }],
          type: "unimportant"
        },
        {
          title: "功能更新",
          version: "ver.0.2.7",
          date: "2018-12-21",
          list: [
            { text: "添加事件页面", type: "feature" },
            { text: "对B站的粉丝突变进行观测", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "架构更新-Google Analysis",
          version: "ver.0.2.7",
          date: "2018-12-26",
          list: [{ text: "嵌入Google Analysis对站点进行分析", type: "cloud" }],
          type: "unimportant"
        },
        {
          title: "综合更新",
          version: "ver.0.3.0",
          date: "2019-01-03",
          list: [
            { text: "替换了许多图标，使得整体更为美观", type: "beautify" },
            { text: "添加了Banner图片", type: "beautify" },
            { text: "事件按钮被移动到了隐藏菜单栏中", type: "beautify" },
            { text: "侧边栏得到了扩充", type: "beautify" },
            { text: "加入了夜间模式", type: "feature" },
            { text: "添加了作者最近作品的列表", type: "feature" },
            { text: "增加了投稿时间以及封面图片的显示", type: "feature" },
            { text: "加入了私货广告卡片", type: "feature" },
            { text: "现在日志的最上面能看到最新的变化", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "界面美化",
          version: "ver.0.3.1",
          date: "2019-01-05",
          list: [{ text: "添加了侧边栏主题站娘图片的显示", type: "beautify" }],
          type: "ordinary"
        },
        {
          title: "界面美化",
          version: "ver.0.3.2",
          date: "2019-01-11",
          list: [
            { text: "修正了日志页面的时间错误", type: "fix" },
            { text: "使用列表来重新组织了日志页面", type: "beautify" },
            { text: "添加了新的日志滑动动画", type: "beautify" },
            { text: "美化小图标", type: "beautify" }
          ],
          type: "ordinary"
        },
        {
          title: "修复错误",
          version: "ver.0.3.3",
          date: "2019-01-12",
          list: [
            { text: "修复了排行榜总是滞后一天的BUG", type: "fix" },
            { text: "美化了排行榜", type: "beautify" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.3.4",
          date: "2019-01-22",
          list: [
            { text: "增加了签到功能", type: "feature" },
            { text: "添加了积分和经验的显示", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "综合更新",
          version: "ver.0.3.5",
          date: "2019-02-01",
          list: [
            { text: "修复了多个图表显示错误", type: "fix" },
            { text: "修改了等级和积分的头衔显示", type: "beautify" },
            { text: "美化了图表的展示", type: "beautify" },
            { text: "添加了强力追踪", type: "feature" },
            { text: "强力追踪可达分钟级精确度", type: "feature" },
            { text: "自动追踪在线人数最高的20个视频", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "修复错误",
          version: "ver.0.3.6",
          date: "2019-02-01",
          list: [
            { text: "粉丝变化率图表在IE11也能兼容了", type: "feature" },
            { text: "修复了部分浏览器中图表显示异常的问题", type: "fix" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.3.7",
          date: "2019-02-08",
          list: [
            { text: "添加了FAQ页面", type: "feature" },
            { text: "修改了查看下一页的逻辑", type: "feature" },
            { text: "修改了部分头衔的显示", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.3.8",
          date: "2019-02-13",
          list: [
            { text: "修复了搜索刷新问题", type: "fix" },
            { text: "添加了作者排名展示", type: "feature" },
            { text: "修改了日志结构", type: "beautify" }
          ],
          type: "ordinary"
        },
        {
          title: "功能更新",
          version: "ver.0.3.9",
          date: "2019-02-14",
          list: [
            { text: "修复了一个样式错误", type: "fix" },
            { text: "添加了视频的排名显示", type: "feature" }
          ],
          type: "ordinary"
        },
        {
          title: "夜间模式更新",
          version: "ver.0.3.10",
          date: "2019-02-14",
          list: [
            { text: "夜间模式图标会变化了", type: "beautify" },
            { text: "记住上次离开时是否为夜间模式", type: "feature" }
          ],
          type: "unimportant"
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
      type === "holyshit" || type === "important"
        ? (isSmall = true)
        : (isSmall = false);
      return isSmall;
    },
    getIcon: function(type) {
      switch (type) {
        case "holyshit":
          return "mdi-nuke";
        case "important":
          return "mdi-flag";
        case "ordinary":
          return "mdi-desk-lamp";
        case "unimportant":
          return "mdi-coffee";
        default:
          break;
      }
    },
    getListIcon: function(type) {
      switch (type) {
        case "feature":
          return "mdi-lightbulb-on-outline";
        case "fix":
          return "mdi-bug-outline";
        case "beautify":
          return "mdi-flower-outline";
        case "stone":
          return "mdi-rocket";
        case "cloud":
          return "mdi-cloud-outline";
        default:
          break;
      }
    },
    getColor: function(type) {
      switch (type) {
        case "ordinary":
          return "orange lighten-1";
        case "unimportant":
          return "green lighten-1";
        case "holyshit":
          return "red lighten-1";
        case "important":
          return "blue lighten-1";
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.timeline {
  margin: 0 10px;
}
</style>
