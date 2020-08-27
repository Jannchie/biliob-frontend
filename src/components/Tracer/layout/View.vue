<template>
  <VMain>
    <div id="core-view">
      <VFadeTransition mode="out-in">
        <RouterView />
      </VFadeTransition>
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
