<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VTabs
          class="py-0 my-2 elevation-3"
          show-arrows
        >
          <VTab to="/user/info">
            <VIcon left>
              mdi-account-card-details
            </VIcon>个人信息
          </VTab>
          <VTab to="/user/authorgroup">
            <VIcon left>
              mdi-account-group
            </VIcon>UP主群组
          </VTab>
          <VTab to="/user/record">
            <VIcon left>
              mdi-timetable
            </VIcon>操作记录
          </VTab>
          <!-- <VTab @click="getPage(1)">
            <VIcon left>mdi-brain</VIcon>高级统计
          </VTab> -->
        </VTabs>
      </VCol>
    </VRow>
    <VRow dense>
      <VCol cols="12">
        <RouterView />
      </VCol>
    </VRow>
  </VContainer>
</template>
