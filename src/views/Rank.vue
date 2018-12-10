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
                <VCard v-for="(eachAuthor,index) in fansIncrease" :key="eachAuthor.mid" flat :to="'/author/'+eachAuthor.mid" >
                    <VCardText>
                        <div class="item-info">
                            <h1 style="width:50px;" class="text-center">{{ index+1 }}</h1>
                            <VResponsive :aspect-ratio="16/9" style="padding:0 20px">
                                <img style="border-radius:40px;width:60px;height:60px" :src="eachAuthor.face.slice(5)" />
                            </VResponsive>
                            <div style="flex-basis:100%">
                                {{eachAuthor.name}}
                                <br>
                                {{eachAuthor.official}}
                            </div>
                            <VChip label color="red" text-color="white">
                                <VIcon left>mdi-menu-up</VIcon>{{eachAuthor.cRate}}
                            </VChip>
                        </div>
                    </VCardText>
                </VCard>
            </VTabItem>


            <VTabItem :key="2">
                <VCard flat>
                                    <VCard v-for="(eachAuthor,index) in fansDecrease" :key="eachAuthor.mid" flat :to="'/author/'+eachAuthor.mid" >
                    <VCardText>
                        <div class="item-info">
                            <h1 style="width:50px;" class="text-center">{{ index+1 }}</h1>
                            <VResponsive :aspect-ratio="16/9" style="padding:0 20px">
                                <img style="border-radius:40px;width:60px;height:60px" :src="eachAuthor.face.slice(5)" />
                            </VResponsive>
                            <div style="flex-basis:100%">
                                {{eachAuthor.name}}
                                <br>
                                {{eachAuthor.official}}
                            </div>
                            <VChip label color="green" text-color="white">
                                <VIcon left>mdi-menu-down</VIcon>{{eachAuthor.cRate}}
                            </VChip>
                        </div>
                    </VCardText>
                </VCard>
                </VCard>
            </VTabItem>

            <VTabItem :key="3">
                <VCard flat>
                    <VCardText>番剧</VCardText>
                </VCard>
            </VTabItem>

            <VTabItem :key="4">
                <VCard flat>
                    <VCardText>国创</VCardText>
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
      fansDecrease: Object()
    };
  },
  mounted() {
    this.axios.get("/bangumi").then(response => {
      this.bangumiData = response.data.content;
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
