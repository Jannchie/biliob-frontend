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
const Tracer = () => import("./views/Tracer.vue");
const TracerDashboard = () => import("@/components/Tracer/Dashboard.vue");
const TracerSpider = () => import("@/components/Tracer/Spider.vue");
const TracerSchedule = () => import("@/components/Tracer/Schedule.vue");
const TracerUser = () => import("@/components/Tracer/User.vue");
const TracerNoRole = () => import("@/components/Tracer/NoRole.vue");
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
          path: "/index.html",
          component: Home
        },
        {
          path: "/",
          component: Home
        },
        {
          path: "/rank",
          component: Rank
        },
        {
          path: "/event",
          component: Occurrence
        },
        {
          path: "/author/versus",
          component: AuthorVersus
        },
        {
          path: "/author/:mid",
          component: Author
        },
        {
          path: "/author/:mid/video/:aid",
          component: Video
        },
        {
          path: "/author",
          component: AuthorList
        },
        {
          path: "/login",
          component: Login
        },
        {
          path: "/signin",
          component: Signin
        },
        {
          path: "/video",
          component: VideoList
        },
        {
          path: "/user/author",
          component: FavoriteAuthorList
        },
        {
          path: "/user/video",
          component: FavoriteVideoList
        },
        {
          path: "/log",
          component: Log
        },
        {
          path: "/faq",
          component: FAQ
        },
        {
          path: "/about",
          component: About
        },
        {
          path: "/rank/user",
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
