<template>
  <VCard v-if="$store.getters.getLoginState && $store.state.exp >= 100">
    <VCardTitle>
      <VCardTitle class="pa-0">
        <h6>
          {{ $db.user.title }} (#{{ $db.user.rank }}) / {{ $db.user.nickName }}:
        </h6>
      </VCardTitle>
    </VCardTitle>
    <VCardText>
      <BiliobTextarea
        ref="CommentTextArea"
        @submit="postComment"
        @getText="updateCommentContent"
      />
      <VBtn
        block
        color="primary"
        @click.stop="postComment"
      >
        <VIcon>mdi-send</VIcon>
      </VBtn>
    </VCardText>
  </VCard>
  <VCard
    v-else
    tile
  >
    <VCardText> 登陆后，且经验值大于100才能发表观测记录!</VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn
        v-if="!$store.getters.getLoginState"
        color="primary"
        to="/login"
        outlined
      >
        <VIcon left>
          mdi-login
        </VIcon> 前往登陆页面
      </VBtn>
    </VCardActions>
  </VCard>
</template>
<script>
export default {
  props: {
    sort: {
      type: Number,
      default: undefined
    },
    parent: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      commentContent: ""
    };
  },
  watch: {
    parent() {}
  },
  methods: {
    updateCommentContent(text) {
      this.commentContent = text;
    },

    postComment() {
      this.axios
        .post(`/user/comment`, {
          path: this.$route.path,
          content: this.commentContent,
          parentId: this.parent
        })
        .then((res) => {
          this.$db.user.credit = res.data.user.credit;
          this.$db.user.exp = res.data.user.exp;
          res.data.data.like = 0;
          res.data.data.user = this.$db.user;
          res.data.replies = [];
          if (this.sort == 1) {
            this.$db.comments[`${this.$route.path}`][`${this.sort}`][0].unshift(
              res.data.data
            );
          }
          this.$emit("post", res.data.data);
          this.$refs.CommentTextArea.clean();
        });
    }
  }
};
</script>
