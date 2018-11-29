<template>
  <VCard class="card">
    <div>

      <div>
      <VImg :src="authorData.face" class="face-img"/>
      </div>
    </div>
    <VCardText class='card-holder'>
        <Chart theme="light" :auto-resize="true" :options="fans" style="width:100%;height:80vmin;"></Chart>
        <Chart theme="light" :auto-resize="true" :options="fansRate" style="width:100%;height:80vmin;"></Chart>
    </VCardText>
  </VCard>
</template>

<script>
import drawfansGraph from "../../charts/author-fans.js";
import drawfansRateGraph from "../../charts/author-fans-rate.js";
var deepCopy = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var no = {};
    for (let i in o) {
      no[i] = deepCopy(o[i]);
    }
    return no;
  } else {
    return o;
  }
};
export default {
  name: "Ra",
  data() {
    return {
      authorData: {},
      fans: {},
      fansRate: {}
    };
  },
  mounted() {
    this.axios.get("/author/" + this.$route.params.mid).then(response => {
      this.authorData = response.data;
      this.authorData.face = this.authorData.face.slice(5);
      this.fansRate = drawfansRateGraph(deepCopy(this.authorData));
      this.fans = drawfansGraph(deepCopy(this.authorData));
    });
  }
};
</script>

<style>
.face-img {
  width: 100%;
  height: 250px;
}
</style>
