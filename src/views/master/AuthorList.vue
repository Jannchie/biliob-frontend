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
            <span class="overline">OB热搜 / HOT SEARCH</span>
            <BiliobSlide v-if="$store.getters.getHotSearchAuthor">
              <div
                v-for="(author, index) in $store.getters.getHotSearchAuthor"
                :key="index"
                cols="auto"
                class="px-1 py-0"
              >
                <VChip
                  class="pl-1"
                  outlined
                  color="primary "
                  :to="`/author/${author.mid}`"
                >
                  <!-- <VIcon>mdi-fire</VIcon> -->
                  <VChip
                    small
                    text-color="white font-weight-bold"
                    color="primary"
                    class="mr-2 "
                  >
                    {{ $numberFormat(author.count, false) }}
                  </VChip>{{ author.name }}
                </VChip>
              </div>
            </BiliobSlide>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol>
        <VCard>
          <VTabs
            background-color="transparent"
            slider-color="primary"
          >
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
        </VCard>
      </VCol>
      <VCol cols="12">
        <VSlideYTransition group>
          <VRow
            v-for="eachAuthor in authorList.content"
            :key="eachAuthor.mid"
            dense
          >
            <VCol cols="12">
              <BiliobAuthorInfoCard :author="eachAuthor" />
            </VCol>
          </VRow>
        </VSlideYTransition>
      </VCol>
      <VCol
        v-if="!notFound"
        cols="12"
      >
        <VBtn
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
      </VCol>

      <VCol
        v-else
        cols="12"
      >
        <h4 class="primary--text">
          <VIcon class="primary--text">
            mdi-ship-wheel
          </VIcon>抱歉！什么都没有找到QwQ
        </h4>
        <p>
          搜索功能可能并不完善，为了精确搜索请在上方输入相关UP主的ID！
        </p>
        <p>
          如果搜索ID仍然没有结果，可能是因为该UP主并未被本站观测。你可以点击页面右下角的圆形按钮进行添加！
        </p>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import VSearchForm from "@/components/common/VSearchForm.vue";
export default {
  name: "AuthorList",
  components: {
    VSearchForm
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
    text: function () {
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
        .then((response) => {
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
          `${this.currentApiurl}?page=${page}&text=${this.text}&sort=${this.sort}`
        )
        .then((response) => {
          // 判断是否为最后一页
          if (response.data.last) {
            this.nextBtnText = "没有更多了";
            this.nextBtnDisabled = true;
          }
          response.data.content.forEach((e) => {
            this.authorList.content.push(e);
          });
        });
    }
  },
  created() {
    this.currentApiurl = "/author";
    this.axios.get(this.currentApiurl).then((response) => {
      this.refreshList(response);
    });
  },
  mounted() {
    if (this.$store.state.hotSearch == undefined) {
      this.$store.dispatch("getHotSearchAuthor");
    }
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
          `${this.currentApiurl}?page=${this.currentPage}&text=${this.text}&sort=${this.sort}`
        )
        .then((response) => {
          this.refreshList(response);
        });
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
</style>
