<template>
  <v-card>
    <div>
      <div style="display:flex">
        <div>
          <img class="video-img" style="vertical-align: bottom" :src="pic" />
        </div>
        <v-card-text style="width:55%">
          <div class="font-weight-bold video-title">
            {{title}}
          </div>
          <br>
          aid:{{ $route.params.aid }}
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      'name': {}
    }
  },
  props: ['title', 'pic']
}

</script>

<style scoped>
  .video-img {
    height: 96px;
    border-radius: 4px;
  }

  .v-card {
    height: 96px;
    padding: 0px
  }

  .video-title {
    max-width: 50vmin;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
