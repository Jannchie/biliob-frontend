<template>
 <main-layout>
   <detail-main slot="main-cards">
    <author-detail slot="detail"></author-detail>
   </detail-main>
   <author-aside slot="aside-cards"></author-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import DetailMain from '../components/DetailMain.vue'
import AuthorAside from '../components/author/Aside.vue'
import AuthorDetail from '../components/author/Detail.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, DetailMain, AuthorAside, AuthorDetail
  }
}

</script>
