<template>
  <div class="video-list-main">
    <div>
      <div>
        <VSearchForm slot="search" hint="请输入标题、分区或者av号" @getSearchValue="getSearchValue"></VSearchForm>
        <VCard v-for="eachVideo in videoList.content" :key="eachVideo.aid" class="video-cards" ripple
          :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid">
          <div style="padding:5px;display:flex">
            <div>
              <VResponsive :aspect-ratio="16/9">
                <VImg style="border-radius:5px;width:120px;height:80px" :src="eachVideo.pic.slice(5)" :lazy-src="eachVideo.pic.slice(5)" />
              </VResponsive>
            </div>
            <div style="margin-left:10px;overflow:hidden">
              <div class="font-weight-bold video-title text-no-wrap text-truncate">
                {{eachVideo.title}}
              </div>
              <div class="caption subtext video-info">
                <VIcon small>mdi-account-box</VIcon>{{eachVideo.author}}
                <VIcon small>mdi-book</VIcon>{{eachVideo.channel}}
              </div>
            </div>
            <ObserveStatus class="observe-status" :object="eachVideo"></ObserveStatus>
          </div>
        </VCard>
      </div>
    </div>
  </div>
</template>

<script>
import VSearchForm from "../common/VSearchForm.vue";
import ObserveStatus from "../common/ObserveStatus.vue";
export default {
  name: "VideoList",
  components: {
    VSearchForm,
    ObserveStatus
  },
  data() {
    return {
      videoList: [],
      currentApiurl: String(),
      currentPage: 0,
      text: String()
    };
  },
  watch: {
    text: function() {
      this.currentPage = 0;
      this.axios
        .get(
          this.currentApiurl +
            "?page=" +
            this.currentPage +
            "&text=" +
            this.text
        )
        .then(response => {
          this.videoList.content = response.data.content;
        });
    },
    currentPage: function changePage(page) {
      this.axios
        .get(this.currentApiurl + "?page=" + page + "&text=" + this.text)
        .then(response => {
          response.data.content.forEach(e => {
            this.videoList.content.push(e);
          });
        });
    }
  },
  created() {
    this.currentApiurl = "/video";
    this.axios.get(this.currentApiurl).then(response => {
      this.videoList = response.data;
      this.face = response.data.content.pic;
    });
    window.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    onScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        this.currentPage += 1;
      }
    },
    getSearchValue(value) {
      this.text = value;
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
}

.subtext {
  color: #444444;
}

.observe-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.video-info {
  margin-top: 5px;
}
</style>
