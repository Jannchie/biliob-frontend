<template>
  <div>
      <VBtn v-if="!focus" :disabled="disabled" depressed color="primary" @click.stop="addFocus"><VIcon>mdi-plus</VIcon><span>&nbsp;未关注</span></VBtn>
      <VBtn v-if="focus" :disabled="disabled" depressed @click.stop="removeFocus"><VIcon>mdi-star</VIcon>&nbsp;已关注</VBtn>
    <VTooltip v-model="show" bottom>
      <div slot="activator"></div>
      <span>{{text}}</span>
    </VTooltip>

  </div>
</template>
<script>
export default {
  props: { authorData: Object() },
  data() {
    return {
      focus: Boolean(),
      text: String(),
      show: false,
      disabled: false
    };
  },
  mounted() {
    var favoriteAuthor = this.$store.getters.getFavoriteAuthor;
    this.authorData.mid;
    if (favoriteAuthor.indexOf(this.authorData.mid) != -1) {
      this.focus = true;
    } else {
      this.focus = false;
    }
  },
  methods: {
    addFocus() {
      this.axios
        .post(`/user/author`, Number(this.authorData.mid))
        .then(response => {
          this.disabled = true;
          this.show = true;
          this.text = response.data.msg;
          setTimeout(() => {
            this.disabled = false;
            this.show = false;
          }, 2000);
          this.focus = !this.focus;
        })
        .catch(error => {
          this.disabled = true;
          this.show = true;
          this.text = error.response.data.msg;
          setTimeout(() => {
            this.disabled = false;
            this.show = false;
          }, 2000);
          this.focus = !this.focus;
        });
    },
    removeFocus() {
      this.axios
        .delete(`/user/author/${this.authorData.mid}`)
        .then(response => {
          this.show = true;
          this.text = response.data.msg;
          setTimeout(() => {
            this.show = false;
          }, 2000);
          this.focus = !this.focus;
        })
        .catch(error => {
          this.show = true;
          this.text = error.response.data.msg;
          setTimeout(() => {
            this.show = false;
          }, 2000);
          this.focus = !this.focus;
        });
    }
  }
};
</script>
