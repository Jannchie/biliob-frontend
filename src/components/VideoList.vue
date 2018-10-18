<template>
  <el-row style="margin:5px">
    <el-col :span="24">
      <el-card class="card">

        <search-form placeholder="请输入标题或者aid" @getSearchValue="getSearchValue"></search-form>

        <div>
          <el-table :data="videoList.content">
            <el-table-column label="封面" class="face">
              <template slot-scope="scope">
                <img class="face" :src="scope.row.pic">
              </template>
            </el-table-column>
            <el-table-column prop="aid" label="aid" width="100%"></el-table-column>
            <el-table-column prop="title" label="标题" width="450%"></el-table-column>
            <el-table-column prop="author" label="作者">
              <template slot-scope="scope">
                <a :href="'/#/author/' + scope.row.mid">{{scope.row.author}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="channel" label="分区" width="100%"></el-table-column>
            <el-table-column label="操作" width="100%">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="block">
          <center>
            <el-pagination layout="prev, pager, next" :total="videoList.totalElements" :page-size="videoList.size" v-on:current-change="changePage"></el-pagination>
          </center>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import SearchForm from './SearchForm.vue'
export default {
  components: {SearchForm},
  name: 'videoList',
  data () {
    return {
      'videoList': {},
      'currentApiurl': String
    }
  },
  created () {
    this.currentApiurl = this.apiurl + '/video?'
    this.axios.get(this.currentApiurl).then((response) => {
      this.videoList = response.data
      this.face = response.data.content.pic
    })
  },
  methods: {
    changePage (page) {
      this.axios.get(this.currentApiurl + '&page=' + (page - 1)).then((response) => {
        this.videoList = response.data
      })
    },
    getSearchValue (value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = this.apiurl + '/video?mid=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.videoList = response.data
        })
      } else {
        this.currentApiurl = this.apiurl + '/video?text=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.videoList = response.data
        })
      }
    },

    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push({
        path: '/video/' + row.aid
      })
    }
  }
}

</script>

<style>
  .face {
    position: relative;
    height: 60%;
    width: 60%;
    align-content: center
  }

  .el-table td {
    padding: 2px 0
  }

  a {
    color: #606266;
    text-decoration: none;
  }

</style>
