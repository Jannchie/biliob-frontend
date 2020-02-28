<template>
  <VSheet
    v-ripple="true"
    style="position: relative"
    :to="`/author/${author.mid}`"
    class="mx-0  elevation-0"
    @click.stop="toAuthorDetail(author.mid)"
  >
    <VRow>
      <VCol cols="auto">
        <VImg
          class="author-face"
          :src="zipPic(author.face)"
          :lazy-src="zipPic(author.face)"
        />
      </VCol>
      <VCol>
        <h4>
          {{ author.name }}
          <CommonSexIcon :sex="author.sex" />
        </h4>
        <div
          v-if="author.official !== ''"
          class="caption author-info d-block text-truncate"
        >
          <VIcon color="#FBC02D" small> mdi-flash-circle </VIcon
          ><span style="vertical-align: middle"> {{ author.official }}</span>
        </div>
        <CommonObserveStatus class="observe-status" :object="author" />
      </VCol>
    </VRow>
  </VSheet>
</template>
<script>
export default {
  props: {
    author: Object()
  },
  methods: {
    toAuthorDetail(mid) {
      this.$router.push("/author/" + mid);
    }
  }
};
</script>
