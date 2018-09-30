<template>
  <el-menu :default-active="$route.path" vue-router='true' id="nav" class="el-menu-demo" mode="horizontal" router>
    <el-menu-item class="nav-item" index="/"> Bilibili观测者 </el-menu-item>
    <el-menu-item class="nav-item" index="/top">榜单</el-menu-item>
    <el-submenu index="3">
      <template slot="title">追踪</template>
      <el-menu-item index="video">视频追踪</el-menu-item>
      <el-menu-item index="author">UP主追踪</el-menu-item>
    </el-submenu>
    <el-menu-item class="nav-item" index="/login" style="float:right"> 登录</el-menu-item>
    <el-menu-item class="nav-item" index="/test" style="float:right"> 测试用</el-menu-item>
    <el-menu-item class="nav-item" index="/i" style="float:right" hidden>个人中心 </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'Nav'
}
</script>
<style>
  .nav-item {
    /* background-color: #00000000; */
    height: 45px !important;
    line-height: 45px !important
  }

  .el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 45px !important;
    line-height: 45px !important
  }

  #nav {
    padding: 0 20%;
    border-bottom-width: 0;
    z-index: 2;
    /* background-color: #ffffff56; */
    height: 45px
  }
</style>
