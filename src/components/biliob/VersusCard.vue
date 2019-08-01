<template>
  <div>
    <BiliobDarkInfo border="bottom"
      ><div class="px-5 py-2">榜首粉丝争夺</div></BiliobDarkInfo
    >
    <div class="versus-card">
      <VImg
        :src="aFace"
        :lazy-src="aFace"
        style="position:absolute"
        height="100px"
        width="50%"
        gradient="to  right, rgba(255,255,255,.33), rgba(255,255,255,1)"
      ></VImg>
      <div class="left-info">
        <BiliobDarkInfo
          style="display: inline-block;"
          class="caption white--text dark-info-left"
        >
          <div class="px-2 my-1">
            {{ aOfficial }}
          </div>
        </BiliobDarkInfo>
        <br />
        <BiliobDarkInfo
          border="left"
          style="display: inline-block;"
          class="dark-info-left font-weight-black subtitle"
        >
          <div class="px-2">
            {{ aName }}
          </div>
        </BiliobDarkInfo>
      </div>
      <div class="right-info">
        <BiliobDarkInfo
          border="right"
          style="display: inline-block;"
          class="dark-info-right font-weight-black subtitle"
        >
          <div class="px-2 my-1">
            {{ bName }}
          </div>
        </BiliobDarkInfo>
        <br />
        <BiliobDarkInfo
          style="display: inline-block;"
          class="caption white--text dark-info-right"
        >
          <div class="px-2">
            {{ bOfficial }}
          </div>
        </BiliobDarkInfo>
      </div>

      <VImg
        style="position:absolute;right:0px"
        height="100px"
        width="50%"
        gradient="to left, rgba(255,255,255,.33), rgba(255,255,255,1)"
        :src="bFace"
        :lazy-src="bFace"
      ></VImg>

      <div
        class="center-versus display-2 font-weight-black"
        style="text-shadow: 4px 2px 1px #1E88E5;"
      >
        <div>VS</div>
        <div>
          <VOdometer
            style="text-shadow: 2px 1px 1px #1E88E5"
            class="display-1"
            :value="deltaFans"
          ></VOdometer>
        </div>
      </div>
      <div style="height:100px"></div>
      <!-- <BiliobCard :title="title">
      <div style="height: 100px"></div>
    </BiliobCard> -->
    </div>
  </div>
</template>
<script>
import VOdometer from "@/components/common/VOdometer.vue";
export default {
  components: { VOdometer },
  data() {
    return {
      frequently: Boolean(),
      aMid: Number(),
      bMid: Number(),
      aTitle: String(),
      bTitle: String(),
      title: String(),
      aOfficial: String(),
      aName: String(),
      aFans: Number(),
      aFace: String(),
      bOfficial: String(),
      bName: String(),
      bFans: Number(),
      bFace: String()
    };
  },
  computed: {
    deltaFans() {
      if (this.aFans !== 0 && this.bFans !== 0) {
        return this.aFans - this.bFans;
      } else {
        return 0;
      }
    }
  },
  watch: {
    aMid() {
      this.refresh();
      const timer = setInterval(this.refresh, 10000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  },
  mounted() {
    this.axios.get("/author?page=0&pageSize=3&sort=0").then(r => {
      this.aMid = r.data.content[0].mid;
      this.bMid = r.data.content[1].mid;
    });
  },
  methods: {
    refresh() {
      if (this.aMid != 0) {
        this.axios.get(`/author/${this.aMid}/info`).then(response => {
          this.aName = response.data.name;
          this.aOfficial = response.data.official;
          this.aFans = response.data.cFans;
          this.aFace = response.data.face;
        });
      }
      if (this.bMid != 0) {
        this.axios.get(`/author/${this.bMid}/info`).then(response => {
          this.bName = response.data.name;
          this.bOfficial = response.data.official;
          this.bFans = response.data.cFans;
          this.bFace = response.data.face;
        });
      }
    },
    jumpToAuthorPage(mid) {
      this.$router.push(`/author/${mid}`);
    },
    toAuthorVersus() {
      if (this.aMid != 0 && this.bMid != 0)
        this.$router.push(
          `/author/versus?aMid=${this.aMid}&bMid=${this.bMid}&freq=${
            this.frequently
          }`
        );
    }
  }
};
</script>
<style lang="scss">
.left-info {
  z-index: 1;
  //   align-self: flex-end;
}
.right-info {
  z-index: 1;
  position: absolute;
  text-align: end;
  right: 0;
}

.versus-card {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.center-versus {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  text-align: center;
  margin: auto;
}
</style>
