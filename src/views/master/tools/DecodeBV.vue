<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VCard elevation-3>
          <VCardTitle>
            <VIcon left>
              mdi-code-equal
            </VIcon>
            BV号转AV号
          </VCardTitle>
          <VCardText>
            将BV号解码为av号
            <br>
            Powered By
            <a
              target="_blank"
              href="https://www.zhihu.com/question/381784377/answer/1099438784"
            >
              mcfx@zhihu
            </a>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard elevation-3>
          <VCardText>
            <VRow>
              <VCol>
                <VTextField
                  v-model="bv"
                  label="在此输入BV号"
                  hide-details
                  solo
                  prefix="BV"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  v-model="av"
                  label="此处输出av号"
                  hide-details
                  solo
                  readonly
                  prefix="av"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import d from "@/util/bvidDecode.js";
export default {
  data() {
    return { bv: "" };
  },
  computed: {
    av() {
      return d("BV" + this.bv);
    }
  }
};
</script>

<style></style>
