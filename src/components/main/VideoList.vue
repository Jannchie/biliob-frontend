<template>
  <div class="video-list-main">
    <div style="background-color:#F8F8F8">
      <div>
        <v-search-form slot="search" @getSearchValue="getSearchValue" hint="请输入标题、分区或者av号"></v-search-form>
        <v-card class="video-cards" ripple :href="'#/author/'+eachVideo.mid+'/video/'+eachVideo.aid" v-for="eachVideo in videoList.content"
          :key="eachVideo.aid">
          <div style="padding:5px;display:flex">
            <div>
              <v-responsive :aspect-ratio="16/9">
                <v-img style="border-radius:5px;width:120px;height:80px" :src="eachVideo.pic.slice(5)" :lazy-src="eachVideo.pic.slice(5)" />
              </v-responsive>
            </div>
            <div style="margin-left:10px;width:100%">
              <div class="font-weight-bold video-title">
                {{eachVideo.title}}
              </div>
              <div class="caption subtext video-info">
                <v-icon small>mdi-account-box</v-icon>{{eachVideo.author}}
                <v-icon small>mdi-book</v-icon>{{eachVideo.channel}}
              </div>
            </div>
            <div style="color:green" v-if="eachVideo.focus === true" class="trace-state caption subtext">
              <v-icon color="green" small>mdi-eye</v-icon> 观测中
            </div>
            <div style="color:#FF5722" v-if="eachVideo.focus === false" class="trace-state caption subtext">
              <v-icon color="#FF5722" small>mdi-eye-off</v-icon> 不再观测
            </div>
          </div>
        </v-card>
      </div>
      <div class="block">
        <div class="text-xs-center">
          <v-pagination light ripple v-model="currentPage" total-visible="5" :length="videoList.totalPages"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSearchForm from '../common/VSearchForm.vue'
export default {
  components: {
    VSearchForm
  },
  name: 'videoList',
  data () {
    return {
      'videoList': {},
      'currentApiurl': String,
      'currentPage': 1
    }
  },
  created () {
    this.currentApiurl = '/video'
    this.axios.get(this.currentApiurl).then((response) => {
      this.videoList = response.data
      this.face = response.data.content.pic
    })
  },
  methods: {
    getSearchValue (value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = '/video?aid=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.videoList = response.data
        })
      } else {
        this.currentApiurl = '/video?text=' + value
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
  },
  watch: {
    currentPage: function changePage (page) {
      this.axios.get(this.currentApiurl + '?page=' + (page - 1)).then((response) => {
        this.videoList = response.data
      })
    }
  }
}

</script>

<style scoped>
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
    height: 90px;
    border-radius: 5px
  }

  .video-title {
    font-size: 15px;
    max-width: 50vmin;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .subtext {
    color: #444444
  }

  .trace-state {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .video-info {
    margin-top: 5px
  }

</style>
