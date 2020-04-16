<template>
  <BiliobCard width="100%">
    <div class="d-flex flex-row">
      <FocusBtn
        v-if="$store.getters.getLoginState"
        :author-data="authorData"
        class="focus-btn"
      />
      <VAvatar size="70" @click.stop="toAuthor()">
        <img height="40px" width="40px" :src="zipPic(authorData.face)" />
      </VAvatar>
      <div class="ml-2">
        <h4 class="subtitle-1 grey--text font-weight-bold ">
          <span>
            {{ authorData.name }}
          </span>
          <LevelIcon
            style="vertical-align: text-bottom;"
            :level="authorData.level"
          />
          <SexIcon style="vertical-align: text-bottom;" :sex="authorData.sex" />
        </h4>
        <h6 class="caption text--grey">粉丝数:{{ authorData.cFans }}</h6>
        <div>
          {{ authorData.official }}
        </div>
      </div>
    </div>
  </BiliobCard>
</template>
<script>
import FocusBtn from "@/components/common/FocusBtn.vue";
import SexIcon from "@/components/common/SexIcon.vue";
import LevelIcon from "@/components/common/LevelIcon.vue";
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
/* .author-face {
  height: 62px;
  border-radius: 30px;
  margin-right: 20px;
} */
.focus-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

/* .v-card {
  margin-bottom: 20px;
} */
</style>
