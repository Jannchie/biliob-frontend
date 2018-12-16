<template>
  <VCard>
    <div style="display:flex">
      <div>
        <img class="video-img" style="vertical-align: bottom" :src="pic" />
      </div>
      <VCardText style="overflow:hidden">
        <div class="font-weight-bold video-title ">
          {{title}}
        </div>
        <br>
        aid:{{ $route.params.aid }}
      </VCardText>
      <FavoriteBtn :aid="aid" class="favorite-btn"></FavoriteBtn>
    </div>
  </VCard>
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
  max-width: 50vmin;
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
