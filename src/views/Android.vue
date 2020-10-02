<template>
  <MainLayout>
    <div slot="main-cards">
      <VCard>
        <VCardTitle>
          <img
            style="margin: 0 auto"
            src="../../public/img/biliob_qr.png"
          >
        </VCardTitle>
        <VCardText
          class="font-weight-black  primary--text caption"
          style="text-align:center"
        >
          打开手机，扫描上方二维码即可下载安卓端BILIOB观测者APP~
        </VCardText>
        <VCardText>
          <VBtn
            href="https://www.bslyun.com/tby4hpO8tLTI2MjY3OC0tMA%3D"
            block
            outlined
            style="border-width:1px"
            class="font-weight-black  primary--text title"
          >
            手机端网站点我跳转到下载链接
          </VBtn>
        </VCardText>
      </VCard>
    </div>
    <div slot="aside-cards">
      <OtherLink />
    </div>
  </MainLayout>
</template>
<script>
import MainLayout from "../components/common/MainLayout.vue";
import OtherLink from "../components/aside/OtherLink.vue";

export default {
  components: { MainLayout, OtherLink },
  data() {
    return {};
  }
};
</script>
