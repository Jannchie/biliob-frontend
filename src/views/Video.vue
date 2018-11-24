<template>
 <main-layout>
   <Video-main slot="main-cards"></Video-main>
   <video-aside slot="aside-cards">
     <author-info slot="author-info"></author-info>
     <other-video slot="other-video"></other-video>
     <recommand slot="recommand"></recommand>
   </video-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import DetailMain from '../components/DetailMain.vue'
import VideoAside from '../components/aside/VideoAside.vue'
import VideoMain from '../components/main/VideoMain.vue'
import AuthorInfo from '../components/aside/AuthorInfo.vue'
import OtherVideo from '../components/aside/OtherVideo.vue'
import Recommand from '../components/aside/recommand.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, DetailMain, VideoAside, VideoMain, AuthorInfo, OtherVideo, Recommand
  },
  mounted () {
    this.$store.commit('toVideo')
  }
}
</script>
