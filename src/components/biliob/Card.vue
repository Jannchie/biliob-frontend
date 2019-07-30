<template>
  <VCard style="text-align: center">
    <div class="primary" style="color:#FFF">{{ title }}</div>
    <slot />
  </VCard>
</template>
<script>
export default {
  props: {
    title: { default: "标题载入中..", type: String }
  },
  data() {
    return {};
  }
};
</script>
