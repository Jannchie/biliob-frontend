<template>
 <main-layout>
   <detail-main slot="main-cards">
    <author-detail slot="detail"></author-detail>
   </detail-main>
   <author-aside slot="aside-cards"></author-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import DetailMain from '../components/DetailMain.vue'
import AuthorAside from '../components/aside/AuthorDetailAside.vue'
import AuthorDetail from '../components/main/AuthorDetail.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, DetailMain, AuthorAside, AuthorDetail
  },
  mounted () {
    this.$store.commit('toAuthor')
  }
}

</script>
