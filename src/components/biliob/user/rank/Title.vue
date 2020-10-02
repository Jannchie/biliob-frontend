<template>
  <VRow>
    <VCol>
      <BiliobCard class="user-rank-title">
        <div class="title">
          <VIcon
            color="#424242"
            style="vertical-align: sub"
            left
          >
            {{
              icon
            }}
          </VIcon><span class="grey--text ">{{ title }}</span>
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
    #ffffffff 90%,
    #424242 90% 91%,
    #fff 91% 92%,
    #424242 92%
  );
}
</style>
