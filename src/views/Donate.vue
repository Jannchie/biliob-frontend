<template>
  <div style="text-align: center;margin: 0px 10px">
    <h2 class="donate-title">
      援助<VIcon size="2.25rem" color="white" right left>mdi-coin</VIcon>捐赠
    </h2>
    <h3 class="donate-sub-title">
      ① 观看我的<VIcon size="1.5625rem !important" color="white" right left
        >mdi-video</VIcon
      >并素质三连
    </h3>
    <p>
      每一个创作者都希望自己的作品能被更多人欣赏。因此对于我而言，最大的援助就是看一看我的视频了。如果能从我的视频中获取一些感动、知识、或是其他我个人用言语无法描述的感触，那就再好不过了。
    </p>
    <p>
      如果方便的话，请收藏、投币、以及点赞，这样或许该视频就能推送给更多的人看到。诸位提供的播放量会使我产生金钱方面的收益——由B站提供。此外，播放量的增长能够证明我的潜在商业价值，这些是比起直接捐款更为宝贵的东西。
    </p>
    <VBtn color="blue" href="https://space.bilibili.com/1850091" dark>
      <VIcon left>mdi-home</VIcon>立即前往Jannchie见齐的个人空间</VBtn
    >
    <h3 class="donate-sub-title">
      ② 给我续一杯<VIcon size="1.5625rem !important" color="white" right
        >mdi-coffee</VIcon
      >
    </h3>
    <p>
      但你能给我提供一点零钱享用咖啡——有时候一杯咖啡能够激发灵感，甚至可以提供瞬间消除代码BUG的BUFF。
    </p>
    <p>
      注意，您所提供的宝贵资金<span style="color: red;font-weight:bold"
        >很可能不会</span
      >用来添置服务器——老实说，我并没有乐观到可以通过捐赠获得稳定的资金。服务器资源是个深坑，维持它需要一定的魄力。
    </p>
    <p>
      支付宝账号：17863137819
    </p>
    <VImg>
      <div
        class="hidden-lg-and-down"
        style="position: absolute;width:100%;height:100%;"
      >
        <div class="pa-2 title white--text" style="margin-top: 120px;">
          已收到转账
        </div>
        <div class="pa-2 display-1 white--text">0 RMB</div>
        <div class="pa-2 title white--text">转账人次</div>
        <div class="pa-2 display-1 white--text">0 人</div>
        <div class="pa-2 caption white--text">
          目前数据并非实时更新，可能会延后数日进行登记
        </div>
      </div>
      <img width="100%" src="../../public/img/donate.png" />
    </VImg>
    <p></p>
    <h3 class="donate-sub-title">
      ③
      <VIcon size="1.5625rem !important" color="white" left right
        >mdi-server</VIcon
      >滞销，帮帮他们
    </h3>
    <p>
      服务器是个好东西。可以用来搭建网站、博客、或是跑各种各样的服务。如果你是学生的话，购买服务器的价格低到令人发指，如果有兴趣的话请务必玩玩看。
    </p>
    <p>
      如果你有购买服务器的想法，欢迎下面的链接购买，通过这些链接成交的购买算作是我推广的。我会因此获取一定的佣金。
    </p>
    <VBtn
      color="blue"
      target="_blank"
      dark
      href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=z82eczgc"
    >
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-weather-cloudy </VIcon
      >服务器提供商 阿里云
    </VBtn>
    <VBtn
      color="blue"
      target="_blank"
      dark
      href="https://cloud.tencent.com/redirect.php?redirect=1005&cps_key=7db3d9f0ef080a24be84d44938108742&from=console"
    >
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-weather-cloudy </VIcon
      >服务器提供商 腾讯云
    </VBtn>
    <VBtn
      color="blue"
      href="https://www.vultr.com/?ref=7540103"
      target="_blank"
      dark
    >
      <VIcon style="vertical-align: middle;margin-right:5px">
        mdi-weather-cloudy </VIcon
      >服务器提供商 Vultr
    </VBtn>
  </div>
</template>
<style>
.donate-title {
  border-color: #29e;
  border-width: 5px;
  border-bottom-style: solid;
  padding: 8px 5px;
  color: white;
  background-color: #333;
}
.donate-sub-title {
  padding: 8px 5px;
  color: white;
  background: linear-gradient(60deg, #29e, rgb(16, 97, 163));
}
</style>
