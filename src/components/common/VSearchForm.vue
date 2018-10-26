<template>
  <v-form v-model="valid">
    <v-text-field solo append-icon="mdi-magnify" clearable v-model="searchText" label="搜索" :hint="hint"></v-text-field>
  </v-form>
</template>
<script>
export default {
  data () {
    return {
      searchText: '',
      label: this.hint,
      valid: false
    }
  },
  props: {
    hint: String
  },
  watch: {
    searchText: function () {
      this.$emit('getSearchValue', this.searchText)
    }
  }
}
</script>
