<template>
  <div
    ref="scroll"
    style="overflow: hidden"
    class="biliob-slide-wrapper"
  >
    <div
      :id="name"
      class="py-2 biliob-slide-content"
    >
      <slot />
      <VBtn
        v-if="moreLink"
        rounded
        color="primary"
        large
        :to="moreLink"
        class="mx-5"
        style="margin: auto"
      >
        <VIcon>mdi-chevron-right</VIcon> 更多..
      </VBtn>
    </div>
  </div>
</template>
<script>
import { scrollAnimation } from "@/util/scroll-animation.js";
import { judgeMobile } from "@/util/is-mobile.js";
export default {
  props: {
    moreLink: { type: String, default: undefined },
    name: { type: String, default: "biliob-scroller" },
    title: { type: String, default: undefined }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.bs = BetterScroll.createBScroll(this.$refs.scroll, {
        scrollX: true,
        scrollbar: true,
        click: true,
        // 解决竖划问题：https://better-scroll.github.io/docs/zh-CN/FAQ/diagnosis.html
        eventPassthrough: "vertical"
      });
    }
  }
};
</script>
<style>
.biliob-slide-item {
  display: inline-block;
}
.biliob-slide-wrapper {
  white-space: nowrap;
  /* overflow: hidden; */
}
.biliob-slide-content {
  display: inline-block;
}
.biliob-slide-content > * {
  display: inline-block;
}
</style>
