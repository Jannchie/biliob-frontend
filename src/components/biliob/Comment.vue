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
                >评论系统
              </h3></VExpansionPanelHeader
            >
            <VExpansionPanelContent>
              <h4>评论系统规则</h4>
              <div class="body-2">
                <li>
                  只有登陆观测者能够发表评论。
                </li>
                <li>
                  请发表你觉得能够发表的言论。
                </li>
                <li>发表评论将<VChip x-small>消耗1积分</VChip></li>
                <li>点赞评论将<VChip x-small>消耗0.1积分</VChip></li>
                <li>评论被点赞将<VChip x-small>获得0.1积分</VChip></li>
              </div>
            </VExpansionPanelContent>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>

      <VCol v-for="comment in comments" :key="comment.commentId" cols="12">
        <VCard tile>
          <VCardTitle class="body-1"> {{ comment.user.nickName }}: </VCardTitle>
          <VCardText class="body-2">
            {{ getEmoji(comment.content) }}
          </VCardText>
          <VCardActions>
            <VChip label class="ma-2" color="red" outlined>
              <VIcon left>mdi-heart-multiple-outline</VIcon>
              {{ comment.like }}
            </VChip>
            <VBtn outlined>
              <VIcon left>mdi-delete</VIcon>
              删除
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
      <VCol cols="12">
        <BiliobCard v-if="$store.getters.getLoginState" title="发表评论">
          <p>{{ $store.state.nickName }}：</p>
          <BiliobTextarea @getText="updateCommentContent"></BiliobTextarea>
          <VBtn block color="primary" @click.stop="postComment"
            ><VIcon>mdi-send</VIcon></VBtn
          >
        </BiliobCard>
        <VCard v-else tile>
          <VCardText> 登陆后才能发表评论!</VCardText>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn color="primary" outlined>
              <VIcon left>mdi-login</VIcon> 前往登陆页面</VBtn
            >
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      page: 0,
      pageSize: 20,
      comments: [],
      commentContent: ""
    };
  },
  watch: {
    $route(to) {
      this.getData(to.path);
    }
  },
  mounted() {
    this.getData(this.$route.path);
  },
  methods: {
    getData(path) {
      if (path == "") {
        path = "/";
      }
      this.axios
        .get(`/comment?path=${path}&p=${this.page}&ps=${this.pageSize}`)
        .then(res => {
          this.comments = res.data;
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
      return val;
    },
    updateCommentContent(text) {
      this.commentContent = text;
    },
    postComment() {
      this.axios.post(`/user/comment`, {
        path: this.$route.path,
        content: this.commentContent
      });
    }
  }
};
</script>
