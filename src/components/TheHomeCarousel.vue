<template>
  <VCarousel
    :height="$vuetify.breakpoint.lgAndUp ? 300 : 200"
    :class="$vuetify.breakpoint.lgAndUp ? 'mt-5' : 'mt-0'"
    hide-delimiters
  >
    <VCarouselItem
      v-for="item in items"
      :key="item.aid"
      :src="item.pic"
      gradient="to top , rgba(0,0,0,1), rgba(25,32,72,.0), rgba(25,32,72,.0)"
      :to="`/author/${item.mid}/video/${item.aid}`"
    >
      <div
        style="position:absolute;bottom:0;width:95%"
        class="mx-3 mb-3 text-xs-left title bottom-gradient text-no-wrap text-truncate white--text"
      >
        {{ item.title }}
      </div>
    </VCarouselItem>
  </VCarousel>
</template>
<script>
export default {
  data() {
    return {
      items: Array()
    };
  },
  mounted() {
    this.axios.get(`video?pageSize=5&page=0&sort=0&days=3`).then(r => {
      r.data.content.forEach(element => {
        this.items.push(element);
      });
      this.axios.get(`/video/ads`).then(r => {
        let o = {};
        o.title = r.data.title;
        o.author = r.data.author;
        o.pic = r.data.pic;
        o.aid = r.data.aid;
        this.items.push(o);
      });
    });
  }
};
</script>
