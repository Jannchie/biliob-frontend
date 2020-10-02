<template>
  <VContainer>
    <VRow dense>
      <VCol cols="12">
        <VCard elevation-3>
          <VCardTitle>
            <VIcon left>
              mdi-download
            </VIcon>
            视频缓存
          </VCardTitle>
          <VCardText>
            获取视频的下载地址。
            <br>
            Powered By you-get
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
                  v-model="p"
                  label="在此输入分P数"
                  hide-details
                  solo
                  prefix="p"
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
export default {
  data() {
    return { av: "", p: 1 };
  }
};
</script>

<style></style>
