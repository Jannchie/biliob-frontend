<template>
    <v-card ripple :to="'/author/'+authorData.mid">
        <div  style="display:flex">
        <img class="author-face" :src="authorData.face">
        <div>
            <span>{{authorData.name}}</span>
            <span>{{authorData.level}}</span>
            <span>{{authorData.sex}}</span>
            <br>
            <span>粉丝数:{{fans}}</span>
            <br>
            <span>{{authorData.official}}</span>
        </div>
        </div>
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
    this.axios.get(this.apiurl + '/author/' + this.$route.params.mid).then((response) => {
      this.authorData = response.data
      this.fans = response.data.data[0].fans
    })
  }
}
</script>

<style>
.author-face{
    height:60px;
    border-radius: 30px;
    margin-right: 20px;
}
</style>
