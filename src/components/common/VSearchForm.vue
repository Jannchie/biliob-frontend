<template>
  <VForm v-model="valid">
    <VTextField v-model="searchText" solo append-icon="mdi-magnify" clearable label="搜索" :hint="hint"></VTextField>
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
      searchText: ""
    };
  },
  watch: {
    searchText: function() {
      this.$emit("getSearchValue", this.searchText);
    }
  }
};
</script>
