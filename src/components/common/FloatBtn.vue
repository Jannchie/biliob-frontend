<template>
  <div id="float-btn" class="drag">
    <VFabTransition>
      <VBtn
        :key="activeFab.icon"
        v-model="fab"
        class="float-botton"
        :color="activeFab.color"
        dark
        fab
        fixed
        right
        @click.stop="clickFab"
      >
        <VIcon>{{ activeFab.icon }}</VIcon>
        <VIcon>close</VIcon>
      </VBtn>
    </VFabTransition>
  </div>
</template>
<script>
export default {
  directives: {
    drag(el) {
      el.onmousedown = function(e) {
        var disx = e.pageX - el.offsetLeft;
        var disy = e.pageY - el.offsetTop;
        document.onmousemove = function(e) {
          el.style.left = e.pageX - disx + "px";
          el.style.top = e.pageY - disy + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null;
        };
      };
    }
  },
  data: () => ({
    fab: false
  }),

  computed: {
    activeFab() {
      switch (this.currentPage) {
        case "author":
          return {
            color: "indigo lighten-2",
            icon: "mdi-account-plus-outline"
          };
        case "video":
          return { color: "red", icon: "mdi-video-plus" };
        default:
          return { color: "green", icon: "mdi-help-circle-outline" };
      }
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    }
  },
  methods: {
    clickFab() {
      this.$emit("getType", this.currentPage);
    }
  }
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#lateral .v-speed-dial,
#lateral .v-btn--floating {
  position: absolute;
}
#float-btn .v-btn--floating {
  margin: 0 0 16px 20px;
}
.drag {
  position: absolute;
  left: 0px;
}
.float-botton {
  bottom: 48px;
}
</style>
