<template>
  <VCard>
    <div>
      <div style="display:flex">
        <div>
          <img class="video-img" style="vertical-align: bottom" :src="pic" />
        </div>
        <VCardText style="width:55%">
          <div class="font-weight-bold video-title">
            {{title}}
          </div>
          <br>
          aid:{{ $route.params.aid }}
        </VCardText>
      </div>
    </div>
  </VCard>
</template>

<script>
export default {
  props: { title: String(""), pic: String("") },
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
</style>
