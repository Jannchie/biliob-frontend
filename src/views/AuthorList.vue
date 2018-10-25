<template>
 <main-layout>
   <author-list-main slot="main-cards">
    <author-list-table slot="table"></author-list-table>
   </author-list-main>
   <author-list-aside slot="aside-cards"></author-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/common/MainLayout.vue'
import AuthorListMain from '../components/main/AuthorList.vue'
import AuthorListAside from '../components/aside/AuthorListAside.vue'
import AuthorListTable from '../components/main/AuthorListTable.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, AuthorListMain, AuthorListAside, AuthorListTable
  }
}
</script>
