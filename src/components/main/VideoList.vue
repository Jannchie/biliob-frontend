<template>
  <div class="video-list-main">
    <div>
      <div>
        <VSearchForm
          slot="search"
          hint="请输入标题、分区或者av号"
          @getSearchValue="getSearchValue"
        />
        <VCard style="margin-bottom:5px">
          <VTabs fixed-tabs>
            <VTab @click="sortChange(0)">
              播放
            </VTab>
            <VTab @click="sortChange(1)">
              点赞
            </VTab>
            <VTab @click="sortChange(2)">
              硬币
            </VTab>
            <VTab @click="sortChange(3)">
              弹幕
            </VTab>
            <VTab @click="sortChange(4)">
              收藏
            </VTab>
            <VTab @click="sortChange(5)">
              分享
            </VTab>
          </VTabs>
        </VCard>
        <VSlideYTransition group>
          <VCard
            v-for="eachVideo in videoList.content"
            :key="eachVideo.aid"
            class="video-cards"
            ripple
            :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid"
          >
            <div style="padding:5px;display:flex">
              <div>
                <VImg
                  style="border-radius:5px;width:120px;height:80px"
                  :src="eachVideo.pic.replace('http:','')"
                  :lazy-src="eachVideo.pic.replace('http:','')"
                />
              </div>
              <div style="margin-left:10px;overflow:hidden">
                <div class="font-weight-bold video-title text-no-wrap text-truncate">
                  {{ eachVideo.title }}
                </div>
                <div class="caption subtext video-info">
                  <VIcon small>
                    mdi-account-box-outline
                  </VIcon>{{ eachVideo.author }}
                  <VIcon small>
                    mdi-bookmark-outline
                  </VIcon>{{ eachVideo.channel }}
                </div>
              </div>
              <ObserveStatus
                class="observe-status"
                :object="eachVideo"
              />
            </div>
          </VCard>
        </VSlideYTransition>
        <VBtn
          block
          outline
          color="blue darken-2"
          :disabled="nextBtnDisabled"
          @click.stop="next"
        >{{nextBtnText}}</VBtn>
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
      sort: 0,
      videoList: [],
      currentApiurl: String(),
      currentPage: 0,
      text: String(),
      nextBtnText: "请给我更多...",
      nextBtnDisabled: false
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
            this.text +
            "&sort=" +
            this.sort
        )
        .then(response => {
          this.videoList.content = response.data.content;
        });
    },
    currentPage: function changePage(page) {
      this.axios
        .get(
          this.currentApiurl +
            "?page=" +
            page +
            "&text=" +
            this.text +
            "&sort=" +
            this.sort
        )
        .then(response => {
          // 判断是否为最后一页
          if (response.data.last) {
            this.nextBtnText = "没有更多了";
            this.nextBtnDisabled = true;
          }
          response.data.content.forEach(e => {
            this.videoList.content.push(e);
          });
        });
    }
  },
  created() {
    this.currentApiurl = "/video";
    this.axios.get(this.currentApiurl).then(response => {
      this.refreshList(response);
    });
  },
  methods: {
    refreshList(response) {
      this.videoList = response.data;
      // 判断是否为最后一页
      if (response.data.last) {
        this.nextBtnText = "没有更多了";
        this.nextBtnDisabled = true;
      }
    },
    onScroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        // this.currentPage += 1;
      }
    },
    next() {
      this.currentPage += 1;
    },
    getSearchValue(value) {
      this.text = value;
    },
    handleChoosed(index, row) {
      this.$router.push({
        path: "/author/" + row.mid + "/video/" + row.aid
      });
    },
    sortChange(sort) {
      this.sort = sort;
      this.currentPage = 0;
      this.axios
        .get(
          `${this.currentApiurl}?page=${this.currentPage}&text=${
            this.text
          }&sort=${this.sort}`
        )
        .then(response => {
          this.refreshList(response);
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
