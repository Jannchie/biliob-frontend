<template>
  <VMain>
    <div id="core-view">
      <VSlideYTransition mode="out-in">
        <RouterView />
      </VSlideYTransition>
    </div>
    <TracerLayoutFooter />
  </VMain>
</template>

<script>
export default {
  metaInfo() {
    return {
      //   title: "Vuetify Material Dashboard by CreativeTim"
    };
  }
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
