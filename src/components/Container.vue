<template>
  <el-container>
    <el-row>
      <el-col :sm="{span:18,offset:3}" :xs="24">
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-col>
    </el-row>
    <el-footer>
      footer
    </el-footer>
  </el-container>
</template>

<style>
  .el-footer{
    width:100%;
    background-color: #f5f5f5;
    padding: 0;
    margin: 0;
    height: 100px;
  }
</style>
