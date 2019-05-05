<template>
  <MaterialCard>
    <VAvatar
      slot="offset"
      class="mx-auto d-block"
      size="80"
    >
      <img :src="authorData.face">
    </VAvatar>
    <FocusBtn
      v-if="$store.getters.getLoginState"
      :author-data="authorData"
      class="focus-btn"
    />
    <div class="text-xs-center">
      <h4 class="card-title font-weight-light">{{ authorData.name }}
        <LevelIcon :level="authorData.level" />
        <SexIcon :sex="authorData.sex" />
      </h4>
      <h6 class="category text-gray font-weight-thin mb-3">粉丝数:{{ authorData.cFans }}</h6>
      <p class="card-description font-weight-light">{{ authorData.official}}</p>
    </div>
  </MaterialCard>
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
      this.fans = val.cFans;
    }
  },
  methods: {
    toAuthor() {
      this.$router.push(`/author/${this.authorData.mid}`);
    }
  }
};
</script>

<style scoped>
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

.v-card {
  margin-bottom: 20px;
}
</style>
