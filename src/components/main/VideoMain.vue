<template>
  <div>
    <slot name="title" />
    <slot name="rank" />
    <slot name="main" />
    <slot name="like-rate" />
    <slot name="danmaku-switch" />
    <slot name="danmaku-density" />
    <slot name="danmaku-cloud" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-card {
}
</style>
