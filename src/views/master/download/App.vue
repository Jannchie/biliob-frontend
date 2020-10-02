<template>
  <VContainer>
    <VRow dense>
      <VCol>
        <VCard>
          <VCardTitle><h3>安卓用户</h3> </VCardTitle>
          <VCardText>
            <h4>方式1：下载APK</h4>
            <VBtn
              dark
              href="/BiliOB-android.apk"
            >
              <VIcon left>
                mdi-android-head
              </VIcon>
              点此下载BiliOB
            </VBtn>
            <br>
            <br>
            <h4>方式2：使用PWA技术</h4>
            首先，<b>确认浏览器拥有添加应用到主屏幕的权限</b>。
            <br>
            然后，在手机中使用Chrome \ Edge \ UC 等浏览器打开该网站，
            并将网站添加到主屏幕，即可获得APP。
            <br>推荐使用这种方式，无需下载，且体验优于APK。
          </VCardText>

          <VDivider />
          <VCardTitle><h3>苹果用户</h3> </VCardTitle>
          <VCardText>
            <h4>使用PWA技术</h4>
            使用Safari(苹果自带浏览器)打开该网站；<br>
            点击地址栏右侧的"分享"按钮；<br>
            在弹出的菜单中点击添加到主屏幕按钮；<br>
            点击菜单右上角的添加按钮，即可获得APP。<br>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
