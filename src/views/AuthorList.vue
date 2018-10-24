<template>
 <main-layout>
   <author-list-main slot="main-cards">
    <author-table slot="table"></author-table>
   </author-list-main>
   <author-list-aside slot="aside-cards"></author-list-aside>
 </main-layout>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import AuthorListMain from '../components/AuthorListMain.vue'
import AuthorListAside from '../components/AuthorListAside.vue'
import AuthorTable from '../components/AuthorTable.vue'
export default {
  name: 'authorList',
  components: {
    MainLayout, AuthorListMain, AuthorListAside, AuthorTable
  }
}

</script>

<style>
  .face {
    position: relative;
    height: 60%;
    width: 60%;
    align-content: center;
    border-radius: 4px;
  }

</style>
