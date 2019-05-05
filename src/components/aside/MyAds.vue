<template>
  <MaterialCard>
    <VCardMedia />
    <VCardText>
      广告标题
    </VCardText>
  </MaterialCard>
</template>
<script>
export default {
  props: {
    mid: Number()
  },
  computed: {
    url: function() {
      return `https://space.bilibili.com/${this.mid}`;
    }
  },
  watch: {
    mid: function(val) {
      this.mid = val;
    }
  }
};
</script>

<style scoped>
.v-card {
}
.v-btn {
  color: #ffffff;
}
</style>
