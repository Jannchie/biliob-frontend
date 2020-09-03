<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <BiliobCard
          border="bottom"
          title="目录"
          class="title mb-2"
        >
          <div>
            <ol
              v-for="(eachCatalog, catalogIndex) in faqData"
              slot="body"
              :key="catalogIndex"
              class="body-2 mb-2"
            >
              <a @click="$vuetify.goTo(`#${eachCatalog['catalogName']}`,{offset:30})">

                {{ eachCatalog["catalogName"] }}
              </a>
              <li
                v-for="(eachQuestion,
                        questionIndex) in eachCatalog.catalogQuestions"
                :key="questionIndex"
                class="caption mb-1"
              >
                <a @click="$vuetify.goTo(`#${eachQuestion.question}`,{offset:30})"> {{ eachQuestion.question }}
                </a>
              </li>
              <VDivider />
            </ol>
          </div>
        </BiliobCard>
      </VCol>
      <VCol
        v-for="(eachCatalog, catalogIndex) in faqData"
        :id="`${eachCatalog['catalogName']}`"
        :key="catalogIndex"
        cols="12"
      >
        <BiliobCard
          border="bottom"
          class="mb-1 title"
          :title="eachCatalog['catalogName']"
        >
          <div class="mb-5">
            <div
              v-for="(eachQuestion, questionIndex) in eachCatalog[
                'catalogQuestions'
              ]"
              :id="eachQuestion['question']"
              :key="questionIndex"
              class="mb-4"
            >
              <div class="body-2 font-weight-regular primary--text mb-4">
                问题{{ questionIndex + 1 }}：{{ eachQuestion.question }}
              </div>
              <div class="mb-5">
                <VueMarkdown
                  v-for="(eachParagraph, pIndex) in eachQuestion.answer"
                  :key="pIndex"
                  class="body-2"
                  :source="eachParagraph"
                />
              </div>
            </div>
          </div>
        </BiliobCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
<script>
var data = require("@/../public/docs/faq.json");
export default {
  data() {
    return data;
  },
  mounted() {}
};
</script>
<style scoped>
.question-card {
  margin-bottom: 10px;
}
a {
  color: #424242;
  text-decoration: none;
}
a:hover {
  color: #1565c0;
}
</style>
