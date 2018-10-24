<template>
 <main-layout>
   <video-list-main slot="main-cards">
    <video-list-table slot="table"></video-list-table>
   </video-list-main>
   <video-list-aside slot="aside-cards"></video-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import VideoListMain from '../components/video_list/Main.vue'
import VideoListAside from '../components/video_list/Aside.vue'
import VideoListTable from '../components/video_list/Table.vue'
export default {
  components: {MainLayout, VideoListMain, VideoListAside, VideoListTable},
  name: 'videoList'
}
</script>
