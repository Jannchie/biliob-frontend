<template>
  <VIcon v-if="sex === '男'" size="22px" color="primary">
    mdi-gender-male
  </VIcon>
  <VIcon v-else-if="sex === '女'" color="pink">
    mdi-gender-female
  </VIcon>
  <VIcon v-else-if="sex === '保密'" color="purple">
    mdi-gender-male-female
  </VIcon>
</template>
<script>
export default {
  props: { sex: String("") }
};
</script>
