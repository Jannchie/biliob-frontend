<template>
  <VSlideYTransition
    mode="out-in"
    tag="div"
    class="row justify-center"
    group
  >
    <VCol
      key="main"
      lg="8"
      cols="12"
    >
      <VSlideYTransition
        group
        mode="out-in"
      >
        <RouterView
          v-if="!baned"
          id="main-view"
          key="main"
        />
        <div
          v-else
          id="main-view"
          key="end"
        >
          <VRow dense>
            <BiliobCard title="BiliOB的最终致辞">
              <VueMarkdown :source="end" />
            </BiliobCard>
          </VRow>
          <VRow
            key="link"
            dense
          >
            <BiliobCard
              width="100%"
              class="mt-2"
            >
              <VRow dense>
                <VCol
                  cols="12"
                  lg="6"
                >
                  <VBtn
                    block
                    outlined
                    class="pink--text lighten-3 mr-2"
                    href="https://space.bilibili.com/1850091"
                  >
                    前往见齐的B站空间关注站长
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  lg="6"
                >
                  <VBtn
                    block
                    class="black--text mr-2"
                    href="https://github.com/Jannchie"
                    outlined
                  >
                    前往见齐的GitHub主页欣赏帅照
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  lg="6"
                >
                  <VBtn
                    block
                    outlined
                    class="mr-2 primary--text"
                    href="https://jq.qq.com/?_wv=1027&k=593vDCo"
                  >
                    加入粉丝群一起愉快聊天
                  </VBtn>
                </VCol>
                <VCol
                  cols="12"
                  lg="6"
                >
                  <VBtn
                    block
                    outlined
                    class="mr-2 orange--text"
                    href="https://azz.net/Jannchie"
                  >
                    给见齐打钱成为赞助者
                  </VBtn>
                </VCol>
              </VRow>
            </BiliobCard>
          </VRow>
        </div>
      </VSlideYTransition>
    </VCol>

    <VCol
      v-if="
        ($store.getters.getLoginState &&(
          -1 == ['/login', '/signin'].indexOf(this.$route.path) &&
          this.$route.path.indexOf('user') == -1 ||
          this.$route.path == '/user/rank'))
      "
      key="comment"
      lg="3"
      cols="12"
    >
      <BiliobComment id="comment-container" />
    </VCol>

    <VCol
      v-if="
        (-1 == ['/login', '/signin'].indexOf(this.$route.path) &&
          this.$route.path.indexOf('user') == -1) ||
          this.$route.path == '/user/rank'
      "
      key="sponsor"
      :style="`${
        $vuetify.breakpoint.lgAndDown
          ? 'max-height: 245px;overflow-y: auto;'
          : ''
      }`"
      lg="1"
      cols="12"
    >
      <BiliobSponsor id="sponsor-container" />
    </VCol>
  </VSlideYTransition>
</template>

<script>
import end from "../../../public/docs/end.md";
export default {
  data() {
    return { end: end, baned: true };
  },
  watch: {
    "$route.path": function () {
      let path = this.$route.path;
      if (
        path.indexOf("user") == -1 &&
        (path.indexOf("rank") != -1 ||
          path.indexOf("video") != -1 ||
          path.indexOf("author") != -1 ||
          path.indexOf("bangumi") != -1 ||
          path == "/")
      ) {
        this.baned = true;
      } else {
        this.baned = false;
      }
    }
  }
};
</script>

<style>
p {
  margin-bottom: 10px !important;
}
</style>