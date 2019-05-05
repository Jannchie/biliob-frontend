<template>
  <MaterialCard>
    <AuthorBottomSheet
      :name="name"
      :pic="pic"
      :mid="mid"
      :force-focus="forceFocus"
    ></AuthorBottomSheet>
  </MaterialCard>
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
.v-btn {
  color: #ffffff;
}
</style>
