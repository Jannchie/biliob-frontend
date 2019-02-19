<template>
  <VCard>
    <VCardText>
      <VideoBottomSheet
        :title="title"
        :pic="pic"
        :aid="aid"
      ></VideoBottomSheet>
    </VCardText>
  </VCard>
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
.v-card {
  margin-bottom: 5px;
}
.v-btn {
  color: #ffffff;
}
</style>
