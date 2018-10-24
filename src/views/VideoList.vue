<template>
 <main-layout>
   <video-list-main slot="main-cards">
    <video-table slot="table"></video-table>
   </video-list-main>
   <video-list-aside slot="aside-cards"></video-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import VideoListMain from '../components/VideoListMain.vue'
import VideoListAside from '../components/VideoListAside.vue'
import VideoTable from '../components/VideoTable.vue'
export default {
  components: {MainLayout, VideoListMain, VideoListAside, VideoTable},
  name: 'videoList'
}
</script>

<style>
  .face {
    position: relative;
    height: 60%;
    width: 60%;
    align-content: center;
    border-radius: 4px;
  }

  .el-table td {
    padding: 2px 0
  }

  a {
    color: #606266;
    text-decoration: none;
  }

</style>
