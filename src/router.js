import Vue from "vue";
import Router from "vue-router";
const home = () => import("./views/Home.vue");
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

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: home
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
      path: "*",
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
