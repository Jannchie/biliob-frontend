<template>
<VCard>
    <VCardText>
        <VBtn block color="#ff7fac" flat :href="url"  target="_blank"><VIcon>mdi-video</VIcon>&nbsp;前往B站播放页面</VBtn>
    </VCardText>
</VCard>
</template>
<script>
export default {
  props: {
    aid: Number()
  },
  computed: {
    url: function() {
      return `https://www.bilibili.com/av${this.aid}`;
    }
  },
  watch: {
    aid: function(val) {
      this.aid = val;
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
