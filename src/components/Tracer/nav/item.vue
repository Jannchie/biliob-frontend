<template>
  <div class="mx-3">
    <VBtn
      flat
      large
      block
      :to="`/tracer/${path}`"
    >
      <VListTileAvatar>
        <VIcon left>{{icon}}</VIcon>
      </VListTileAvatar>
      <VListTileContent>
        {{name}}
      </VListTileContent>
    </VBtn>
  </div>
</template>
<script>
export default {
  props: { name: String(), icon: String(), path: String() }
};
</script>
