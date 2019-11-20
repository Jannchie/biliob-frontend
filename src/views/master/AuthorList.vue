<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VCard>
          <VCardText>
            <VSearchForm
              slot="search"
              hint="请输入UP主名称，或者uid"
              @getSearchValue="getSearchValue"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <BiliobCard light border="bottom">
          <VLayout slot="header">
            <VTabs background-color="transparent" slider-color="primary">
              <VTab @click="sortChange(0)">
                <VIcon>
                  mdi-account-heart
                </VIcon>
                <div style="margin-left:10px">
                  粉丝总数
                </div>
              </VTab>
              <VTab @click="sortChange(1)">
                <VIcon>
                  mdi-play-circle-outline
                </VIcon>
                <div style="margin-left:10px">
                  播放总量
                </div>
              </VTab>
              <VTab @click="sortChange(3)">
                <VIcon>
                  mdi-thumb-up-outline
                </VIcon>
                <div style="margin-left:10px">
                  获赞总量
                </div>
              </VTab>
              <VTab @click="sortChange(2)">
                <VIcon>
                  mdi-script-text-outline
                </VIcon>
                <div style="margin-left:10px">
                  专栏阅读
                </div>
              </VTab>
            </VTabs>
          </VLayout>

          <VSlideYTransition group>
            <VCard
              v-for="(eachAuthor, index) in authorList.content"
              :key="eachAuthor.mid"
              v-ripple="true"
              style="position: relative"
              :to="`/author/${eachAuthor.mid}`"
              class="mx-0  elevation-0"
              @click.stop="toAuthorDetail(eachAuthor.mid)"
            >
              <div style="padding:5px;display:flex">
                <div>
                  <VImg
                    class="author-face"
                    :src="zipPic(eachAuthor.face.replace('http:', ''))"
                    :lazy-src="zipPic(eachAuthor.face.replace('http:', ''))"
                  />
                </div>
                <div style="margin-left:10px;width:100%;overflow:hidden">
                  <div class="font-weight-bold author-title">
                    {{ eachAuthor.name }}
                    <SexIcon :sex="eachAuthor.sex" />
                  </div>
                  <div
                    v-if="eachAuthor.official !== ''"
                    class="caption author-info d-block text-truncate"
                  >
                    <VIcon color="#FBC02D" small> mdi-flash-circle </VIcon
                    ><span style="vertical-align: middle">
                      {{ eachAuthor.official }}</span
                    >
                  </div>
                  <ObserveStatus class="observe-status" :object="eachAuthor" />
                </div>
              </div>
              <VDivider v-if="index != authorList.length - 1"></VDivider>
            </VCard>
          </VSlideYTransition>
          <VBtn
            v-if="!notFound"
            block
            outlined
            style="border-width:1px"
            color="blue darken-2"
            :disabled="nextBtnDisabled"
            tile
            @click.stop="next"
            >{{ nextBtnText }}</VBtn
          >
          <div v-else>
            <h4 class="blue--text text--darken-2">
              <VIcon class="blue--text text--darken-2">mdi-ship-wheel</VIcon
              >抱歉！什么都没有找到QwQ
            </h4>
            <p>
              搜索功能可能并不完善，为了精确搜索请在上方输入相关UP主的ID！
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
import ObserveStatus from "@/components/common/ObserveStatus.vue";
import SexIcon from "@/components/common/SexIcon.vue";
export default {
  name: "AuthorList",
  components: {
    VSearchForm,
    SexIcon,
    ObserveStatus
  },
  data() {
    return {
      sort: 0,
      authorList: [],
      currentApiurl: String(),
      currentPage: 0,
      text: String(),
      nextBtnText: "请给我更多...",
      nextBtnDisabled: false,
      requestUrl: String(),
      notFound: false
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
          this.authorList.content = response.data.content;
          if (this.authorList.content.length == 0) {
            this.notFound = true;
          } else {
            this.notFound = false;
          }
        });
    },
    currentPage: function changePage(page) {
      this.axios
        .get(
          `${this.currentApiurl}?page=${page}&text=${this.text}&sort=${
            this.sort
          }`
        )
        .then(response => {
          // 判断是否为最后一页
          if (response.data.last) {
            this.nextBtnText = "没有更多了";
            this.nextBtnDisabled = true;
          }
          response.data.content.forEach(e => {
            this.authorList.content.push(e);
          });
        });
    }
  },
  created() {
    this.currentApiurl = "/author";
    this.axios.get(this.currentApiurl).then(response => {
      this.refreshList(response);
    });
  },
  methods: {
    refreshList(response) {
      this.authorList = response.data;
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
        path: "/author/" + row.mid + "/author/" + row.aid
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
    },
    toAuthorDetail(mid) {
      this.$router.push("/author/" + mid);
    }
  }
};
</script>

<style>
.face {
  position: relative;
  align-content: center;
  border-radius: 4px;
}

.el-table td {
  padding: 2px 0;
}

.author-cards {
  padding: 0px 0px;
  border-radius: 5px;
  position: relative;
}

.author-title {
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.observe-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

@media only screen and (max-width: 1029px) {
  .author-face {
    border-radius: 30px;
    width: 60px;
    height: 60px;
  }
}
@media only screen and (min-width: 1029px) {
  .author-face {
    border-radius: 40px;
    width: 80px;
    height: 80px;
  }
}
</style>
