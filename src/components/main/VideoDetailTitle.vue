<template>
  <BiliobCard>
    <FavoriteBtn :aid="aid" class="favorite-btn" />
    <VLayout>
      <VRow dense>
        <VCol cols="auto">
          <VImg
            class="video-img"
            style="width:120px;height:75px;"
            max-width="160"
            :src="zipPic(pic)"
            :lazy-src="zipPic(pic)"
          />
        </VCol>
        <VCol cols="auto" style="width:calc(100% - 180px)">
          <div style="overflow:hidden; text-overflow: ellipsis;">
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

                <span
                  class="ml-1 px-1 blue lighten-1 white--text mr-1 font-weight-black"
                  style="border-radius:3px"
                  >BV</span
                ><span class="text--lighten-1 blue--text">{{ bv }}</span>
              </div>
            </div>
          </div>
        </VCol>
      </VRow>
    </VLayout>
  </BiliobCard>
</template>

<script>
import FavoriteBtn from "../common/FavoriteBtn.vue";
export default {
  components: { FavoriteBtn },
  props: { title: String(), pic: String(), aid: Number(), bv: String() },
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
