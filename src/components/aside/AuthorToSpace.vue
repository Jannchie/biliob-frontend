<template>
<VCard>
    <VCardText>
        <VBtn block color="#ff7fac" :href="url"  target="_blank"><VIcon>mdi-home</VIcon>&nbsp;前往UP主的个人空间</VBtn>
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
