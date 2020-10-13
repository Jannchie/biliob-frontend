<template>
  <VRow>
    <VCol
      v-show="show"
      cols="12"
    >
      <VBanner
        icon-color="primary"
        icon="mdi-information"
        sticky
      >
        <VRow>
          <VCol>
            <div class="caption text--secondary">
              {{ date }}
            </div>
            <div class="body-1 text--secondary">
              <VueMarkdown :source="msg" />
            </div>
          </VCol>
          <VCol cols="auto">
            <VBtn
              icon
              @click.stop="close"
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
    return { show: false, msg: "", type: 0, date: undefined };
  },
  mounted() {
    this.axios.get(`/common/notice`).then((res) => {
      let lastDate = window.localStorage.getItem(`notice`);
      if (lastDate == this.$timeFormat(res.data.date, "YYYY-MM-DD HH:mm:ss")) {
        return;
      }
      this.show = true;
      this.msg = res.data.msg;
      this.type = res.data.type;
      this.date = this.$timeFormat(res.data.date, "YYYY-MM-DD HH:mm:ss");
    });
  },
  methods: {
    close() {
      this.show = false;
      window.localStorage.setItem("notice", this.date);
    }
  }
};
</script>

<style>
</style>