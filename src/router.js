import home from './views/Home.vue'
import Login from './views/Login.vue'
import Signin from './views/Signin.vue'
import Author from './views/Author.vue'
import Video from './views/Video.vue'
import AuthorList from './views/AuthorList.vue'
import VideoList from './views/VideoList.vue'
import NotFound from './views/NotFound.vue'
const routes = [{
  path: '/',
  component: home
},
{
  path: '/author/:mid',
  component: Author
}, {
  path: '/author/:mid/video/:aid',
  component: Video
},
{
  path: '/author',
  component: AuthorList
},
{
  path: '/login',
  component: Login
},
{
  path: '/signin',
  component: Signin
},
{
  path: '/video',
  component: VideoList
}, {path: '*', component: NotFound}
]
export default routes
