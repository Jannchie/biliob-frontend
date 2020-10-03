<template>
  <VSlideYTransition>
    <div :class="wapper">
      <VSlideYTransition>
        <VImg
          v-if="show"
          key="kanban"
          style="position: fixed; min-width:600px; max-width:600px; opacity: 0.37"
          lazy-src="../../../img/06-01.png"
          src="../../../img/06-01.png"
          @click="click"
        />
      </VSlideYTransition>
    </div>
  </VSlideYTransition>
</template>

<script>
export default {
  data() {
    return { offset: 0 };
  },
  computed: {
    show() {
      if (localStorage.getItem("kanban") == false) {
        return false;
      }
      if (this.$vuetify.breakpoint.lgAndDown) {
        if (this.offset < 600) {
          return false;
        }
        return true;
      } else {
        if (this.offset == 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    wapper() {
      let wap;
      if (this.$vuetify.breakpoint.smAndDown) {
        wap = "mobile-wapper";
      } else if (this.$vuetify.breakpoint.lgAndDown) {
        wap = "pad-wapper";
      } else {
        wap = "desktop-wapper";
      }
      return wap;
    }
  },
  mounted() {
    this.$addEvent(window, "scroll", () => {
      this.offset = window.pageYOffset;
    });
  },
  methods: {
    click() {
      window.open("https://www.azz.net/jannchie", "_blank");
    }
  }
};
</script>

<style scoped>
.desktop-wapper {
  position: absolute;
  right: 450px;
  top: 400px;
}
.pad-wapper {
  position: absolute;
  right: 450px;
  top: 600px;
}
.mobile-wapper {
  position: absolute;
  right: 450px;
  top: 0px;
}
</style>