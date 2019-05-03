<template>
  <VCard>
    <VCardText>
      <AuthorBottomSheet
        :name="name"
        :pic="pic"
        :mid="mid"
        :force-focus="forceFocus"
      ></AuthorBottomSheet>
    </VCardText>
  </VCard>
</template>
<script>
import AuthorBottomSheet from "../common/AuthorBottomSheet.vue";

export default {
  components: { AuthorBottomSheet },
  props: {
    mid: Number(),
    pic: String(),
    name: String(),
    forceFocus: Boolean()
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
