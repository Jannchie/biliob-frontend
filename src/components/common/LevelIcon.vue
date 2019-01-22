<template>
  <span>
    <VIcon
      v-if="level === 0"
      color="#BFBFBF"
      small
    >
      mdi-numeric-0-box-outline
    </VIcon>
    <VIcon
      v-if="level === 1"
      color="#BFBFBF"
      small
    >
      mdi-numeric-1-box-outline
    </VIcon>
    <VIcon
      v-if="level === 2"
      color="#95DDB2"
      small
    >
      mdi-numeric-2-box-outline
    </VIcon>
    <VIcon
      v-if="level === 3"
      color="#92D1E5"
      small
    >
      mdi-numeric-3-box-outline
    </VIcon>
    <VIcon
      v-if="level === 4"
      color="#FFB37C"
      small
    >
      mdi-numeric-4-box-outline
    </VIcon>
    <VIcon
      v-if="level === 5"
      color="#FF6C00"
      small
    >
      mdi-numeric-5-box-outline
    </VIcon>
    <VIcon
      v-if="level === 6"
      color="#FF0000"
      small
    >
      mdi-numeric-6-box-outline
    </VIcon>
  </span>
</template>
<script>
export default {
  props: { level: String() }
};
</script>
