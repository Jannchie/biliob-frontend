<template>
    <div>
        <VTabs fixed-tabs icons-and-text centered dark>
            <VTab :key="1">
                涨粉
                <VIcon>mdi-heart</VIcon>
            </VTab>
            <VTab :key="2">
                掉粉
                <VIcon>mdi-heart-off</VIcon>
            </VTab>
            <VTab :key="3">
                番剧
                <VIcon>mdi-video-vintage</VIcon>
            </VTab>
            <VTab :key="4">
                国创
                <VIcon>mdi-rabbit</VIcon>
            </VTab>

            <VTabItem :key="1">
                <VCard v-for="(eachAuthor,index) in fansIncrease" :key="eachAuthor.mid" flat :to="'/author/'+eachAuthor.mid">
                    <VCardText>
                        <div class="item-info">
                            <h2 style="width:50px;" class="text-center">{{ index+1 }}</h2>
                            <img style="border-radius:25px;width:50px;height:50px;margin:0 20px" :src="eachAuthor.face.slice(5)" />
                            <div style="flex-basis:100%">
                                {{eachAuthor.name}}
                            </div>
                            <VChip label color="red" text-color="white">
                                <VIcon>mdi-menu-up</VIcon>{{eachAuthor.cRate}}
                            </VChip>
                        </div>
                    </VCardText>
                </VCard>
            </VTabItem>


            <VTabItem :key="2">
                <VCard v-for="(eachAuthor,index) in fansDecrease" :key="eachAuthor.mid" flat :to="'/author/'+eachAuthor.mid">
                    <VCardText>
                        <div class="item-info">
                            <h2 style="width:50px;" class="text-center">{{ index+1 }}</h2>
                            <img style="border-radius:25px;width:50px;height:50px;margin:0 20px" :src="eachAuthor.face.slice(5)" />
                            <div style="flex-basis:100%">
                                {{eachAuthor.name}}
                            </div>
                            <VChip label color="green" text-color="white">
                                <VIcon>mdi-menu-down</VIcon>{{-eachAuthor.cRate}}
                            </VChip>
                        </div>
                    </VCardText>
                </VCard>
            </VTabItem>

            <VTabItem :key="3">
                <VCard v-for="(eachBangumi,index) in bangumiData" :key="eachBangumi.mid" flat>
                    <VCardText>
                        <div class="item-info">
                            <h2 style="width:50px;" class="text-center">{{ index+1 }}</h2>
                            <img style="border-radius:3px;width:50px;height:50px;margin:0 8px" :src="eachBangumi.squareCover" />
                            <div style="flex-basis:80%;font-size:14px">
                                <b>
                                    {{eachBangumi.title}}
                                </b>
                                <br>
                                <VChip v-for="eachTag in eachBangumi.tag" :key="eachTag" small class="hidden-lg-and-down">{{eachTag}}</VChip>
                            </div>
                            <div style="text-align:center;font-size:12px;width:60px">
                                <h3 style="font-size:14px">{{eachBangumi.currentPts}}</h3>
                                综合得分
                            </div>
                        </div>
                    </VCardText>
                </VCard>
            </VTabItem>

            <VTabItem :key="4">
                <VCard v-for="(eachDonghua,index) in donghuaData" :key="eachDonghua.mid" flat>
                    <VCardText>
                        <div class="item-info">
                            <h2 style="width:50px;" class="text-center">{{ index+1 }}</h2>
                            <img style="border-radius:3px;width:50px;height:50px;margin:0 8px" :src="eachDonghua.squareCover" />
                            <div style="flex-basis:80%;font-size:14px">
                                <b>
                                    {{eachDonghua.title}}
                                </b>
                                <br>
                                <VChip v-for="eachTag in eachDonghua.tag" :key="eachTag" small class="hidden-lg-and-down">{{eachTag}}</VChip>
                            </div>
                            <div style="text-align:center;font-size:12px;width:60px">
                                <h3 style="font-size:14px">{{eachDonghua.currentPts}}</h3>
                                综合得分
                            </div>
                        </div>
                    </VCardText>
                </VCard>
            </VTabItem>
        </VTabs>
    </div>
</template>
<script>
export default {
  data() {
    return {
      bangumiData: Object(),
      fansIncrease: Object(),
      fansDecrease: Object(),
      donghuaData: Object()
    };
  },
  mounted() {
    this.axios.get("/bangumi").then(response => {
      this.bangumiData = response.data.content;
      this.bangumiData.forEach(element => {
        element.squareCover = element.squareCover.slice(5);
      });
    });
    this.axios.get("/donghua").then(response => {
      this.donghuaData = response.data.content;
      this.donghuaData.forEach(element => {
        element.squareCover = element.squareCover.slice(5);
      });
    });
    this.axios.get("/rank/fans-increase-rate").then(response => {
      this.fansIncrease = response.data.content;
    });
    this.axios.get("/rank/fans-decrease-rate").then(response => {
      this.fansDecrease = response.data.content;
    });
  }
};
</script>

<style>
.item-cards {
  margin: 10px 2px;
  height: 90px;
  border-radius: 5px;
}

.item-title {
  max-width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-info {
  display: flex;
  align-items: center;
}
</style>
