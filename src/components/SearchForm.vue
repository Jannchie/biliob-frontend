<template>
  <form>
    <el-input :placeholder="ph" prefix-icon="el-icon-search" style="width:30%" v-model="searchValue" @keyup.enter.native="search">
    </el-input>
    <span>
      <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
    </span>
  </form>
</template>

<script>
export default {
  name: 'searchForm',
  data () {
    return {
      searchValue: '',
      ph: this.placeholder
    }
  },
  props: {
    placeholder: String
  },
  methods: {
    search () {
      this.$emit('getSearchValue', this.searchValue)
    }
  }
}

</script>
