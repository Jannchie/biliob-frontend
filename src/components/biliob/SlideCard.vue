<template>
  <BiliobCard :title="title" border="bottom" light>
    <div style="position: relative">
      <div>
        <VBtn
          v-if="!isMobile()"
          color="white"
          x-small
          class="biliob-slide-card-btn left"
          fab
          @click.stop="scroll(-1)"
        >
          <VIcon>mdi-arrow-left-bold</VIcon>
        </VBtn>
        <VBtn
          v-if="!isMobile()"
          color="white"
          x-small
          class="biliob-slide-card-btn right"
          fab
          @click.stop="scroll(1)"
        >
          <VIcon>mdi-arrow-right-bold</VIcon>
        </VBtn>
      </div>
      <div :id="name" class="py-2 biliob-slide-card-content">
        <slot></slot>
        <VBtn
          v-if="moreLink"
          rounded
          color="primary"
          large
          :to="moreLink"
          class="mx-5"
          style="margin:auto"
          ><VIcon>mdi-chevron-right</VIcon> 更多..</VBtn
        >
      </div>
    </div>
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
<style>
.biliob-slide-card-item {
  flex-shrink: 0;
}
.biliob-slide-card-content {
  flex-direction: row;
  flex-wrap: nowrap;
  display: flex;
  overflow-x: scroll;
}

.biliob-slide-card-content::-webkit-scrollbar {
  display: none;
  scroll-margin: 0;
}
.biliob-slide-card-btn {
  position: absolute;
  z-index: 2;
  margin: auto;
  top: 0px;
  bottom: 0px;
}
.biliob-slide-card-btn.right {
  right: -16px;
}
.biliob-slide-card-btn.left {
  left: -16px;
}
</style>
