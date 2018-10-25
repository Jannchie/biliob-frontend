<template>
  <v-container justify-center align-content-center style="container">
    <v-layout justify-center>
      <v-flex lg10 md12 >
          <router-view></router-view>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.container{
  margin: 0;
  padding: 0;
}
</style>
