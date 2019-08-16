<template>
  <div class="author-list-main">
    <div>
      <div>
        <VSlideYTransition group>
          <VCard
            v-for="eachAuthor in authorList.content"
            :key="eachAuthor.mid"
            class="author-cards"
            ripple
            :to="'/author/' + eachAuthor.mid"
          >
            <div style="padding:5px;display:flex">
              <div>
                <VResponsive :aspect-ratio="16 / 9">
                  <img
                    style="border-radius:40px;width:80px;height:80px"
                    :src="zipPic(eachAuthor.face.slice(5))"
                  />
                </VResponsive>
              </div>
              <div style="margin-left:10px;overflow:hidden">
                <div
                  class="font-weight-bold text-no-wrap text-truncate author-title"
                >
                  {{ eachAuthor.name }}
                  <SexIcon :sex="eachAuthor.sex" />
                </div>
                <div
                  v-if="eachAuthor.official !== ''"
                  class="caption subtext author-info"
                >
                  <VIcon color="#FBC02D" small> mdi-flash </VIcon
                  >{{ eachAuthor.official }}
                </div>
              </div>
              <ObserveStatus class="observe-status" :object="eachAuthor" />
            </div>
          </VCard>
        </VSlideYTransition>
        <VBtn
          block
          outlined
          color="blue darken-2"
          :disabled="nextBtnDisabled"
          @click.stop="next"
        >
          {{ nextBtnText }}
        </VBtn>
      </div>
    </div>
  </div>
</template>

<script>
import ObserveStatus from "../common/ObserveStatus.vue";
import SexIcon from "../common/SexIcon.vue";
export default {
  name: "AuthorList",
  components: {
    SexIcon,
    ObserveStatus
  },
  data() {
    return {
      authorList: [],
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
            this.text
        )
        .then(response => {
          this.authorList.content = response.data.content;
        });
    },
    currentPage: function changePage(page) {
      this.axios
        .get(this.currentApiurl + "?page=" + page + "&text=" + this.text)
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
    this.currentApiurl = "/user/author";
    this.axios.get(this.currentApiurl).then(response => {
      this.authorList = response.data;
      // 判断是否为最后一页
      if (response.data.last) {
        this.nextBtnText = "没有更多了";
        this.nextBtnDisabled = true;
      }
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
        // this.currentPage += 1;
      }
    },
    next() {
      this.currentPage += 1;
    },
    getSearchValue(value) {
      this.text = value;
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

.author-cards {
  margin: 10px 2px;
  height: 90px;
  border-radius: 5px;
}

.author-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.observe-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.author-info {
  margin-top: 5px;
}
</style>
