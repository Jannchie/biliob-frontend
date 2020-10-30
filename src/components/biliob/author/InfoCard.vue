<template>
  <VCard :to="`/author/${author.mid}`">
    <VCardText>
      <VRow no-gutters>
        <VCol
          cols="auto"
          class="mr-3"
        >
          <VAvatar :size="author.cFans != undefined?`62px`:`40px`">
            <VImg :src="zipPic(author.face)" />
          </VAvatar>
        </VCol>
        <VCol>
          <h3>
            {{ author.name }}
            <CommonSexIcon :sex="author.sex" />
          </h3>
          <div class="caption">
            uid: {{ author.mid }}
          </div>
          <div class="caption">
            {{ author.official }}
          </div>
        </VCol>
      </VRow>
      <VRow
        v-if="author.cFans != undefined"
        no-gutters
        class="mt-2"
      >
        <VCol
          lg="2"
          cols="4"
        >
          <div class="caption">
            粉丝数
          </div>
          <div class="caption">
            {{ $numberFormat(author.cFans, false) }} ({{
              author.cRate > 0
                ? "+" + $numberFormat(author.cRate, false)
                : "" + $numberFormat(author.cRate, false)
            }})
          </div>
        </VCol>
        <VCol
          lg="2"
          cols="4"
        >
          <div class="caption">
            播放量
          </div>
          <div class="caption">
            {{ $numberFormat(author.cArchiveView, false) }}
          </div>
        </VCol>
        <VCol
          lg="2"
          cols="4"
        >
          <div class="caption">
            获赞数
          </div>
          <div class="caption">
            {{ $numberFormat(author.cLike, false) }}
          </div>
        </VCol>
        <VCol
          v-if="author.rank != undefined"
          lg="2"
          cols="4"
        >
          <div class="caption">
            粉丝排名
          </div>
          <div class="caption">
            # {{ $numberFormat(author.rank.fansRank, false) }}
          </div>
        </VCol>
        <VCol
          v-if="author.rank != undefined"
          lg="2"
          cols="4"
        >
          <div class="caption">
            播放排名
          </div>
          <div class="caption">
            #{{ $numberFormat(author.rank.archiveViewRank, false) }}
          </div>
        </VCol>
        <VCol
          v-if="author.rank != undefined"
          lg="2"
          cols="4"
        >
          <div class="caption">
            获赞排名
          </div>
          <div class="caption">
            #{{ $numberFormat(author.rank.likeRank, false) }}
          </div>
        </VCol>
        <VCol style="position: absolute;right:16px; top:16px">
          <VRow no-gutters>
            <VSpacer />
            <VCol cols="auto">
              <CommonObserveStatus :object="author" />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<script>
export default {
  props: { author: Object() }
};
</script>

<style></style>
