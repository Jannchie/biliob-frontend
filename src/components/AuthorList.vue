<template>
  <el-row style="margin:5px">
    <el-col :span="24">
      <el-card class="card">

        <search-form placeholder="请输入作者名或者uid" @getSearchValue="getSearchValue"></search-form>

        <div>
          <el-table :data="authorList.content">
            <el-table-column label="头像" class="face" width="100%">
              <template slot-scope="scope">
                <img class="face" :src="scope.row.face">
              </template>
            </el-table-column>
            <el-table-column prop="mid" label="mid" width="100%" ></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="official" label="认证"></el-table-column>
            <el-table-column label="操作" width="100%" >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <center>
            <el-pagination layout="prev, pager, next" :total="authorList.totalElements" :page-size="authorList.size" v-on:current-change="changePage"></el-pagination>
          </center>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import SearchForm from './SearchForm.vue'
export default {
  name: 'authorList',
  components: {SearchForm},
  data () {
    return {
      'authorList': Object,
      'currentApiurl': String
    }
  },
  created () {
    this.currentApiurl = this.apiurl + '/author?'
    this.axios.get(this.currentApiurl).then((response) => {
      this.authorList = response.data
      this.face = response.data.content.face
    })
  },
  methods: {
    changePage (page) {
      this.axios.get(this.currentApiurl + '&page=' + (page - 1)).then((response) => {
        this.authorList = response.data
      })
    },
    getSearchValue (value) {
      var n = Number(value)
      if (!isNaN(n)) {
        this.currentApiurl = this.apiurl + '/author?mid=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.authorList = response.data
        })
      } else {
        this.currentApiurl = this.apiurl + '/author?text=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.authorList = response.data
        })
      }
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push({path: '/author/' + row.mid})
    }
  }
}

</script>

<style>
.face{
   position: relative;
   height: 60%;
   width: 60%;
   align-content: center
}

</style>
