<template>
  <VCard >
    <VCardText>
    <div style="display:flex">
      <img class="author-face" :src="authorData.face"  ripple @click.stop="toAuthor">
      <div>
        <span>{{authorData.name}}</span>
        <LevelIcon :level="authorData.level"></LevelIcon>
        <SexIcon :sex="authorData.sex"></SexIcon>
        <br>
        <span>粉丝数:{{fans}}</span>
        <br>
        <span>{{authorData.official}}</span>
      </div>
    </div>
    </VCardText>
  </VCard>
</template>
<script>
import SexIcon from "../common/SexIcon.vue";
import LevelIcon from "../common/LevelIcon.vue";
export default {
  components: {
    SexIcon,
    LevelIcon
  },
  data() {
    return {
      authorData: {},
      fans: null
    };
  },
  mounted() {
    this.axios.get("/author/" + this.$route.params.mid).then(response => {
      this.authorData = response.data;
      this.authorData.face = this.authorData.face.slice(5);
      this.fans = response.data.data[0].fans;
    });
  },
  methods: {
    toAuthor() {
      this.$router.push(`/author/${this.authorData.mid}`);
    }
  }
};
</script>

<style>
.author-face {
  height: 62px;
  border-radius: 30px;
  margin-right: 20px;
}
</style>
