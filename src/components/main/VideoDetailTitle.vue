<template>
  <BiliobCard>
    <VLayout>
      <VFlex style="flex: none;">
        <VImg
          class="video-img"
          style="width:120px;height:75px;"
          max-width="160"
          :src="zipPic(pic)"
          :lazy-src="zipPic(pic)"
        />
      </VFlex>
      <VFlex class="ml-2" style="overflow:hidden; text-overflow: ellipsis;">
        <div>
          <div>
            <div style="width:100%" class="font-weight-bold video-title ">
              {{ title }}
            </div>
            <span
              class="px-1 pink lighten-3 white--text mr-1 font-weight-black"
              style="border-radius:3px"
              >AV</span
            ><span class="text--lighten-3 pink--text">{{
              $route.params.aid
            }}</span>
          </div>
        </div>
      </VFlex>
    </VLayout>
    <FavoriteBtn :aid="aid" class="favorite-btn" />
  </BiliobCard>
</template>

<script>
import FavoriteBtn from "../common/FavoriteBtn.vue";
export default {
  components: { FavoriteBtn },
  props: { title: String(), pic: String(), aid: Number() },
  data() {
    return {
      name: {}
    };
  }
};
</script>

<style scoped>
.video-img {
  border-radius: 4px;
}

.v-card {
  padding: 0px;
}

.video-title {
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.favorite-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>
