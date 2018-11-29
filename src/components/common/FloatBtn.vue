<template>
  <div id="float-btn">
    <VFabTransition>
      <VBtn
        :key="activeFab.icon"
        v-model="fab"
        :color="activeFab.color"
        right
        dark
        fab
        fixed
        bottom
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
  data: () => ({
    fab: false
  }),

  computed: {
    activeFab() {
      switch (this.currentPage) {
        case "author":
          return { color: "indigo", icon: "mdi-account-plus" };
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
</style>
