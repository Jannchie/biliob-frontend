<template>
  <el-row style="margin:5px">
    <el-col :span="24">
      <el-card class="card">
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
            <el-pagination layout="prev, pager, next" :total="totalElement" :page-size="12" v-on:current-change="changePage"></el-pagination>
          </center>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'authorList',
  data () {
    return {
      'authorList': {},
      'totalElement': 0
    }
  },
  created () {
    this.axios.get('http://localhost:8081/author?pageSize=12&page=0').then((response) => {
      this.authorList = response.data
      this.face = response.data.content.face
      this.totalElement = response.data.totalElements
    })
  },
  methods: {
    changePage (page) {
      this.axios.get('http://localhost:8081/author?pageSize=12&page=' + (page - 1)).then((response) => {
        this.authorList = response.data
      })
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
