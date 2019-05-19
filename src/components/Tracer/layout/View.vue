<template>
  <VContent>
    <div id="core-view">
      <VContainer grid-list-lg>
        <VFadeTransition mode="out-in">
          <RouterView />
        </VFadeTransition>
      </VContainer>
    </div>
    <TracerLayoutFooter />
  </VContent>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "Vuetify Material Dashboard by CreativeTim"
    };
  }
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
