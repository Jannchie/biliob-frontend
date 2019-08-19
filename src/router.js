import Vue from "vue";
import Router from "vue-router";
const MasterIndex = () => import("./views/master/Index.vue");
const LayoutMaster = () => import("@/components/layout/Master.vue");
const Rank = () => import("./views/master/Rank.vue");
const Author = () => import("./views/master/Author.vue");
const Video = () => import("./views/master/Video.vue");
const AuthorList = () => import("./views/master/AuthorList.vue");
const FavoriteAuthorList = () => import("./views/FavoriteAuthorList.vue");
const FavoriteVideoList = () => import("./views/FavoriteVideoList.vue");
const VideoList = () => import("./views/master/VideoList.vue");
const Log = () => import("./views/Log.vue");
const Login = () => import("./views/Login.vue");
const Signin = () => import("./views/Signin.vue");
const NotFound = () => import("./views/NotFound.vue");
const About = () => import("./views/master/About.vue");
const Occurrence = () => import("./views/Event.vue");
const FAQ = () => import("./views/master/FAQ.vue");
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
      name: "首页",
      component: LayoutMaster,
      children: [
        {
          path: "/index.html",
          name: "主站",
          component: MasterIndex
        },
        {
          path: "/",
          name: "主站首页",
          component: MasterIndex
        },
        {
          path: "/rank",
          name: "排行榜",
          component: Rank
        },
        {
          path: "/event",
          name: "粉丝波动",
          component: Occurrence
        },
        {
          path: "/author/versus",
          name: "榜首粉丝对比",
          component: AuthorVersus
        },
        {
          path: "/author/:mid",
          name: "UP主信息详情",
          component: Author
        },
        {
          path: "/author/:mid/video/:aid",
          name: "视频详细数据",
          component: Video
        },
        {
          path: "/author",
          name: "UP主数据列表",
          component: AuthorList
        },
        {
          path: "/login",
          name: "用户登录",
          component: Login
        },
        {
          path: "/signin",
          name: "用户注册",
          component: Signin
        },
        {
          path: "/video",
          name: "视频数据列表",
          component: VideoList
        },
        {
          path: "/user/author",
          name: "我关注的用户",
          component: FavoriteAuthorList
        },
        {
          path: "/user/video",
          name: "我关注的作者",
          component: FavoriteVideoList
        },
        {
          path: "/log",
          name: "更新日志",
          component: Log
        },
        {
          path: "/faq",
          name: "问答",
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
          component: UserRecord
        },
        {
          path: "/test",
          component: Test
        },
        {
          path: "/download/android",
          component: Android
        },
        {
          path: "/donate",
          component: Donate
        },
        {
          path: "*",
          component: NotFound
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
