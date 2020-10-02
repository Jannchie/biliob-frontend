<template>
  <div>
    <VRow dense>
      <VCol
        style="margin: auto;"
        :order="right ? 3 : 1"
        cols="auto"
      >
        <VAvatar>
          <VImg :src="author.face" />
        </VAvatar>
      </VCol>

      <VCol
        style="margin: auto;"
        :order="2"
        :class="right ? `text-right` : ``"
      >
        <h3>{{ author.name }}</h3>
        <h4 class="caption ">
          {{ author.official }}
        </h4>
      </VCol>
      <VCol
        cols="auto"
        :order="right ? 1 : 3"
        class="text-center title"
        style="margin: auto;"
      >
        <div class="caption">
          粉丝数
        </div>
        <CommonVOdometer
          class="font-weight-black primary--text body-1"
          :value="author.cFans"
          format="(,ddd).d"
        />
      </VCol>
    </VRow>
    <VRow dense />
  </div>
</template>

<script>
export default {
  props: {
    author: Object(),
    right: Boolean()
  }
};
</script>

<style></style>
