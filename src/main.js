import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Table,
  TableColumn,
  Card
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
  VAvatar,
  VResponsive,
  VForm,
  VImg,
  VChip,
  VTextField,
  VPagination
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VApp,
    VResponsive,
    VForm,
    VTextField,
    VChip,
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
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Card)

Vue.use(VueAxios, axios)
Vue.prototype.apiurl = 'http://localhost:8081'

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
