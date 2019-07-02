<template>
  <VContainer style="padding: 0px 0px;" grid-list-lg justify-center>
    <VLayout justify-center>
      <VFlex xl8 lg10 md12>
        <VSlideYTransition mode="out-in">
          <RouterView />
        </VSlideYTransition>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
