import Vue from "vue";
import Router from "vue-router";
import home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Signin from "./views/Signin.vue";
import Author from "./views/Author.vue";
import Video from "./views/Video.vue";
import AuthorList from "./views/AuthorList.vue";
import FavoriteAuthorList from "./views/FavoriteAuthorList.vue";
import FavoriteVideoList from "./views/FavoriteVideoList.vue";
import VideoList from "./views/VideoList.vue";
import NotFound from "./views/NotFound.vue";
import Log from "./views/Log.vue";

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
