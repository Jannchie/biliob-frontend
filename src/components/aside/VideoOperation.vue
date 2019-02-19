<template>
  <VCard>
    <VCardText>
      <VideoButtomSheet
        :title="title"
        :pic="pic"
        :aid="aid"
      ></VideoButtomSheet>
    </VCardText>
  </VCard>
</template>
<script>
import VideoButtomSheet from "../common/VideoButtomSheet.vue";

export default {
  components: { VideoButtomSheet },
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
