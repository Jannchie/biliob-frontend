<template>
  <div>
    <VTabs class="py-0 my-2 elevation-3" show-arrows>
      <VTab to="/user/authorgroup/star">
        <VIcon left>mdi-star</VIcon>我收藏的
      </VTab>
      <VTab to="/user/authorgroup/maintain">
        <VIcon left>mdi-pencil</VIcon>我维护的
      </VTab>
    </VTabs>
    <RouterView></RouterView>
  </div>
</template>
