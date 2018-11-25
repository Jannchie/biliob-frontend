import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import routes from './router'

// import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/src/stylus/app.styl'

import {
  Vuetify,
  VApp,
  VBtn,
  VIcon,
  VToolbar,
  VGrid,
  transitions,
  VNavigationDrawer,
  VSubheader,
  VBottomNav,
  VDialog,
  VCard,
  VList,
  VParallax,
  VAvatar,
  VTimeline,
  VDivider,
  VResponsive,
  VForm,
  VAlert,
  VImg,
  VChip,
  VTextField,
  VPagination,
  VFooter
} from 'vuetify'
import Vuex from 'vuex'

import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
Vue.component('chart', ECharts)

Vue.use(Vuetify, {
  components: {
    VApp,
    VResponsive,
    VForm,
    VAlert,
    VTextField,
    VChip,
    VDivider,
    VDialog,
    VBtn,
    VImg,
    VIcon,
    VParallax,
    VAvatar,
    VToolbar,
    VCard,
    VSubheader,
    transitions,
    VGrid,
    VTimeline,
    VNavigationDrawer,
    VList,
    VBottomNav,
    VPagination,
    VFooter
  },
  iconfont: 'mdi'
})
Vue.config.productionTip = false
Vue.use(VueRouter)
// 让ajax携带cookie
axios.defaults.withCredentials = true
// 开发环境和生产环境下调用不同API
axios.defaults.baseURL = process.env.API_ROOT
// 始终传输json
axios.defaults.headers = {'Content-Type': 'application/json'}
Vue.use(VueAxios, axios)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    logined: false,
    currentPage: ''
  },
  mutations: {
    login (state) {
      state.logined = true
    },
    logout (state) {
      state.logined = false
    },
    toVideo (state) {
      state.currentPage = 'video'
    },
    toAuthor (state) {
      state.currentPage = 'author'
    },
    toElse (state) {
      state.currentPage = 'else'
    }
  },
  getters: {
    getLoginState: state => {
      return state.logined
    },
    getCurrentPage: state => {
      return state.currentPage
    }
  }
})

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {x: 0, y: 0}
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
