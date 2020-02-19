<template>
  <VSnackbar v-model="display" top :color="color" style="z-index:10">
    {{ message }}
    <VBtn color="write" text @click.stop="display = false">
      close
    </VBtn>
  </VSnackbar>
</template>
<script>
import data from "../../data";
export default {
  data() {
    return data.alert;
  },
  computed: {
    color() {
      return this.type;
    }
  }
};
</script>
<style>
.v-snack__content {
  background: linear-gradient(60deg, #ffffff44, #ffffff11) !important;
}
</style>
