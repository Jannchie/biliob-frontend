<template>
  <VCard class="admin-card">
    <VCard
      dark
      :color="color"
      class="offset-stats"
    >
      <VIcon
        size="44px"
        class="ma-4"
      >
        {{ icon }}
      </VIcon>
    </VCard>
    <div class="ma-4 text-right caption grey--text stats-card-aside">
      {{ title }}
      <div>
        <span class="black--text headline mx-1">{{ value }}</span>{{ smallValue }}
      </div>
    </div>
    <div
      style="padding-top:76px"
      class="px-4 pb-4"
    >
      <VDivider class="pb-2" />
      <VIcon
        color="grey"
        small
      >
        {{ subIcon }}
      </VIcon><span class="grey--text caption mx-2">{{ subText }}</span>
    </div>
  </VCard>
</template>
<script>
export default {
  props: {
    options: { type: Object, default: () => {} },
    title: { type: String, default: "标题" },
    value: { type: Number, default: 0 },
    smallValue: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    subIcon: { type: String, default: undefined },
    color: { type: String, default: "primary" },
    subText: { type: String, default: "未知日期" }
  }
};
</script>
<style lang="scss" scoped>
.admin-card {
  margin-top: 30px;
  min-height: 80px;
}
.offset-stats {
  position: absolute;
  background: linear-gradient(60deg, #00000011, #ffffff44);
  max-width: 92px;
  top: -16px;
  left: 16px;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.05),
    0px 12px 17px 2px rgba(0, 0, 0, 0.05), 0px 5px 22px 4px rgba(0, 0, 0, 0.05);
}
.stats-card-aside {
  position: absolute;
  right: 0px;
}
</style>
