<template>
  <VContainer class="about">
    <VRow>
      <VCol cols="12">
        <BiliobCard title="关于本网站">
          <VCardText>
            本网站所有数据来自于Bilibili。
            <br>本网站的目的是搜集并观测B站的UP主、视频或番剧等数据。
            <br>一方面，这些数据能够给UP主作为参考，了解自己作品的受欢迎程度。从而帮助作者创作更加优秀的作品。
            <br>另一方面，通过观测这些数据，能够了解到B站的最新动态。这些数据本身就非常具有观赏性。
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <BiliobCard title="网站架构">
          <VCardText>
            <h4>前端</h4>
            <li>使用Vue.js</li>
            <li>
              应用了Vue全家桶，使用VueCli
              3.0手脚架，集成Vuex前端状态管理、vue-router前端路由。
            </li>
            <li>
              应用了PWA（渐进式Web应用程序），能够在PC端和Web端获得原生应用般的体验，前提是使用Chrome、Safari、edge等主流浏览器。
            </li>
            <li>图表库使用了Echart.js。由百度开源。</li>
            <li>
              前端UI组件库采用的是Vuetify.js，由歪果仁维护。
              这个前端UI组件库的设计语言采用Material Design。
              是一种谷歌公司推出的移动端优先的设计语言。
            </li>
            <br>
            <h4>后端</h4>
            <li>后端采用Springboot构建微服务。</li>
            <li>采用RESTful风格的API。</li>
            <li>权限认证采用Shrio框架。</li>
            <br>
            <br>
            <h4>数据库</h4>
            <li>
              数据库采用MongoDB。据说存取速度快，但是看上去巨占内存，
              存取爬虫爬取的结构奇葩的数据或许用这样的非关系数据库更好。
            </li>
            <br>
            <h4>缓存</h4>
            <li>
              缓存数据库采用的是Redis。 Redis还用于分布式爬虫的消息队列。
            </li>
            <br>
            <h4>持续集成</h4>
            <li>后端持续集成目前采用的是Jenkins。前端目前使用Travis-CI。</li>
            <br>
            <h4>其他支持</h4>
            <li>服务器由阿里云、腾讯云提供支持，使用了CDN内容分发网络服务。</li>
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12">
        <BiliobCard title="其他想要说的话">
          <VCardText>
            这个网站在可以预见的未来很长一段时间内，由我个人维护。
            由于技术有限、资源有限等原因，该网站可能还有很多不尽如人意的地方。
          </VCardText>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
