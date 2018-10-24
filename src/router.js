import home from './components/Home.vue'
import login from './components/Login.vue'
import AuthorDetail from './components/AuthorDetail.vue'
import VideoDetail from './components/VideoDetail.vue'
import AuthorList from './views/AuthorList.vue'
import VideoList from './views/VideoList.vue'
const routes = [{
  path: '/',
  component: home
},
{
  path: '/login',
  component: login
},
{
  path: '/author/:mid',
  component: AuthorDetail
},
{
  path: '/author',
  component: AuthorList
},
{
  path: '/video/:aid',
  component: VideoDetail
},
{
  path: '/video',
  component: VideoList
}
]
export default routes
