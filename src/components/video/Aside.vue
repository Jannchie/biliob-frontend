<template>
  <div>
    <slot name="author-info"></slot>
    <slot name="other-video"></slot>
    <slot name="recommand"></slot>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
  .el-card{
    margin-top: 20px
  }
</style>
