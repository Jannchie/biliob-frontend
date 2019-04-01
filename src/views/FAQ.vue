<template>
  <div>
    <VCard class="question-card">
      <VCardTitle class="title font-weight-bold blue--text text--darken-3">
        <VIcon color="blue darken-3"> mdi-comment-question-outline </VIcon>常见问题解答
      </VCardTitle>
    </VCard>
    <VCard>
      <VCardText
        v-for="(eachQuestion, index) in questionCards"
        :key="index"
      >
        <div class="subheading font-weight-black blue--text text--darken-3">
          问题{{ index + 1 }}：{{ eachQuestion.question }}
        </div>
        <div
          v-for="(eachParagraph, pIndex) in eachQuestion.answer"
          :key="pIndex"
          class="body-1"
        >
          {{ eachParagraph }}
        </div>
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
          answer: [
            "这个网站用于观测Bilibili（即B站）UP主与视频的历史数据。",
            "我通过搜集并观测B站的UP主、视频或番剧等数据，给UP主作为参考，了解自己作品的受欢迎程度。从而帮助作者创作更加优秀的作品。",
            "另一方面，通过观测这些数据，能够了解到B站的最新动态。这些数据本身就非常具有观赏性。"
          ]
        },
        {
          question: "数据的爬取间隔时间是多长？不同的视频间隔相同吗？",
          answer: [
            "目前来说，大部分视频和UP主的爬取间隔是一天一次。",
            "针对全站播放最高的20个视频，视频及其UP主的爬取间隔是10分钟。",
            "如果播放量增长和粉丝变化幅度过小，会被加入保守观测组，保守观测的视频和UP主数据更新的频率会下降。",
            "可以消耗积分强行观测保守观测组的UP主，提高他们的更新频率到一天一次。"
          ]
        },
        {
          question: "如何获得积分和经验？",
          answer: [
            "目前，每日签到可以获得10点积分和经验值。",
            "消耗积分可以增加等量的经验。"
          ]
        },
        {
          question: "签到间隔时间是多长？",
          answer: ["已注册的用户，每隔8小时就可以签到一次。"]
        },
        {
          question: "积分可以用来做什么？",
          answer: [
            "积分可以用于强制追踪up主、增加追踪频率、进行视频弹幕分析等功能。"
          ]
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
