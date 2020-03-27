<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VExpansionPanels tile>
          <VExpansionPanel>
            <VExpansionPanelHeader class="primary--text"
              ><h3>
                <VIcon color="primary" left>
                  mdi-comment-multiple-outline </VIcon
                >观测记录 / COMMENTS SYS
              </h3></VExpansionPanelHeader
            >
            <VExpansionPanelContent>
              <h4>观测记录系统规则</h4>
              <div class="body-2">
                <li>
                  只有登陆观测者能够发表观测记录。
                </li>
                <li>
                  请发表你觉得能够发表的言论。
                </li>
                <li>发表观测记录将 消耗1积分</li>
                <li>点赞观测记录将 消耗0.1积分</li>
                <li>观测记录被点赞将 获得0.1积分</li>
                <li>自赞不会获得积分</li>
              </div>
            </VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="12">
        <VCard v-if="$store.getters.getLoginState || $store.state.exp >= 100">
          <VCardTitle>
            <h5>{{ $store.state.nickName }}：</h5>
          </VCardTitle>
          <VCardText>
            <CommentTextArea
              ref="CommentTextArea"
              @getText="updateCommentContent"
            ></CommentTextArea>
            <VBtn block color="primary" @click.stop="postComment"
              ><VIcon>mdi-send</VIcon></VBtn
            >
          </VCardText>
        </VCard>
        <VCard v-else tile>
          <VCardText> 登陆后，且经验值大于100才能发表观测记录!</VCardText>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="primary" to="/login" outlined>
              <VIcon left>mdi-login</VIcon> 前往登陆页面</VBtn
            >
          </VCardActions>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VTabs class="elevation-3">
          <VTab icon="mdi-timeline" @click="sort = 1">时间序 / Latest</VTab>
          <VTab @click="sort = 0">喜欢序 / LIKE</VTab>
        </VTabs>
      </VCol>

      <VFadeTransition style="width: 100%" group>
        <VCol
          v-for="comment in comments"
          :key="comment.commentId"
          style="padding: 4px"
          cols="12"
        >
          <VCard dense tile>
            <VCardTitle class="py-0">
              <h6>
                {{ comment.user.title }} (#{{ comment.user.rank }}) /
                {{ comment.user.nickName }}:
              </h6>
            </VCardTitle>
            <VCardText
              style="white-space: pre-line;"
              class="subheading py-0"
              v-text="getEmoji(comment.content)"
            >
            </VCardText>
            <VCardText class="caption py-1">
              发布时间: {{ $timeFormat(comment.date, "YYYY-MM-DD HH:mm:ss") }}
            </VCardText>
            <VCardActions class="caption pt-0">
              <VChip
                v-if="comment.liked == false"
                small
                pill
                label
                class="ma-2"
                color="grey"
                outlined
                @click.stop="postLike(comment.commentId)"
              >
                <VIcon small left>mdi-heart-multiple-outline</VIcon>
                {{ comment.like }}
              </VChip>
              <VChip v-else small pill outlined label class="ma-2" color="red">
                <VIcon small color="red" left>mdi-heart-multiple</VIcon>
                {{ comment.like }}
              </VChip>
            </VCardActions>
          </VCard>
        </VCol>
      </VFadeTransition>

      <VFadeTransition
        v-if="comments == undefined || loading == true"
        style="width: 100%"
      >
        <VCol cols="12">
          <VSkeletonLoader
            style="width: 100%"
            elevation="3"
            type="card-heading, list-item-two-line, list-item"
          ></VSkeletonLoader>
        </VCol>
      </VFadeTransition>
      <VFadeTransition v-else-if="comments.length == 0" style="width: 100%">
        <VCol cols="12">
          <VCard>
            <VCardTitle>本页没有观测记录！ </VCardTitle>
            <VCardText>现在撰写，成为第一个记录的观测者吧~ ↑</VCardText>
          </VCard>
        </VCol>
      </VFadeTransition>

      <VCol
        v-if="
          comments != undefined &&
            comments.length % pageSize == 0 &&
            comments.length != 0 &&
            loading == false
        "
        cols="12"
      >
        <VBtn
          color="primary"
          block
          outlined
          @click="getData($route.path, true)"
        >
          载入更多 / MORE</VBtn
        >
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  components: {
    CommentTextArea: () => import("../biliob/Textarea.vue")
  },
  data() {
    return {
      page: 0,
      pageSize: 20,
      comments: undefined,
      commentContent: "",
      loading: false,
      sort: 1
    };
  },
  watch: {
    $route(to) {
      this.getData(to.path, false);
    },
    sort() {
      this.getData(this.$route.path, false);
    }
  },
  mounted() {
    this.getData(this.$route.path, false);
  },
  methods: {
    getData(path, append) {
      if (!append) {
        this.page = 0;
        this.comments = undefined;
      } else {
        this.page += 1;
      }
      if (path == "") {
        path = "-";
      }

      let url = `/comment?path=${path}&p=${this.page}&ps=${this.pageSize}&s=${this.sort}`;
      if (this.$db.comments[`${this.path}`] == undefined) {
        this.$db.comments[`${this.path}`] = {};
      }
      if (this.$db.comments[`${this.path}`][`${this.sort}`] == undefined) {
        this.$db.comments[`${this.path}`][`${this.sort}`] = {};
      }
      if (
        this.$db.comments[`${this.path}`][`${this.sort}`][`${this.page}`] ==
        undefined
      ) {
        this.loading = true;
        this.axios.get(url).then(res => {
          if (this.$route.path == path) {
            if (this.comments == undefined) {
              this.comments = [];
            }
            this.comments.push(...res.data);
          }
          this.$db.comments[`${this.path}`][`${this.sort}`][
            `${this.page}`
          ] = this.comments;
          this.loading = false;
        });
      } else {
        // 如果查詢到緩存
        if (this.comments == undefined) {
          this.comments = [];
        }
        this.comments.push(
          ...this.$db.comments[`${this.path}`][`${this.sort}`][`${this.page}`]
        );
      }
    },
    postLike(commentId) {
      this.axios.put(`/user/comment/${commentId}/like`).then(() => {
        this.comments.forEach(comment => {
          if (comment.commentId == commentId) {
            comment.like += 1;
            comment.liked = true;
          }
        });
      });
    },
    getEmoji(val) {
      var patt = /&#\d+;/g;
      var H, L, code;
      var arr = val.match(patt) || [];
      for (var i = 0; i < arr.length; i++) {
        code = arr[i];
        code = code.replace("&#", "").replace(";", "");
        H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        L = ((code - 0x10000) % 0x400) + 0xdc00;
        code = "&#" + code + ";";
        var s = String.fromCharCode(H, L);
        val = val.replace(code, s);
      }
      return val.trim();
    },
    updateCommentContent(text) {
      this.commentContent = text;
    },
    postComment() {
      this.axios
        .post(`/user/comment`, {
          path: this.$route.path,
          content: this.commentContent
        })
        .then(() => {
          this.getData(this.$route.path, false, true);
          this.$refs.CommentTextArea.clean();
        });
    }
  }
};
</script>
