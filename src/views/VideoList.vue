<template>
 <main-layout>
   <video-list-main slot="main-cards"></video-list-main>
   <video-list-aside slot="aside-cards"></video-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import VideoListMain from '../components/main/VideoList.vue'
import VideoListAside from '../components/aside/VideoListAside.vue'
export default {
  components: {MainLayout, VideoListMain, VideoListAside},
  name: 'videoList',
  mounted () {
    this.$store.commit('toVideo')
  }
}
</script>
