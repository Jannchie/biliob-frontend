<template>
 <main-layout>
   <favorite-author-list-main slot="main-cards"></favorite-author-list-main>
   <author-list-aside slot="aside-cards"></author-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import FavoriteAuthorListMain from '../components/main/FavoriteAuthorList.vue'
import AuthorListAside from '../components/aside/AuthorListAside.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, FavoriteAuthorListMain, AuthorListAside
  }
}
</script>
