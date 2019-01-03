<template>
  <div>
    <VBtn v-if="!focus" small icon depressed color="grey lighten-1" flat @click.stop="addFocus">
      <VIcon>mdi-star-outline</VIcon>
    </VBtn>
    <VBtn v-if="focus" small icon depressed color="orange darken-2" flat @click.stop="removeFocus">
      <VIcon>mdi-star</VIcon>
    </VBtn>
  </div>
</template>
<script>
export default {
  props: {
    aid: Object()
  },
  data() {
    return {
      focus: Boolean(),
      text: String()
    };
  },
  watch: {
    aid() {
      var favoriteVideo = this.$store.getters.getFavoriteVideo;
      if (favoriteVideo.indexOf(this.aid) != -1) {
        this.focus = true;
      } else {
        this.focus = false;
      }
    }
  },
  methods: {
    addFocus() {
      this.axios
        .post(`/user/video`, Number(this.aid))
        .then(response => {
          this.text = response.data.msg;
          this.$store.commit("addFavoriteVideo", this.aid);
          this.focus = !this.focus;
        })
        .catch(error => {
          this.text = error.response.data.msg;
          this.focus = !this.focus;
        });
    },
    removeFocus() {
      this.axios
        .delete(`/user/video/${this.aid}`)
        .then(response => {
          this.text = response.data.msg;
          this.$store.commit("removeFavoriteVideo", this.aid);
          this.focus = !this.focus;
        })
        .catch(error => {
          this.text = error.response.data.msg;
          this.focus = !this.focus;
        });
    }
  }
};
</script>
