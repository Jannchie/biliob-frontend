<template>
  <span>
    <v-icon v-if="sex === '男'" color="blue" small>mdi-gender-male</v-icon>
    <v-icon v-if="sex === '女'" color="pink" small>mdi-gender-female</v-icon>
    <v-icon v-if="sex === '保密'" color="purple" small>mdi-gender-male-female</v-icon>
  </span>
</template>
<script>
export default {
  props: ['sex']
}

</script>
