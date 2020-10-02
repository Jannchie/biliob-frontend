<template>
  <VCard
    style="position: relative"
    :to="`/author/${author.mid}`"
    class="mx-0 elevation-0"
  >
    <VRow style="flex-wrap: nowrap">
      <VCol cols="auto">
        <VImg
          class="author-face"
          :src="zipPic(author.face)"
          :lazy-src="zipPic(author.face)"
        />
      </VCol>
      <VCol style="overflow-y: hidden;">
        <h4>
          {{ author.name }}
          <CommonSexIcon :sex="author.sex" />
        </h4>
        <div
          v-if="author.official !== ''"
          class="text-truncate"
        >
          <VIcon
            color="#FBC02D"
            small
          >
            mdi-flash-circle
          </VIcon><span
            class="caption"
            style="vertical-align: middle; overflow: hidden"
          >
            {{ author.official }}</span>
        </div>
        <div
          class="caption text-truncate"
          style="overflow: hidden"
        >
          <VIcon
            x-small
            left
          >
            mdi-account-multiple
          </VIcon>{{ $numberFormat(author.cFans) }}({{
            author.cRate > 0
              ? "+" + $numberFormat(author.cRate)
              : $numberFormat(author.cRate)
          }}) <VIcon
            x-small
            left
          >
            mdi-thumb-up
          </VIcon>{{ $numberFormat(author.cLike) }}
          <VIcon
            x-small
            left
          >
            mdi-play
          </VIcon>{{ $numberFormat(author.cArchiveView) }}
        </div>
        <VRow no-gutters>
          <VSpacer />
          <VCol
            cols="auto"
            class="px-1"
          >
            <CommonObserveStatus :object="author" />
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VCard>
</template>
<script>
export default {
  props: {
    author: Object()
  },
  mounted() {},
  methods: {
    toAuthorDetail(mid) {
      this.$router.push("/author/" + mid);
    }
  }
};
</script>
