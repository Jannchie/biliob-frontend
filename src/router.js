import Vue from "vue";
import Router from "vue-router";
const HomeSite = () => import("./views/HomeSite.vue");
const Home = () => import("./views/Home.vue");
const Rank = () => import("./views/Rank.vue");
const Author = () => import("./views/Author.vue");
const Video = () => import("./views/Video.vue");
const AuthorList = () => import("./views/AuthorList.vue");
const FavoriteAuthorList = () => import("./views/FavoriteAuthorList.vue");
const FavoriteVideoList = () => import("./views/FavoriteVideoList.vue");
const VideoList = () => import("./views/VideoList.vue");
const Log = () => import("./views/Log.vue");
const Login = () => import("./views/Login.vue");
const Signin = () => import("./views/Signin.vue");
const NotFound = () => import("./views/NotFound.vue");
const About = () => import("./views/About.vue");
const Occurrence = () => import("./views/Event.vue");
const FAQ = () => import("./views/FAQ.vue");
const UserRank = () => import("./views/UserRank.vue");
const UserRecord = () => import("./views/UserRecord.vue");
const Test = () => import("./views/Test.vue");
const Android = () => import("./views/Android.vue");
const AuthorVersus = () => import("./views/AuthorVersus.vue");
const Donate = () => import("./views/Donate.vue");
const Tracer = () => import("./views/Tracer.vue");
const TracerDashboard = () => import("@/components/Tracer/Dashboard.vue");
const TracerSpider = () => import("@/components/Tracer/Spider.vue");
const TracerSchedule = () => import("@/components/Tracer/Schedule.vue");
const TracerUser = () => import("@/components/Tracer/User.vue");
const TracerNoRole = () => import("@/components/Tracer/NoRole.vue");
const TracerUpload = () => import("@/components/Tracer/Upload.vue");
Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: HomeSite,
      children: [
        {
          name: "首页",
          path: "/index.html",
          component: Home
        },
        {
          name: "首页",
          path: "/",
          component: Home
        },
        {
          name: "排行榜",
          path: "/rank",
          component: Rank
        },
        {
          name: "粉丝变动率",
          path: "/event",
          component: Occurrence
        },
        {
          name: "UP主对比",
          path: "/author/versus",
          component: AuthorVersus
        },
        {
          name: "UP主数据",
          path: "/author/:mid",
          component: Author
        },
        {
          name: "视频数据",
          path: "/author/:mid/video/:aid",
          component: Video
        },
        {
          name: "UP主列表",
          path: "/author",
          component: AuthorList
        },
        {
          name: "登陆",
          path: "/login",
          component: Login
        },
        {
          name: "注册",
          path: "/signin",
          component: Signin
        },
        {
          name: "视频列表",
          path: "/video",
          component: VideoList
        },
        {
          name: "我关注的作者",
          path: "/user/author",
          component: FavoriteAuthorList
        },
        {
          name: "我收藏的作品",
          path: "/user/video",
          component: FavoriteVideoList
        },
        {
          path: "/log",
          name: "开发日志",
          component: Log
        },
        {
          path: "/faq",
          name: "常见问题解答",
          component: FAQ
        },
        {
          path: "/about",
          name: "关于",
          component: About
        },
        {
          path: "/rank/user",
          name: "观测者排行",
          component: UserRank
        },
        {
          path: "/user/record",
          name: "我的操作记录",
          component: UserRecord
        },
        {
          path: "/test",
          name: "测试",
          component: Test
        },
        {
          path: "/download/android",
          name: "下载安卓客户端",
          component: Android
        },
        {
          path: "/donate",
          name: "捐助",
          component: Donate
        }
      ]
    },

    {
      path: "/tracer",
      component: Tracer,
      children: [
        {
          path: "",
          name: "BiliOB观测者-管理系统",
          component: TracerDashboard
        },
        {
          path: "dashboard",
          name: "仪表盘",
          component: TracerDashboard
        },
        {
          path: "spider",
          name: "爬虫服务概览",
          component: TracerSpider
        },
        {
          path: "schedule",
          name: "计划任务概览",
          component: TracerSchedule
        },
        {
          path: "user",
          name: "用户概览",
          component: TracerUser
        },
        {
          path: "no-role",
          name: "权限验证失败",
          component: TracerNoRole
        },
        {
          path: "upload",
          name: "上传任务",
          component: TracerUpload
        }
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0
    };
  }
});
