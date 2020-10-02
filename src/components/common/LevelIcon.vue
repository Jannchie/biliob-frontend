<template>
  <VChip
    v-if="level === 0"
    text-color="white"
    color="#BFBFBF"
    small
  >
    Lv.0
  </VChip>
  <VChip
    v-else-if="level === 1"
    text-color="white"
    color="#BFBFBF"
    small
  >
    Lv.1
  </VChip>
  <VChip
    v-else-if="level === 2"
    text-color="white"
    color="#95DDB2"
    small
  >
    Lv.2
  </VChip>
  <VChip
    v-else-if="level === 3"
    text-color="white"
    color="#92D1E5"
    small
  >
    Lv.3
  </VChip>
  <VChip
    v-else-if="level === 4"
    text-color="white"
    color="#FFB37C"
    small
  >
    Lv.4
  </VChip>
  <VChip
    v-else-if="level === 5"
    text-color="white"
    color="#FF6C00"
    small
  >
    Lv.5
  </VChip>
  <VChip
    v-else
    text-color="white"
    color="#FF0000"
    small
  >
    Lv.6
  </VChip>
</template>
<script>
export default {
  props: { level: String() }
};
</script>
