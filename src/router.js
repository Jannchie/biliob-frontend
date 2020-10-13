import Vue from "vue";
import Router from "vue-router";
const MasterIndex = () => import("./views/master/Index.vue");
const LayoutMaster = () => import("@/components/layout/Master.vue");
const Rank = () => import("./views/master/Rank.vue");
const Author = () => import("./views/master/Author.vue");
const Video = () => import("./views/master/Video.vue");
const AuthorList = () => import("./views/master/AuthorList.vue");
const FavoriteAuthorList = () =>
  import("./views/master/user/FavoriteAuthorList.vue");
const FavoriteVideoList = () =>
  import("./views/master/user/FavoriteVideoList.vue");
const VideoList = () => import("./views/master/VideoList.vue");
const Log = () => import("./views/master/Log.vue");
const Login = () => import("./views/master/Login.vue");
const Signin = () => import("./views/master/Signin.vue");
const NotFound = () => import("./views/NotFound.vue");
const About = () => import("./views/master/About.vue");
const Occurrence = () => import("./views/master/Event.vue");
const FAQ = () => import("./views/master/FAQ.vue");
const User = () => import("./views/master/User.vue");
const UserRank = () => import("./views/master/UserRank.vue");
const UserRecord = () => import("./views/master/user/Record.vue");
const Test = () => import("./views/Test.vue");
const AuthorVersus = () => import("./views/master/AuthorVersus.vue");
const Tracer = () => import("./views/admin/Layout.vue");
const TracerDashboard = () => import("@/views/admin/Index.vue");
const TracerSpider = () => import("@/views/admin/Spider.vue");
const TracerSchedule = () => import("@/views/admin/Schedule.vue");
const TracerUser = () => import("@/components/Tracer/User.vue");
const TracerNoRole = () => import("@/components/Tracer/NoRole.vue");
const TracerUpload = () => import("@/components/Tracer/Upload.vue");
const UserInfo = () => import("@/views/master/user/Info.vue");
const VideoInfo = () => import("@/views/master/video/Info.vue");
const VideoStat = () => import("@/views/master/video/Stat.vue");
const VideoIndex = () => import("@/views/master/video/Index.vue");

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      component: LayoutMaster,
      children: [
        {
          name: "首页",
          path: "/index.html",
          component: MasterIndex,
        },
        {
          name: "修改密码",
          path: "/password",
          component: () => import("@/views/master/user/Password.vue"),
        },
        {
          name: "UP主群组",
          path: "/authorgroup",
          component: () => import("@/views/master/author/group/Index.vue"),
        },
        {
          path: "/authorgroup/:gid/manage",
          name: "管理群组",
          component: () => import("@/views/master/author/group/Manage.vue"),
        },
        {
          path: "/authorgroup/:gid/detail",
          name: "群组详情",
          component: () => import("@/views/master/author/group/Detail.vue"),
        },
        {
          name: "见齐指数",
          path: "/index",
          component: () => import("@/views/master/index/Index.vue"),
          children: [
            {
              path: ":keyword",
              name: "关键词",
              component: () => import("@/views/master/index/Keyword.vue"),
            },
          ],
        },
        {
          name: "专题查询",
          path: "/bangumi",
          component: () => import("@/views/master/bangumi/BangumiList.vue"),
        },
        {
          name: "专题详情",
          path: "/bangumi/:sid",
          component: () => import("@/views/master/bangumi/BangumiDetail.vue"),
        },
        {
          name: "观测者议会",
          path: "/agenda",
          component: () => import("@/views/master/agenda/Index.vue"),
        },
        {
          name: "个人中心",
          path: "/user",
          component: User,
          children: [
            {
              name: "我的个人信息",
              path: "info",
              component: UserInfo,
            },
            {
              path: "record",
              name: "我的操作记录",
              component: UserRecord,
            },
            {
              name: "我的UP主群组",
              path: "authorgroup",
              component: () => import("@/views/master/user/AuthorGroup.vue"),
              children: [
                {
                  path: ":catalog",
                  name: "我的UP主群组列表",
                  component: () =>
                    import("@/views/master/user/AuthorGroupList.vue"),
                },
              ],
            },
          ],
        },
        {
          path: "/",
          name: "主站首页",
          component: MasterIndex,
        },
        {
          path: "/tools",
          name: "小工具",
          component: () => import("./views/master/tools/Index.vue"),
        },
        {
          path: "/tools/BV2av",
          name: "BV号转av号",
          component: () => import("./views/master/tools/DecodeBV.vue"),
        },
        {
          path: "/tools/av2BV",
          name: "av号转BV号",
          component: () => import("./views/master/tools/EncodeAV.vue"),
        },
        {
          path: "/rank",
          name: "排行榜",
          component: Rank,
          children: [
            {
              name: "UP主涨粉排行榜",
              path: "fans-increase",
              component: () => import("./views/master/rank/Up.vue"),
            },
            {
              name: "UP主掉粉排行榜",
              path: "fans-decrease",
              component: () => import("./views/master/rank/Up.vue"),
            },
          ],
        },
        {
          name: "粉丝变动率",
          path: "/event",
          component: Occurrence,
        },
        {
          path: "/author/versus",
          name: "榜首粉丝对比",
          component: AuthorVersus,
        },
        {
          path: "/author/:mid",
          name: "UP主信息详情",
          component: Author,
        },
        {
          path: "/authorlist/",
          name: "UP主数据列表",
          component: AuthorList,
        },
        {
          path: "/author/:mid/video/:aid",
          name: "视频详细数据",
          component: Video,
        },
        {
          path: "/video/BV:bvid",
          name: "视频-BV",
          component: VideoIndex,
          children: [
            {
              name: "视频-BV-历史",
              path: "stat",
              component: () => import("./views/master/video/Stat.vue"),
            },
            {
              name: "视频-BV-信息",
              path: "info",
              component: () => import("./views/master/video/Info.vue"),
            },
          ],
        },
        {
          path: "/video/av:aid",
          name: "视频-av",
          component: VideoIndex,
          children: [
            {
              name: "视频-av-历史",
              path: "stat",
            },
            {
              name: "视频-av-信息",
              path: "info",
            },
          ],
        },
        {
          path: "/login",
          name: "观测者登录",
          component: Login,
        },
        {
          path: "/signin",
          name: "观测者注册",
          component: Signin,
        },
        {
          path: "/videolist",
          name: "视频数据列表",
          component: VideoList,
        },
        {
          name: "我关注的作者",
          path: "/user/author",
          component: FavoriteAuthorList,
        },
        {
          name: "我收藏的作品",
          path: "/user/video",
          component: FavoriteVideoList,
        },
        {
          path: "/log",
          name: "更新日志",
          component: Log,
        },
        {
          path: "/faq",
          name: "问答",
          component: FAQ,
        },
        {
          path: "/about",
          name: "关于",
          component: About,
        },
        {
          path: "/user/rank",
          name: "观测者排行",
          component: UserRank,
        },

        {
          path: "/test",
          name: "测试",
          component: Test,
        },
        {
          path: "/download/app",
          name: "下载APP",
          component: () => import("@/views/master/download/App.vue"),
        },
        {
          path: "/privacy",
          name: "隐私权政策",
          component: () => import("@/views/master/Privacy.vue"),
        },
      ],
    },
    {
      path: "/tracer",
      component: Tracer,
      children: [
        {
          path: "",
          name: "BiliOB观测者-管理系统",
          component: TracerDashboard,
        },
        {
          path: "dashboard",
          name: "仪表盘",
          component: TracerDashboard,
        },
        {
          path: "spider",
          name: "爬虫服务概览",
          component: TracerSpider,
        },
        {
          path: "schedule",
          name: "计划任务概览",
          component: TracerSchedule,
        },
        {
          path: "user",
          name: "用户概览",
          component: TracerUser,
        },
        {
          path: "no-role",
          name: "权限验证失败",
          component: TracerNoRole,
        },
        {
          path: "upload",
          name: "上传任务",
          component: TracerUpload,
        },
      ],
    },
    {
      path: "*",
      component: NotFound,
    },
  ],
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});
