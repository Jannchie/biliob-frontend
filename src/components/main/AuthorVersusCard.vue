<template>
  <div style="display: flex;margin-bottom:5px; flex-wrap: wrap">
    <VCard class="versus-card">
      <div style="display: flex">
        <VCardText style="display: flex; flex-direction:row-reverse">
          <VAvatar style="margin-left: 10px">
            <img :src="aFace">
          </VAvatar>
          <div style="text-align:end">
            <div>
              {{aName}}
            </div>
            <div class="caption hidden-md-and-down">{{aOfficial}}</div>
          </div>
        </VCardText>
        <div class="center-info">
          <div class="caption font-weight-black">粉丝数榜首争夺</div>
          <div class="title font-weight-black red--text text--darken-2">
            VS
          </div>
          <div class="caption">
            △{{aFans-bFans}}
          </div>
        </div>
        <VCardText style="display: flex;">
          <VAvatar style="margin-right: 10px">
            <img :src="bFace">
          </VAvatar>
          <div>
            <div>
              {{bName}}
            </div>
            <div class="caption hidden-md-and-down">{{bOfficial}}</div>
          </div>
        </VCardText>
      </div>
    </VCard>
  </div>
</template>
<script>
export default {
  props: {
    aMid: Number(),
    bMid: Number()
  },
  data() {
    return {
      aOfficial: String(),
      aName: String(),
      aFans: Number(),
      aFace: Number(),
      bOfficial: String(),
      bName: String(),
      bFans: Number(),
      bFace: Number()
    };
  },
  mounted() {
    this.axios.get(`/author/${this.aMid}/info`).then(response => {
      this.aName = response.data.name;
      this.aOfficial = response.data.official;
      this.aFans = response.data.cFans;
      this.aFace = response.data.face;
    });
    this.axios.get(`/author/${this.bMid}/info`).then(response => {
      this.bName = response.data.name;
      this.bOfficial = response.data.official;
      this.bFans = response.data.cFans;
      this.bFace = response.data.face;
    });
  }
};
</script>

<style scoped>
.versus-card {
  width: 100%;
}
.center-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0 5px;
}
</style>
