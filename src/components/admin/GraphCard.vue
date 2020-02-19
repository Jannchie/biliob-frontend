<template>
  <VCard class="admin-card">
    <VCard
      max-width="calc(100% - 32px)"
      dark
      :color="color"
      class="offset"
      style="box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.05), 0px 12px 17px 2px rgba(0, 0, 0, 0.05), 0px 5px 22px 4px rgba(0, 0, 0, 0.05) !important"
    >
      <Chart
        theme="card"
        :autoresize="true"
        :options="options"
        :style="`height:150px; width:100%; `"
      />
    </VCard>
    <VCardTitle class="title">
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
<style lang="scss" scoped>
$graph-height: 150px;

.admin-card {
  margin-top: 30px;
  min-height: $graph-height;
}
.offset {
  background: linear-gradient(60deg, #00000011, #ffffff44);
  min-height: $graph-height;
  max-height: $graph-height;
  min-width: calc(100% - 32px);
  max-width: calc(100% - 32px);
  top: -16px;
  left: 16px;
}
</style>
