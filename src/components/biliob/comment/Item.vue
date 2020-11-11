<template>
  <VCard
    dense
    tile
  >
    <VCardTitle class="py-0">
      <BiliobUserInfo
        v-if="comment.user != undefined"
        :user="comment.user"
      />
      <h6 v-else>
        {{ comment.user }}:
      </h6>
    </VCardTitle>
    <VCardText class="caption pb-1">
      {{ $timeFormat(comment.date, "YYYY-MM-DD HH:mm:ss") }}
    </VCardText>
    <VCardText
      style="white-space: pre-line;"
      class="subheading py-0"
      v-text="getEmoji($keywordFilter(comment.content))"
    />

    <VCardActions class="caption pt-0">
      <VRow no-gutters>
        <VCol cols="auto">
          <VBtn
            v-if="showAction"
            small
            text
            label
            class="ma-2"
            color="grey"
            @click.stop="openReplies"
          >
            <VIcon
              small
              left
            >
              mdi-message-reply-text
            </VIcon>
            {{ comment.replies == undefined ? 0 : comment.replies.length }}
          </VBtn>
          <VBtn
            v-if="comment.liked == false"
            small
            text
            label
            class="ma-2"
            color="grey"
            @click.stop="postLike(comment.commentId)"
          >
            <VIcon
              small
              left
            >
              mdi-heart-multiple-outline
            </VIcon>
            {{ comment.like }}
          </VBtn>
          <VBtn
            v-else
            small
            text
            label
            class="ma-2"
            color="red"
          >
            <VIcon
              small
              color="alert"
              left
            >
              mdi-heart-multiple
            </VIcon>
            {{ comment.like }}
          </VBtn>
        </VCol>
        <VSpacer />
        <VCol cols="auto">
          <VMenu offset-y>
            <template v-slot:activator="{ on }">
              <VBtn
                class="ma-2"
                small
                text
                color="primary"
                dark
                v-on="on"
              >
                <VIcon>
                  mdi-dots-horizontal-circle-outline
                </VIcon>
              </VBtn>
            </template>
            <VList dense>
              <VListItem
                :disabled="
                  $db.user.name != comment.user.name &&
                    $db.user.title != '管理者' &&
                    $db.user.role != '管理员' &&
                    $db.user.role != '系统测试员' &&
                    $db.user.role != '见齐' &&
                    $db.user.role != '特权研究员'
                "
                @click="deleteComment"
              >
                <VListItemIcon>
                  <VIcon
                    small
                    color="red"
                  >
                    mdi-close
                  </VIcon>
                </VListItemIcon>
                <VListItemTitle class="red--text">
                  删除
                </VListItemTitle>
              </VListItem>
            </VList>
          </VMenu>
        </VCol>
      </VRow>
    </VCardActions>
  </VCard>
</template>
<script>
export default {
  props: {
    comment: Object(),
    showAction: Boolean()
  },
  data() {
    return {
      deleted: false
    };
  },
  mounted() {
    if (this.comment.like == undefined) {
      this.comment.like = 0;
    }
  },
  methods: {
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
    postLike() {
      this.axios.put(`/user/comment/${this.comment.commentId}/like`);
      this.comment.liked = true;
      this.comment.like += 1;
    },
    deleteComment() {
      this.axios.delete(`/user/comment/${this.comment.commentId}`).then(() => {
        this.comment.content = "[ 该█████已被删除 ]";
      });
      this.$emit("deleted", this.comment.commentId);
    },
    openReplies() {
      this.$emit("openReplies", this.comment.commentId);
    }
  }
};
</script>
<style scoped></style>
