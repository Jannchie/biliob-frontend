<template>
  <div>
      <VBtn v-if="!focus" color="grey lighten-1" flat icon depressed @click.stop="addFocus"><VIcon>mdi-heart</VIcon><span></span></VBtn>
      <VBtn v-if="focus" color="red lighten-1" flat icon depressed @click.stop="removeFocus"><VIcon>mdi-heart</VIcon></VBtn>
  </div>
</template>
<script>
export default {
  props: { authorData: Object() },
  data() {
    return {
      focus: Boolean(),
      show: false
    };
  },
  watch: {
    authorData() {
      var favoriteAuthor = this.$store.getters.getFavoriteAuthor;
      if (favoriteAuthor.indexOf(this.authorData.mid) != -1) {
        this.focus = true;
      } else {
        this.focus = false;
      }
    }
  },
  methods: {
    addFocus() {
      this.axios
        .post(`/user/author`, Number(this.authorData.mid))
        .then(() => {
          this.show = true;
          this.$store.commit("addFavoriteAuthor", this.authorData.mid);
          this.focus = !this.focus;
        })
        .catch(() => {
          this.show = true;
          this.focus = !this.focus;
        });
    },
    removeFocus() {
      this.axios
        .delete(`/user/author/${this.authorData.mid}`)
        .then(() => {
          this.show = true;
          this.$store.commit("removeFavoriteAuthor", this.authorData.mid);
          this.focus = !this.focus;
        })
        .catch(() => {
          this.show = true;
          this.focus = !this.focus;
        });
    }
  }
};
</script>
