<template>
  <VSnackbar v-model="snackbar" top :color="color" style="z-index:10">
    {{ $store.state.notificationMsg }}
    <VBtn
      color="write"
      text
      @click.stop="$store.commit('setNotification', false)"
    >
      close
    </VBtn>
  </VSnackbar>
</template>
<script>
export default {
  data() {
    return {
      temp: true
    };
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters.notificationState;
      },
      set(val) {
        this.$store.commit("setNotification", val);
      }
    },
    color() {
      console.log(this.$store.state.notificationColor);

      return this.$store.state.notificationColor;
    }
  }
};
</script>
<style>
.v-snack__content {
  background: linear-gradient(60deg, #00000011, #00000044) !important;
}
</style>
