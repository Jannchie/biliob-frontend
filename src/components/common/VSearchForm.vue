<template>
  <VForm
    v-model="valid"
    @submit.native.prevent="submit"
  >
    <VTextField
      v-model="searchText"
      solo
      append-icon="mdi-magnify"
      clearable
      label="搜索"
      :hint="hint"
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
          this.$emit("getSearchValue", this.searchText.toLowerCase());
          this.flag = false;
        }, 2500);
      } else {
        setTimeout(() => {
          if (this.flag == false) {
            this.$emit("getSearchValue", this.searchText.toLowerCase());
          }
        }, 2500);
      }
    }
  },
  methods: {
    submit() {
      this.$emit("getSearchValue", this.searchText.toLowerCase());
    }
  }
};
</script>
