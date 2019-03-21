<template>
  <div>
    <div
      v-if="object.forceFocus === true"
      style="color:#1188CC"
      class="caption subtext"
    >
      <VIcon
        color="#1188CC"
        small
      >
        mdi-eye
      </VIcon> 强行观测
    </div>
    <div
      v-else-if="object.focus === true"
      style="color:#22AA77"
      class="caption subtext"
    >
      <VIcon
        color="#22AA77"
        small
      >
        mdi-eye
      </VIcon> 观测中
    </div>
    <div
      v-else-if="object.focus === false"
      style="color:#FF5722"
      class="caption subtext"
    >
      <VIcon
        color="#FF5722"
        small
      >
        mdi-eye-off
      </VIcon> 保守观测
    </div>
  </div>
</template>
<script>
export default {
  props: { object: Object() }
};
</script>
