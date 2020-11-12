<template>
  <VRow dense>
    <VCol cols="12">
      <VExpansionPanels tile>
        <VExpansionPanel>
          <VExpansionPanelHeader class="primary--text">
            <h3>
              <VIcon
                color="primary"
                left
              >
                mdi-comment-multiple-outline
              </VIcon>观测记录 / COMMENTS SYS
            </h3>
          </VExpansionPanelHeader>
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
      <BiliobCommentInput
        :sort="sort"
        @post="addComment"
      />
    </VCol>
    <VCol cols="12">
      <VTabs class="elevation-3">
        <VTab
          icon="mdi-timeline"
          @click="sort = 1"
        >
          时间序 / Latest
        </VTab>
        <VTab @click="sort = 0">
          喜欢序 / LIKE
        </VTab>
      </VTabs>
    </VCol>

    <VSlideYTransition
      ref="scroll"
      style="width: 100%"
      group
    >
      <VCol
        v-for="comment in comments"
        :key="comment.commentId"
        style="padding: 4px"
        cols="12"
      >
        <BiliobCommentItem
          :comment="comment"
          :show-action="true"
          @openReplies="openReplies"
        />
      </VCol>
    </VSlideYTransition>

    <VSlideYTransition
      v-if="comments == undefined || loading == true"
      style="width: 100%"
    >
      <VCol cols="12">
        <VSkeletonLoader
          style="width: 100%"
          elevation="3"
          type="card-heading, list-item-two-line, list-item"
        />
      </VCol>
    </VSlideYTransition>
    <VSlideYTransition
      v-else-if="comments.length == 0"
      style="width: 100%"
    >
      <VCol cols="12">
        <VCard>
          <VCardTitle>本页没有观测记录！ </VCardTitle>
          <VCardText>现在撰写，成为第一个记录的观测者吧~ ↑</VCardText>
        </VCard>
      </VCol>
    </VSlideYTransition>
    <VCol
      v-else-if="
        comments != undefined &&
          comments.length % pageSize == 0 &&
          comments.length != 0
      "
      cols="12"
    >
      <VBtn
        color="primary"
        block
        outlined
        @click="getData($route.path, sort, true)"
      >
        载入更多 / MORE
      </VBtn>
    </VCol>
    <VCol v-else-if="loading == false">
      <VBtn
        color="primary"
        block
        outlined
        disabled
      >
        没有更多了 / NO MORE
      </VBtn>
    </VCol>
    <VDialog
      v-model="showReplies"
      max-width="500"
    >
      <div v-if="replyDialog != undefined && replyDialog.comment != undefined">
        <BiliobCommentItem
          :show-action="false"
          class="mb-2"
          :comment="replyDialog.comment"
        />
        <BiliobCommentItem
          v-for="(reply, i) in replyDialog.comment.replies"
          :key="i"
          class="mb-2"
          :show-action="false"
          :comment="reply"
        />
        <BiliobCommentInput
          :parent="replyDialog.comment.commentId"
          :sort="sort"
          @post="addComment"
        />
      </div>
    </VDialog>
  </VRow>
</template>
<script>
export default {
  data() {
    return {
      page: 0,
      pageSize: 20,
      comments: undefined,
      loading: false,
      sort: 1,
      showReplies: false,
      replies: [],
      replyDialog: {}
    };
  },
  watch: {
    $route(to) {
      this.loading = false;
      this.getData(to.path, this.sort, false);
    },
    sort() {
      this.loading = false;
      this.getData(this.$route.path, this.sort, false);
    }
  },
  mounted() {
    this.getData(this.$route.path, this.sort, false);
  },
  methods: {
    getData(path, sort, append) {
      if (!append) {
        this.page = 0;
        this.comments = undefined;
      } else {
        this.page += 1;
      }
      if (path == "") {
        path = "-";
      }
      let page = this.page;
      let url = `/comment?path=${path}&p=${page}&ps=${this.pageSize}&s=${sort}`;
      if (this.$db.comments[`${path}`] == undefined) {
        this.$db.comments[`${path}`] = {};
      }
      if (this.$db.comments[`${path}`][`${sort}`] == undefined) {
        this.$db.comments[`${path}`][`${sort}`] = {};
      }
      if (this.$db.comments[`${path}`][`${sort}`][`${page}`] == undefined) {
        this.loading = true;
        this.axios.get(url).then((res) => {
          if (this.$route.path == path && this.sort == sort) {
            if (this.comments == undefined) {
              this.comments = [];
            }
            this.comments.push(...res.data);
          }
          this.$db.comments[`${path}`][`${sort}`][`${page}`] = res.data;
          this.loading = false;
        });
      } else {
        // 如果查詢到緩存
        if (this.comments == undefined) {
          this.comments = [];
        }
        this.comments.push(
          ...this.$db.comments[`${path}`][`${sort}`][`${page}`]
        );
      }
    },

    openReplies(commentId) {
      this.comments.forEach((c) => {
        if (c.commentId == commentId) {
          this.replyDialog.comment = c;
        }
      });

      this.showReplies = true;
    },
    addComment(comment) {
      if (comment.parentId == undefined) {
        this.comments.unshift(comment);
      } else {
        this.comments.forEach((c) => {
          if (c.commentId == comment.parentId) {
            c.replies.unshift(comment);
          }
        });
      }
    }
  }
};
</script>
