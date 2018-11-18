<template>
  <v-timeline dense>
    <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">项目启动</v-card-title>
        <v-card-title class="title">2018-08-03</v-card-title>
        <v-card-text>
            初始化了前后端工程，标志着该项目正式启动。
        </v-card-text>
      </v-card>
    </v-timeline-item>
        <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">实现UP主以及视频数据的浏览</v-card-title>
        <v-card-title class="title">2018-10-18</v-card-title>
        <v-card-text>
            实现了该网站最最基本的两大功能，现在这已经是一个可以勉强一用的网站了。
        </v-card-text>
      </v-card>
    </v-timeline-item>
     <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">基本数据可视化</v-card-title>
        <v-card-title class="title">2018-10-23</v-card-title>
        <v-card-text>
            加入了最基本的几张图表的可视化。
        </v-card-text>
      </v-card>
    </v-timeline-item>
         <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">使用Vuetify</v-card-title>
        <v-card-title class="title">2018-10-26</v-card-title>
        <v-card-text>
            使用Vuetify完全地重构了前端的代码。现在能够更加合理地在手机端和电脑端无差别使用。
        </v-card-text>
      </v-card>
    </v-timeline-item>
             <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">完成注册功能</v-card-title>
        <v-card-text class="title">2018-10-28</v-card-text>
        <v-card-text>
            现在已经能够注册并进行基本的操作了！
        </v-card-text>
      </v-card>
    </v-timeline-item>

                 <v-timeline-item :key="n" color="red lighten-2" large>
      <v-card class="elevation-2">
        <v-card-title class="headline">添加favorite</v-card-title>
        <v-card-text class="title">2018-11-10</v-card-text>
        <v-card-text>
            现在能够添加喜欢的UP主和视频了！
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
