<template>
  <VRow>
    <VCol cols="12">
      <VBanner
        v-show="show"
        icon-color="primary"
        icon="mdi-information"
        sticky
      >
        <VRow>
          <VCol>
            <div class="caption text--secondary">
              2020-02-02
            </div>
            <div class="body-1 text--secondary">
              这里是通知文字
            </div>
          </VCol>
          <VCol cols="auto">
            <VBtn
              icon
              @click.stop="show = false"
            >
              <VIcon>mdi-window-close</VIcon>
            </VBtn>
          </VCol>
        </VRow>
      </VBanner>
    </VCol>
  </VRow>
</template>

<script>
export default {
  data() {
    return { show: true };
  },
  mounted() {
    this.axios.get(`/common/notice`);
  }
};
</script>

<style>
</style>