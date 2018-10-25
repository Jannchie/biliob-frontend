<template>
  <div style="background-color:#F8F8F8">
    <div>
      <search-form slot="search" placeholder="请输入标题、分区或者av号" @getSearchValue="getSearchValue"></search-form>
      <v-card flat class="video-cards" ripple :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid" v-for="eachVideo in videoList.content"
        :key="eachVideo.aid">
        <div style="padding:5px;display:flex">
          <div>
            <v-responsive :aspect-ratio="16/9">
              <v-img style="border-radius:5px;width:120px;height:90px" :src="eachVideo.pic" :lazy-src="eachVideo.pic" />
            </v-responsive>
          </div>
          <div style="float:left;margin:0 10px">
            <div class="caption font-weight-bold">
              {{eachVideo.title}}
            </div>
            <div class="caption subtext">
              <v-icon small>mdi-account-box</v-icon>{{eachVideo.author}}
              <v-icon small>mdi-book</v-icon>{{eachVideo.channel}}
              <p>

                <v-chip small color="green" label outline>追踪中</v-chip>
              </p>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div class="block">
      <center>
        <el-pagination layout="prev, pager, next" :total="videoList.totalElements" :page-size="videoList.size"
          v-on:current-change="changePage"></el-pagination>
      </center>
    </div>
  </div>
</template>

<script>
import SearchForm from '../common/SearchForm.vue'

export default {
  components: {
    SearchForm
  },
  name: 'videoList',
  data () {
    return {
      'videoList': {},
      'currentApiurl': String
    }
  },
  created () {
    this.currentApiurl = this.apiurl + '/video'
    this.axios.get(this.currentApiurl).then((response) => {
      this.videoList = response.data
      this.face = response.data.content.pic
    })
  },
  methods: {
    changePage (page) {
      this.axios.get(this.currentApiurl + '?page=' + (page - 1)).then((response) => {
        this.videoList = response.data
      })
    },
    getSearchValue (value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = this.apiurl + '/video?aid=' + value
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
    handleChoosed (index, row) {
      console.log(index, row)
      this.$router.push({
        path: '/author/' + row.mid + '/video/' + row.aid
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
    align-content: center;
    border-radius: 4px;
  }

  .el-table td {
    padding: 2px 0
  }

  p {
    position: absolute;
    bottom: 0px;
    margin-bottom: 5px
  }

  .video-cards {
    margin: 10px 2px;
    height: 100px;
  }

  .subtext {
    color: #444444
  }

</style>
