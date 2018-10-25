import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Input,
  Table,
  Form,
  TableColumn,
  Card,
  Submenu,
  Pagination
} from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import routes from './router'
import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
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
  VCard,
  VList,
  VParallax,
  VResponsive,
  VImg,
  VChip,
  VPagination
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VResponsive,
    VChip,
    VBtn,
    VImg,
    VIcon,
    VParallax,
    VToolbar,
    VCard,
    VSubheader,
    transitions,
    VGrid,
    VNavigationDrawer,
    VList,
    VBottomNav,
    VPagination
  },
  iconfont: 'mdi' || 'md' || 'mdi' || 'fa' || 'fa4'
})

Vue.component('chart', ECharts)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Submenu)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Table)
Vue.use(Form)
Vue.use(Card)
Vue.use(Pagination)

Vue.use(VueAxios, axios)
Vue.prototype.apiurl = 'http://101.200.42.40:8081'

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
