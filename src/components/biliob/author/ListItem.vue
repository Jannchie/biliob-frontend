<template>
  <VSheet
    v-ripple="true"
    style="position: relative"
    :to="`/author/${eachAuthor.mid}`"
    class="mx-0  elevation-0"
    @click.stop="toAuthorDetail(eachAuthor.mid)"
  >
    <div style="padding:5px;display:flex">
      <div>
        <VImg
          class="author-face"
          :src="zipPic(eachAuthor.face.replace('http:', ''))"
          :lazy-src="zipPic(eachAuthor.face.replace('http:', ''))"
        />
      </div>
      <div style="margin-left:10px;width:100%;overflow:hidden">
        <div class="font-weight-bold author-title">
          {{ eachAuthor.name }}
          <SexIcon :sex="eachAuthor.sex" />
        </div>
        <div
          v-if="eachAuthor.official !== ''"
          class="caption author-info d-block text-truncate"
        >
          <VIcon color="#FBC02D" small> mdi-flash-circle </VIcon
          ><span style="vertical-align: middle">
            {{ eachAuthor.official }}</span
          >
        </div>
        <ObserveStatus class="observe-status" :object="eachAuthor" />
      </div>
    </div>
    <VDivider v-if="index != authorList.length - 1"></VDivider>
  </VSheet>
</template>
