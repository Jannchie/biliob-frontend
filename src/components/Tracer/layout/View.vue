<template>
  <VContent>
    <div id="core-view">
      <VFadeTransition mode="out-in">
        <RouterView />
      </VFadeTransition>
    </div>
    <TracerLayoutFooter />
  </VContent>
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
