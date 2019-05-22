<template>
  <VContainer
    style="padding: 0px 0px;"
    grid-list-md
    justify-center
  >
    <VLayout justify-center>
      <VFlex
        lg8
        md12
      >
        <VSlideYTransition mode="out-in">
          <RouterView />
        </VSlideYTransition>
      </VFlex>
    </VLayout>
  </VContainer>
</template>
