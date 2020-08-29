<template>
  <VSnackbar
    v-model="display"
    top
    :color="color"
    style="z-index: 99;"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <VBtn
        color="write"
        v-bind="attrs"
        text
        @click.stop="display = false"
      >
        Close
      </VBtn>
    </template>
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
.v-snack__wrapper {
  background: linear-gradient(60deg, #ffffff44, #ffffff11) !important;
}
</style>
