<template>
  <VCard >
    <VCardText>
    <div style="display:flex">
              <img class="author-face" :src="authorData.face"  ripple @click.stop="toAuthor">
      <div>
      <div>
        <span>{{authorData.name}}</span>
        <LevelIcon :level="authorData.level"></LevelIcon>
        <SexIcon :sex="authorData.sex"></SexIcon>
        <br>
        <span>粉丝数:{{fans}}</span>
        <br>
        <span>{{authorData.official}}</span>
      </div>
      <FocusBtn v-if="$store.getters.getLoginState" :author-data="authorData" class="focus-btn"></FocusBtn>
      </div>
    </div>
    </VCardText>
  </VCard>
</template>
<script>
import FocusBtn from "../common/FocusBtn.vue";
import SexIcon from "../common/SexIcon.vue";
import LevelIcon from "../common/LevelIcon.vue";
export default {
  components: {
    SexIcon,
    LevelIcon,
    FocusBtn
  },
  props: {
    authorData: Object()
  },
  data() {
    return {
      fans: null,
      focus: false,
      mid: Number()
    };
  },
  watch: {
    authorData: function(val) {
      this.authorData = val;
      this.authorData.face = this.authorData.face.slice(5);
      this.fans = val.data.data[0].fans;
    }
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
.focus-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
