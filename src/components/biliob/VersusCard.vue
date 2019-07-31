<template>
  <div class="versus-card">
    <VAvatar style="position:absolute;margin-left:80px" size="100px">
      <VImg
        src="//i2.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg"
        lazy-src="//i2.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg"
      ></VImg>
    </VAvatar>
    <div class="left-info">
      <BiliobDarkInfo
        style="display: inline-block;"
        class="caption white--text dark-info-left"
      >
        <div class="px-2 mb-1">
          B站签约UP主
        </div>
      </BiliobDarkInfo>
      <br />
      <BiliobDarkInfo
        border="left"
        style="display: inline-block;"
        class="dark-info-left font-weight-black subtitle"
      >
        <div class="px-2">
          Jannchie见齐
        </div>
      </BiliobDarkInfo>
    </div>

    <div class="right-info">
      <BiliobDarkInfo
        border="right"
        style="display: inline-block;"
        class="dark-info-right font-weight-black subtitle"
      >
        <div class="px-2 mb-1">
          Jannchie见齐
        </div>
      </BiliobDarkInfo>
      <br />
      <BiliobDarkInfo
        style="display: inline-block;"
        class="caption white--text dark-info-right"
      >
        <div class="px-2">
          B站签约UP主
        </div>
      </BiliobDarkInfo>
    </div>
    <VAvatar style="position:absolute;right:0;margin-right:80px" size="100px">
      <VImg
        src="//i2.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg"
        lazy-src="//i2.hdslb.com/bfs/face/983034448f81f45f05956d0455a86fe0639d6a36.jpg"
      ></VImg>
    </VAvatar>
    <div
      class="center-versus display-3 font-weight-black"
      style="text-shadow: 4px 2px 1px #1E88E5"
    >
      <div>VS</div>
    </div>
    <div style="height:100px"></div>
    <!-- <BiliobCard :title="title">
      <div style="height: 100px"></div>
    </BiliobCard> -->
  </div>
</template>
<script>
export default {
  props: { title: { default: "粉丝对比简介", type: String } }
};
</script>
<style lang="scss">
.left-info {
  z-index: 1;
  align-self: flex-end;
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
