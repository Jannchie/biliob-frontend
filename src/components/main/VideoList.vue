<template>
  <div class="video-list-main">
    <div style="background-color:#F8F8F8">
      <div>
        <VSearchForm slot="search" hint="请输入标题、分区或者av号" @getSearchValue="getSearchValue"></VSearchForm>
        <VCard v-for="eachVideo in videoList.content" :key="eachVideo.aid" class="video-cards" ripple
          :href="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid">
          <div style="padding:5px;display:flex">
            <div>
              <VResponsive :aspect-ratio="16/9">
                <VImg style="border-radius:5px;width:120px;height:80px" :src="eachVideo.pic.slice(5)" :lazy-src="eachVideo.pic.slice(5)" />
              </VResponsive>
            </div>
            <div style="margin-left:10px;width:100%">
              <div class="font-weight-bold video-title">
                {{eachVideo.title}}
              </div>
              <div class="caption subtext video-info">
                <VIcon small>mdi-account-box</VIcon>{{eachVideo.author}}
                <VIcon small>mdi-book</VIcon>{{eachVideo.channel}}
              </div>
            </div>
            <div v-if="eachVideo.focus === true" style="color:green" class="trace-state caption subtext">
              <VIcon color="green" small>mdi-eye</VIcon> 观测中
            </div>
            <div v-if="eachVideo.focus === false" style="color:#FF5722" class="trace-state caption subtext">
              <VIcon color="#FF5722" small>mdi-eye-off</VIcon> 不再观测
            </div>
          </div>
        </VCard>
      </div>
      <div class="block">
        <div class="text-xs-center">
          <VPagination v-model="currentPage" light ripple total-visible="5" :length="videoList.totalPages"></VPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSearchForm from "../common/VSearchForm.vue";
export default {
  name: "VideoList",
  components: {
    VSearchForm
  },
  data() {
    return {
      videoList: {},
      currentApiurl: String,
      currentPage: 1
    };
  },
  watch: {
    currentPage: function changePage(page) {
      this.axios
        .get(this.currentApiurl + "?page=" + (page - 1))
        .then(response => {
          this.videoList = response.data;
        });
    }
  },
  created() {
    this.currentApiurl = "/video";
    this.axios.get(this.currentApiurl).then(response => {
      this.videoList = response.data;
      this.face = response.data.content.pic;
    });
  },
  methods: {
    getSearchValue(value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = "/video?aid=" + value;
        this.axios.get(this.currentApiurl).then(response => {
          this.videoList = response.data;
        });
      } else {
        this.currentApiurl = "/video?text=" + value;
        this.axios.get(this.currentApiurl).then(response => {
          this.videoList = response.data;
        });
      }
    },
    handleChoosed(index, row) {
      this.$router.push({
        path: "/author/" + row.mid + "/video/" + row.aid
      });
    }
  }
};
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
  padding: 2px 0;
}

p {
  position: absolute;
  bottom: 0px;
  margin-bottom: 5px;
}

.video-cards {
  margin: 10px 2px;
  height: 90px;
  border-radius: 5px;
}

.video-title {
  font-size: 15px;
  max-width: 50vmin;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.subtext {
  color: #444444;
}

.trace-state {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.video-info {
  margin-top: 5px;
}
</style>
