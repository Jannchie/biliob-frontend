<template>
  <BiliobCard :title="title" border="bottom" light>
    <BiliobSlide :name="name">
      <slot />
    </BiliobSlide>
  </BiliobCard>
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
  methods: {
    scroll(value) {
      scrollAnimation(
        value * document.getElementById(this.name).offsetWidth,
        this.name
      );
    },
    isMobile() {
      return judgeMobile();
    }
  }
};
</script>
