import Vue from "vue";
import "./plugins/vuetify";
import "./echarts";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Vuex from "vuex";
Vue.config.productionTip = false;
Vue.use(VueRouter);
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers = { "Content-Type": "application/json" };
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
