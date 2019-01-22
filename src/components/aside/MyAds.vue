<template>
  <VCard>
    <VCardMedia />
    <VCardText>
      广告标题
    </VCardText>
  </VCard>
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
  margin-bottom: 5px;
}
.v-btn {
  color: #ffffff;
}
</style>
