<template>
  <VCarousel
    height="300"
    class="mt-5"
  >
    <VCarouselItem
      v-for="item in items"
      :key="item.aid"
      :src="item.pic"
      gradient="to top , rgba(0,0,0,1), rgba(25,32,72,.0), rgba(25,32,72,.0)"
      @click.stop="$router.push(`/author/${item.mid}/video/${item.aid}`)"
    >
      <div
        style="position:absolute;bottom:0;width:95%"
        class="mx-3 mb-5 text-xs-left display-1 bottom-gradient text-no-wrap text-truncate white--text"
      >{{item.title}}</div>
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
    //   this.axios.get(`/video/online/top`).then(r => {
    //     o = {};

    //     o.title = r.data.title;
    //     o.author = r.data.author
    //     o.
    //  });
    this.axios.get(`video?pageSize=5&page=0&sort=0&days=3`).then(r => {
      r.data.content.forEach(element => {
        console.log(element);

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
