<template>
  <VCard>
    <VCardText>
      <AuthorButtomSheet :mid="mid"></AuthorButtomSheet>
    </VCardText>
  </VCard>
</template>
<script>
import AuthorButtomSheet from "../common/AuthorButtomSheet.vue";

export default {
  components: { AuthorButtomSheet },
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
