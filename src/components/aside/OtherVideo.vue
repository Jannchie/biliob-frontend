<template>
  <v-card>
    <el-table :data="otherVideo" style="width: 100%">
      <el-table-column label="该作者的其他视频">
        <template slot-scope="scope">
            <router-link class="link" :to="'/author/'+scope.row.mid+'/video/'+scope.row.aid">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
    </el-table>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      otherVideo: []
    }
  },
  mounted () {
    this.axios.get(this.apiurl + '/author/' + this.$route.params.mid + '/video/' + this.$route.params.aid).then((
      response) => {
      this.otherVideo = response.data.content
    })
  },
  watch: {
    '$route.params.aid': function () {
      this.axios.get(this.apiurl + '/author/' + this.$route.params.mid + '/video/' + this.$route.params.aid).then((
        response) => {
        this.otherVideo = response.data.content
      })
      console.log(1)
    }
  }
}

</script>
<style>
.link{
    color: slategray;
    text-decoration: none;

}
.link:hover{
    color: rgb(62, 123, 184)
}
</style>
