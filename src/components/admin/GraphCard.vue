<template>
  <VCard class="elevation-3 admin-card">
    <VCard
      max-width="calc(100% - 32px)"
      dark
      :color="color"
      class="elevation-12 offset"
    >
      <Chart
        theme="card"
        :auto-resize="true"
        :options="options"
        :style="`height:200px; width:100%; `"
      />
    </VCard>
    <VCardTitle>
      {{ title }}
    </VCardTitle>
    <VCardText>
      {{ subTitle }}
    </VCardText>
  </VCard>
</template>
<script>
export default {
  props: {
    options: { type: Object, default: () => {} },
    title: { type: String, default: "标题" },
    color: { type: String, default: "primary" },
    subTitle: { type: String, default: "标题" }
  }
};
</script>
<style lang="scss">
$graph-height: 200px;

.admin-card {
  margin-top: 50px;
  min-height: $graph-height;
}
.offset {
  background: linear-gradient(60deg, #00000011, #ffffff44);
  min-height: $graph-height;
  max-height: 200px;
  min-width: calc(100% - 32px);
  max-width: calc(100% - 32px);
  top: -16px;
  left: 16px;
}
</style>
