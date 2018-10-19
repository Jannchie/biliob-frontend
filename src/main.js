import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import routes from './router'
import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
require('echarts')
Vue.component('chart', ECharts)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.prototype.apiurl = 'http://localhost:8081'

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
