<template>
  <VDialog
    persistent
    :value="true"
    :width="$vuetify.breakpoint.lgAndDown ? `100%`: `1000px`"
  >
    <VCard>
      <VCardTitle>END</VCardTitle>
      <VCardText>
        <p class="mb-1">
          非常感谢各位观测者使用这个网站。从2018年8月3日到2020年11月10日，我凭一己之力已经维护了两年多。
        </p>
        <p class="mb-1">
          观测站的注册观测者达2万人，月活20万，最多同时在线人数超过1000人。服务器也曾宕机数次，有时也会宕机数天，但是最近增多了服务器开支，小站越发稳定了。
        </p>
        <p class="mb-1">
          遗憾的是截至目前未曾盈利，收到捐款8949.74元，净亏损服务器维护费9087.28元。
        </p>
        <VDivider />
        <p class="mb-1">
          观测站曾经提供了不少有用的服务。在这里观测者们能够观测大部分知名UP主的历史数据，能够聚合B站的各大关键词提供指数查询，能够判断视频是否被限流，能够欣赏涨掉粉榜，喝最棒的彩，吃最香的瓜。
        </p>
        <p class="mb-1">
          很多我喜欢的UP主，比如毕导、Lks都使用过我的网站，感谢你们的宣传，令我不胜荣幸。
        </p>
        <p class="mb-1">
          今天收到了<a
            download
            target="_blank"
            href="/docs/Gmail - 【哔哩哔哩侵权告知函】关于立即停止搜集哔哩哔哩数据的函-BiliOB观测者-20201110.pdf"
          >哔哩哔哩侵权告知函</a>。老实说已有心里准备——爬虫项目本就游走在法律的边缘，如果B站想要小站关闭，那我这里确实应该无条件关站。
        </p>
        <p class="mb-1">
          我会暂时保留除了数据之外的接口，大家的账号并不会被注销。你仍然可以登录、签到、甚至发布观测纪录，尽管这里已经不再有什么好观测的了。
        </p>
        <p class="mb-1">
          与此同时，大部分数据访问的接口都会被我关闭。在网络上，他们会同未曾存在过一般。源代码是公开的，在我的github中可以找到，有心人是可以做一个完美复刻版的，但那就与我无关了。
        </p>
        <p class="mb-1">
          虽然观测站停止展示数据，但我的毕生所学并未就此消逝。欢迎咨询或者商务合作：jannchie@gmail.com
        </p>
        <VBtn
          dark
          text
          class="pink lighten-3 mr-2"
          href="https://space.bilibili.com/1850091"
        >
          前往见齐的B站空间
        </VBtn>
        <VBtn
          dark
          class="black mr-2"
          href="https://github.com/Jannchie"
          text
        >
          前往见齐的GitHub主页
        </VBtn>
        <VBtn
          dark
          text
          class="mr-2 primary"
          href="https://jq.qq.com/?_wv=1027&k=593vDCo"
        >
          加入粉丝群
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script>
export default {};
</script>

<style>
</style>