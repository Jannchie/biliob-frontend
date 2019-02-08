<template>
  <span>
    <VIcon
      v-if="sex === '男'"
      color="blue"
      small
    >
      mdi-gender-male
    </VIcon>
    <VIcon
      v-if="sex === '女'"
      color="pink"
      small
    >
      mdi-gender-female
    </VIcon>
    <VIcon
      v-if="sex === '保密'"
      color="purple"
      small
    >
      mdi-gender-male-female
    </VIcon>
  </span>
</template>
<script>
export default {
  props: { sex: String("") }
};
</script>
