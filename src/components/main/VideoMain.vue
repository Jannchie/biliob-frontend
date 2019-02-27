<template>
  <div>
    <VSlideYTransition>
      <slot name="title" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="rank" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="main" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="like-rate" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="danmaku-switch" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="danmaku-density" />
    </VSlideYTransition>
    <VSlideYTransition>
      <slot name="danmaku-cloud" />
    </VSlideYTransition>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.v-card {
  margin-bottom: 5px;
}
</style>
