<template>
 <main-layout>
   <author-list-main slot="main-cards">
    <author-list-table slot="table"></author-list-table>
   </author-list-main>
   <author-list-aside slot="aside-cards"></author-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import AuthorListMain from '../components/author_list/Main.vue'
import AuthorListAside from '../components/author_list/Aside.vue'
import AuthorListTable from '../components/author_list/Table.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, AuthorListMain, AuthorListAside, AuthorListTable
  }
}
</script>
