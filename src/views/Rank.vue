<template>
    <div>
        排行榜页面
        <VTabs fixed-tabs>
            <VTab :key="1">
                番剧
            </VTab>
            <VTab :key="2">
                国动
            </VTab>
            <VTabItem :key="1">
                    <VCard
                        v-for="eachBangumi in bangumiData.content"
                        :key="eachBangumi.title"
                        class="item-cards"
                        ripple
                        >
                        <VCardTitle class="item-title">
                            {{eachBangumi.title}}
                        </VCardTitle>
                        <VCardText>
                            {{eachBangumi.tag}}
                        </VCardText>
                    </VCard>
            </VTabItem>
            <VTabItem :key="2">
                <VCard flat>
                    <VCardText>国动</VCardText>
                </VCard>
            </VTabItem>
        </VTabs>
    </div>
</template>
<script>
export default {
  data() {
    return {
      bangumiData: Object()
    };
  },
  mounted() {
    this.axios.get("/bangumi").then(response => {
      this.bangumiData = response.data;
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
</style>
