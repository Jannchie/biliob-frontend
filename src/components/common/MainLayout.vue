<template>
  <v-container grid-list-md>
    <v-layout v-bind="binding">
      <v-flex lg8 md12>
        <slot name="main-cards"></slot>
      </v-flex>
      <v-flex lg4 md12>
        <slot name="aside-cards"></slot>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndDown) binding.column = true
      return binding
    }
  }}

</script>
<style scoped>
.container{
  padding: 0px
}
</style>
