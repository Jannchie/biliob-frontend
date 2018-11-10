<template>
 <main-layout>
   <favorite-video-list-main slot="main-cards"></favorite-video-list-main>
   <video-list-aside slot="aside-cards"></video-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import FavoriteVideoListMain from '../components/main/FavoriteVideoList.vue'
import VideoListAside from '../components/aside/VideoListAside.vue'
export default {
  components: {MainLayout, FavoriteVideoListMain, VideoListAside},
  name: 'videoList'
}
</script>
