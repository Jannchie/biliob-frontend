<template>
  <v-card class="aside-card">
    <v-card-text>
    <div style="display:flex">
      <img class="author-face" :src="authorData.face">
      <div>
        <span>{{authorData.name}}</span>
        <span>Lv:{{authorData.level}}</span>
        <span>{{authorData.sex}}</span>
        <br>
        <span>粉丝数:{{fans}}</span>
        <br>
        <span>{{authorData.official}}</span>
      </div>
    </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      'authorData': {},
      'fans': null
    }
  },
  mounted () {
    this.axios.get('/author/' + this.$route.params.mid).then((response) => {
      this.authorData = response.data
      this.fans = response.data.data[0].fans
    })
  }
}

</script>

<style>
  .author-face {
    height: 60px;
    border-radius: 30px;
    margin-right: 20px;
  }
</style>
