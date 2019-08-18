<template>
  <BiliobCard>
    <VideoBottomSheet :title="title" :pic="pic" :aid="aid"></VideoBottomSheet>
  </BiliobCard>
</template>
<script>
import VideoBottomSheet from "../common/VideoBottomSheet.vue";

export default {
  components: { VideoBottomSheet },
  props: {
    aid: Number(),
    pic: String(),
    title: String()
  }
};
</script>

<style scoped>
.v-btn {
  color: #ffffff;
}
</style>
