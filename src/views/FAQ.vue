<template>
  <div>
    <VCard>
      <VCardTitle class="title font-weight-bold blue--text text--darken-3">
        <VIcon color="blue darken-3">mdi-comment-question-outline</VIcon>常见问题解答
      </VCardTitle>
    </VCard>
    <p></p>
    <VCard
      v-for="(each_cards,index) in questionCards"
      :key="each_cards.question"
    >
      <VCardTitle class="subheading font-weight-bold blue white--text">
        问题{{index}}：{{each_cards.question}}
      </VCardTitle>
      <VCardText>
        {{each_cards.answer}}
      </VCardText>
    </VCard>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionCards: [
        {
          question: "这个网站可以用来做什么？",
          answer: "这个网站用于观测Bilibili（即B站）UP主与视频的历史数据。"
        },
        {
          question: "签到间隔时间是多长？",
          answer: "已注册的用户，每隔8小时就可以签到一次。"
        }
      ]
    };
  }
};
</script>
<style>
</style>
