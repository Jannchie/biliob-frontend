<template>
  <VCard>
    <div style="text-align: center;color:#FFF" class="primary">
      {{ title }}
    </div>
    <VCardText>
      <slot />
    </VCardText>
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
