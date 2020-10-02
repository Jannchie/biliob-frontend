<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VCard elevation-3>
          <VCardTitle>
            <VIcon left>
              mdi-code-equal
            </VIcon>
            av号转BV号
          </VCardTitle>
          <VCardText>
            将av号编码为BV号
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
                  v-model="av"
                  label="在此输入av号"
                  hide-details
                  solo
                  prefix="av"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  v-model="bv"
                  label="此处输出BV号"
                  hide-details
                  solo
                  readonly
                  prefix="BV"
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
import e from "@/util/bvidEncode.js";
export default {
  data() {
    return { av: "" };
  },
  computed: {
    bv() {
      return e(this.av);
    }
  }
};
</script>

<style></style>
