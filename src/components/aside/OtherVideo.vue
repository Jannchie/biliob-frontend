<template>
  <v-card class="aside-card">
    <v-card-title style="padding-bottom:0px" column fill-height>
      <h4>UP主其他已追踪视频</h4>
    </v-card-title>
    <v-card-text  class="video-list" column>
    </v-card-text>
      <v-list  two-line>
        <template v-for="eachVideo in otherVideo">
          <v-divider :key="eachVideo.title"></v-divider>
          <v-list-tile style="width: 100%" :to="'/author/'+eachVideo.mid+'/video/'+eachVideo.aid" :key="eachVideo.aid" ripple>
            <v-list-tile-content>
              <v-list-tile-title>
                {{eachVideo.title}}
              </v-list-tile-title>
              <v-list-tile-sub-title class="caption subtext">分区：{{eachVideo.channel}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      otherVideo: []
    }
  },
  mounted () {
    this.axios.get(`${this.apiurl}/author/${this.$route.params.mid}/video/${this.$route.params.aid}`).then((
      response) => {
      this.otherVideo = response.data.content
    })
  },
  watch: {
    '$route.params.aid': function () {
      this.axios.get(`${this.apiurl}/author/${this.$route.params.mid}/video/${this.$route.params.aid}`).then((
        response) => {
        this.otherVideo = response.data.content
      })
    }
  },
  methods: {
    c () {
      return 0
    }
  }
}

</script>
<style>
  .link {
    color: slategray;
    text-decoration: none;

  }

  .link:hover {
    color: rgb(62, 123, 184)
  }

  .aside-card {
    margin-top: 5px
  }

  .video-list{
    padding-bottom: 0px;
    padding-top: 0px
  }

  .subtext {
    color: #444444
  }

</style>
