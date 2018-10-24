<template>
 <main-layout>
   <detail-main slot="main-cards">
    <video-detail slot="detail"></video-detail>
   </detail-main>
   <video-aside slot="aside-cards">
     <author-info slot="author-info"></author-info>
     <other-video slot="other-video"></other-video>
     <recommand slot="recommand"></recommand>
   </video-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import DetailMain from '../components/DetailMain.vue'
import VideoAside from '../components/video/Aside.vue'
import VideoDetail from '../components/video/Detail.vue'
import AuthorInfo from '../components/aside/AuthorInfo.vue'
import OtherVideo from '../components/aside/OtherVideo.vue'
import Recommand from '../components/aside/recommand.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, DetailMain, VideoAside, VideoDetail, AuthorInfo, OtherVideo, Recommand
  }
}
</script>
