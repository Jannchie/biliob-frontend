<template>
  <el-menu :default-active="$route.path" id="nav" class="el-menu-demo" mode="horizontal" router>
    <el-menu-item index="/"> Bilibili观测者 </el-menu-item>
    <el-menu-item index="/i">个人中心 </el-menu-item>
    <el-menu-item index="/top">榜单</el-menu-item>
    <el-submenu index="3">
      <template slot="title">追踪</template>
      <el-menu-item index="video">视频追踪</el-menu-item>
      <el-menu-item index="usr">用户追踪</el-menu-item>
    </el-submenu>
    <el-menu-item index="/login" style="float:right"> 登录</el-menu-item>


  </el-menu>

</template>
<script>
  export default {
    name: 'Nav',
    props: {
      msg: String
    }
  }
</script>
<style>
  #nav {
    padding: 0 20%;
  }
</style>