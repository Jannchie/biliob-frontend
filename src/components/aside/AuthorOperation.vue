<template>
  <BiliobCard>
    <AuthorBottomSheet
      :name="name"
      :pic="pic"
      :mid="mid"
      :force-focus="forceFocus"
    ></AuthorBottomSheet>
  </BiliobCard>
</template>
<script>
import AuthorBottomSheet from "../author/BottomSheet.vue";

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
.v-btn {
  color: #ffffff;
}
</style>
