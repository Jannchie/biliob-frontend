<template>
  <div>
    <VCard class="question-card">
      <VCardTitle class="title font-weight-bold blue--text text--darken-3">
        <VIcon color="blue darken-3">mdi-comment-question-outline</VIcon>常见问题解答
      </VCardTitle>
    </VCard>
    <p></p>
    <VCard
      v-for="(each_cards,index) in questionCards"
      :key="each_cards.question"
      class="question-card"
    >
      <VCardTitle class="subheading font-weight blue darken-2 white--text">
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
        },
        {
          question: "积分可以用来做什么？",
          answer:
            "积分目前没有任何意义。在未来，积分可以用于强制追踪up主、增加追踪频率、提出反馈建议等等功能。"
        },
        {
          question: "如何获得积分？",
          answer: "目前仅有签到可以获得积分。"
        }
      ]
    };
  }
};
</script>
<style scoped>
.question-card {
  margin-bottom: 10px;
}
</style>
