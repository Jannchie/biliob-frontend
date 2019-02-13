<template>
  <VForm v-model="valid">
    <VTextField
      v-model="searchText"
      solo
      append-icon="mdi-magnify"
      clearable
      label="搜索"
      :hint="hint"
      @submit.native.prevent=""
    />
  </VForm>
</template>
<script>
export default {
  props: {
    hint: String("")
  },
  data() {
    return {
      label: this.hint,
      valid: false,
      searchText: "",
      flag: false
    };
  },
  watch: {
    searchText: function() {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => {
          this.$emit("getSearchValue", this.searchText);
          this.flag = false;
        }, 2500);
      } else {
        setTimeout(() => {
          if (this.flag == false) {
            this.$emit("getSearchValue", this.searchText);
          }
        }, 2500);
      }
    }
  }
};
</script>
