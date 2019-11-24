<template>
  <VRow>
    <VCol>
      <BiliobCard class="user-rank-title">
        <div class="title">
          <VIcon color="#424242" style="vertical-align: sub" left>{{
            icon
          }}</VIcon
          ><span class="grey--text text--darken-3">{{ title }}</span>
        </div>
      </BiliobCard>
    </VCol>
  </VRow>
</template>
<script>
export default {
  props: {
    title: String(),
    icon: String()
  }
};
</script>
<style scoped>
.user-rank-title {
  background: linear-gradient(
    90deg,
    #ffffffff 233px,
    #424242 233px 235px,
    #fff 235px 237px,
    #424242 237px
  );
}
</style>
