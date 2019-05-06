<template>
  <MaterialCard>
    <div
      slot="offset"
      class="mx-auto d-block"
    >
      <img
        class="video-img"
        style="width:160px;height:100px"
        :src="zipPic(pic)"
      >
    </div>
    <div style="position:absolute;top:20px;left:200px;right:20px">
      <div style="display:flex;">
        <div style="overflow:hidden;">
          <div
            style="width:100%"
            class="font-weight-bold video-title "
          >
            {{ title }}
          </div>
          <span
            class="px-1 pink lighten-3 white--text mr-1 font-weight-black"
            style="border-radius:3px"
          >AV</span><span class="text--lighten-3 pink--text">{{ $route.params.aid }}</span>
        </div>
      </div>
    </div>
    <FavoriteBtn
      :aid="aid"
      class="favorite-btn"
    />
  </MaterialCard>
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
  height: 96px;
  border-radius: 4px;
}

.v-card {
  height: 96px;
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
