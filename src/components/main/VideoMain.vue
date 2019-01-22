<template>
  <div>
    <slot name="title" />
    <slot name="main" />
    <slot name="like-rate" />
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
