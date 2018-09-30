
import home from './components/Home.vue'
import login from './components/Login.vue'
import AuthorDetail from './components/AuthorDetail.vue'
const routes = [
  { path: '/', component: home },
  {path: '/login', component: login},
  {path: '/author/:mid', component: AuthorDetail}
]
export default routes
