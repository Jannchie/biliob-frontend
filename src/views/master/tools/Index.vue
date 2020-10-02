<template>
  <VContainer>
    <VRow dense>
      <VCol
        cols="6"
        lg="3"
      >
        <VCard
          to="/tools/BV2av"
          elevation-3
        >
          <VCardTitle>
            <VIcon left>
              mdi-code-equal
            </VIcon>
            BV号转av号
          </VCardTitle>
          <VCardText>
            一个BV号的解码器
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
      <VCol
        cols="6"
        lg="3"
      >
        <VCard
          to="/tools/av2BV"
          elevation-3
        >
          <VCardTitle>
            <VIcon left>
              mdi-code-equal
            </VIcon>
            av号转BV号
          </VCardTitle>
          <VCardText>
            一个av号的编码器
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
      <!-- <VCol cols="4" lg="3">
        <VCard to="/tools/BV2av" elevation-3>
          <VCardTitle>
            <VIcon left>mdi-download</VIcon>
            视频下载
          </VCardTitle>
          <VCardText>
            缓存B站上的视频。
            <br />
            Powered By You-get
          </VCardText>
        </VCard>
      </VCol> -->
    </VRow>
  </VContainer>
</template>

<script>
export default {};
</script>
