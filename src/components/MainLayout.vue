<template>
  <el-row style="margin:5px" :gutter="20">
    <el-col :sm="18" :xs="24">
      <slot name="main-cards"></slot>
    </el-col>
    <el-col :sm="6" :xs="24">
      <slot name="aside-cards"></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
}
</script>
