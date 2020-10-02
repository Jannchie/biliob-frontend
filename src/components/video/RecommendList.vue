<template>
  <BiliobCard title="为你推荐">
    <div
      v-for="(item, index) in videoList"
      :key="index"
      text
      class="px-0 py-1"
      @click.stop="toVideo(item.mid, item.aid)"
    >
      <div style="display: flex">
        <VImg
          width="100px"
          max-width="100px"
          :aspect-ratio="16 / 10"
          style="border-radius:4px"
          :src="zipPic(item.pic)"
        />
        <div class="ml-2 body-1 video-title">
          {{ item.title }}
          <div class="caption">
            <VIcon small>
              mdi-account
            </VIcon>
            {{ item.author }}
          </div>
        </div>
      </div>
    </div>
  </BiliobCard>
</template>
<script>
export default {
  props: {
    videoList: { type: Array, default: () => [] }
  },
  methods: {
    toVideo(mid, aid) {
      this.$router.push("/author/" + mid + "/video/" + aid);
    }
  }
};
</script>
<style>
.video-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
