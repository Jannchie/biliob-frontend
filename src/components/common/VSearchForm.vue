<template>
  <VForm
    v-model="valid"
    class="mt-4"
    @submit.native.prevent="submit"
  >
    <VTextField
      v-model="searchText"
      outlined
      style="border-width:1px"
      append-icon="mdi-magnify"
      clearable
      label="搜索"
      :hint="hint"
      @keyup.enter="submit"
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
    searchText: function () {
      if (!this.flag) {
        this.flag = true;
        setTimeout(() => {
          this.$emit("getSearchValue", this.pretreatment(this.searchText));
          this.flag = false;
        }, 5000);
      } else {
        setTimeout(() => {
          if (this.flag == false) {
            this.$emit("getSearchValue", this.pretreatment(this.searchText));
          }
        }, 5000);
      }
    }
  },
  methods: {
    pretreatment() {
      let result = String();
      result = this.searchText.toLowerCase();
      result = result.replace("av", "");
      result = result.replace("uid:", "");
      result = result.replace("mid:", "");
      result = result.replace("av:", "");
      return result;
    },
    submit() {
      this.$emit("getSearchValue", this.pretreatment(this.searchText));
    }
  }
};
</script>
