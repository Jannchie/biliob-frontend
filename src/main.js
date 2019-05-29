import "babel-polyfill";
// import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import "./plugins/vuetify";
import "./echarts";
const App = () => import("./App.vue");
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Vuex from "vuex";

import "./components";

Vue.config.productionTip = false;

// 使用vue-cookies
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

// 在vue-router中使用google analytics
router.afterEach(function(to) {
  let count = window.localStorage.getItem(to.path);
  if (count == undefined) {
    count = 0;
  }
  window.localStorage.setItem(to.path, Number(count) + 1);
});
Vue.use(VueRouter);

// 使用axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers = {
  "Content-Type": "application/json"
};
Vue.use(VueAxios, axios);
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// refresh index.html
caches.open("biliob-precache-https://www.biliob.com/").then(c => {
  c.keys().then(k => {
    k.forEach(e => {
      if (e.url === "https://www.biliob.com/index.html") {
        c.delete(e).then(() => {
          console.log("index.html缓存清除成功");
        });
      }
    });
  });
});
