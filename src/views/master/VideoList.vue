<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VCard>
          <VCardText>
            <VSearchForm
              slot="search"
              hint="请输入标题、分区或者av号"
              @getSearchValue="getSearchValue"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard
          light
          border="bottom"
        >
          <VLayout
            slot="header"
            class="flex-column flex-lg-row"
          >
            <VFlex
              style="padding:0"
              lg8
            >
              <VTabs
                slider-color="primary"
                background-color="transparent"
              >
                <VIcon
                  left
                  right
                >
                  mdi-sort
                </VIcon>
                <VTab @click="sortChange('view')">
                  <VIcon left>
                    mdi-play-circle-outline
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    播放
                  </span>
                </VTab>
                <VTab @click="sortChange('like')">
                  <VIcon left>
                    mdi-thumb-up-outline
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    点赞
                  </span>
                </VTab>
                <VTab @click="sortChange('coin')">
                  <VIcon left>
                    mdi-coin
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    硬币
                  </span>
                </VTab>
                <VTab @click="sortChange('danmaku')">
                  <VIcon left>
                    mdi-message-bulleted
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    弹幕
                  </span>
                </VTab>
                <VTab @click="sortChange('favorite')">
                  <VIcon left>
                    mdi-folder-star
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    收藏
                  </span>
                </VTab>
                <VTab @click="sortChange('share')">
                  <VIcon hidden-md-and-down>
                    mdi-share
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    分享
                  </span>
                </VTab>
                <VTab @click="sortChange('jannchie')">
                  <VIcon hidden-md-and-down>
                    mdi-alpha-j
                  </VIcon>
                  <span v-if="$vuetify.breakpoint.mdAndUp">
                    指数
                  </span>
                </VTab>
              </VTabs>
            </VFlex>
            <VFlex
              class="py-0"
              lg4
            >
              <VTabs
                grow
                right
                slider-color="primary"
                background-color="transparent"
              >
                <VIcon
                  left
                  right
                >
                  mdi-calendar-blank-outline
                </VIcon>
                <VTab @click="daysChange(3)">
                  <VIcon>
                    mdi-numeric-3-box
                  </VIcon>
                </VTab>
                <VTab @click="daysChange(7)">
                  <VIcon>
                    mdi-numeric-7-box
                  </VIcon>
                </VTab>
                <VTab @click="daysChange(0)">
                  <VIcon>
                    mdi-alpha-a-box
                  </VIcon>
                </VTab>
              </VTabs>
            </VFlex>
          </VLayout>
          <VSlideYTransition group>
            <VCard
              v-for="eachVideo in videoList"
              :key="eachVideo.bvid"
              :to="`/video/av${eachVideo.aid}`"
              class="video-cards elevation-0"
            >
              <div style="padding:5px;display:flex">
                <div>
                  <VImg
                    class="video-img"
                    :src="zipPic(eachVideo.pic.replace('http:', ''))"
                    :lazy-src="zipPic(eachVideo.pic.replace('http:', ''))"
                  />
                </div>
                <div style="margin-left:10px;overflow:hidden">
                  <div class="text-no-wrap text-truncate">
                    {{ eachVideo.title }}
                  </div>
                  <div>
                    <span
                      color="primary"
                      small
                      label
                      outlined
                    >
                      <VIcon small> mdi-account </VIcon>
                      <span class="caption">
                        {{ eachVideo.owner.name }}
                      </span>
                    </span>
                    <span
                      color="primary"
                      small
                      label
                      outlined
                    >
                      <VIcon small> mdi-book </VIcon>
                      <span class="caption">
                        {{
                          eachVideo.channel == "" ? "未知" : eachVideo.tname
                        }}
                      </span>
                    </span>
                  </div>
                  <VChipGroup>
                    <VChip
                      v-for="tag in eachVideo.tag"
                      :key="tag"
                      color="primary"
                      class="px-1 mr-2 caption"
                      label
                      outlined
                      x-small
                    >
                      {{ tag }}
                    </VChip>
                  </VChipGroup>
                  <!-- <VRow no-gutters>
                    <VSpacer></VSpacer>
                    <VCol cols="auto">
                      <ObserveStatus
                        class="observe-status"
                        :object="eachVideo"
                      />
                    </VCol>
                  </VRow> -->
                </div>
              </div>
            </VCard>
          </VSlideYTransition>
          <VBtn
            v-if="!notFound"
            block
            outlined
            style="border-width:1px"
            color="primary"
            :disabled="nextBtnDisabled"
            tile
            @click.stop="next"
          >
            {{ nextBtnText }}
          </VBtn>
          <div v-else>
            <h4 class="primary--text">
              <VIcon class="primary--text">
                mdi-ship-wheel
              </VIcon>抱歉！什么都没有找到QwQ
            </h4>
            <p>
              搜索功能可能并不完善，为了精确搜索请在上方输入相关视频的AV号！
            </p>
            <p>
              如果搜索ID仍然没有结果，可能是因为该UP主并未被本站观测。你可以点击页面右下角的圆形按钮进行添加！
            </p>
          </div>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import VSearchForm from "@/components/common/VSearchForm.vue";
export default {
  name: "VideoList",
  components: {
    VSearchForm
  },
  data() {
    return {
      sort: 0,
      videoList: [],
      currentApiurl: "/video/v3/list",
      currentPage: 0,
      text: String(),
      nextBtnText: "请给我更多...",
      nextBtnDisabled: false,
      notFound: false,
      days: 1
    };
  },
  computed: {
    listUrl() {
      return `${this.currentApiurl}?p=${this.currentPage}&ps=20&w=${this.text}&s=${this.sort}&d=${this.days}`;
    }
  },
  watch: {
    text: function () {
      this.currentPage = 0;
      this.axios.get(this.listUrl).then((response) => {
        this.videoList = response.data;
        if (this.videoList.length == 0) {
          this.notFound = true;
        } else {
          this.notFound = false;
        }
      });
    },
    currentPage: function changePage(page) {
      this.axios.get(this.listUrl).then((response) => {
        // 判断是否为最后一页
        if (response.data.last) {
          this.nextBtnText = "没有更多了";
          this.nextBtnDisabled = true;
        }
        response.data.forEach((e) => {
          this.videoList.push(e);
        });
      });
    }
  },
  created() {
    this.axios.get(this.listUrl).then((response) => {
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
      this.axios.get(this.listUrl).then((response) => {
        this.refreshList(response);
      });
    },
    daysChange(days) {
      this.days = days;
      this.currentPage = 0;
      this.axios.get(this.listUrl).then((response) => {
        this.refreshList(response);
      });
    },
    toVideoDetail(mid, aid) {
      this.$router.push("/author/" + mid + "/video/" + aid);
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

.video-cards {
  margin: 10px 0px;
  padding: 0px 0px;
  border-radius: 5px;
  position: relative;
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
@media only screen and (max-width: 1029px) {
  .video-img {
    border-radius: 5px;
    width: 112px;
    height: 70px;
  }
}
@media only screen and (min-width: 1029px) {
  .video-img {
    border-radius: 5px;
    width: 120px;
    height: 75px;
  }
}
.v-icon {
  vertical-align: text-bottom;
}
</style>
