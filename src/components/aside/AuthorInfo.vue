<template>
  <v-card >
    <v-card-text>
    <div style="display:flex">
      <img class="author-face" :src="authorData.face"  ripple @click.stop="toAuthor">
      <div>
        <span>{{authorData.name}}</span>
        <level-icon :level="authorData.level"></level-icon>
        <sex-icon :sex="authorData.sex"></sex-icon>
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
import SexIcon from '../common/SexIcon.vue'
import LevelIcon from '../common/LevelIcon.vue'
export default {
  data () {
    return {
      'authorData': {},
      'fans': null
    }
  },
  components: {
    SexIcon, LevelIcon
  },
  mounted () {
    this.axios.get('/author/' + this.$route.params.mid).then((response) => {
      this.authorData = response.data
      this.fans = response.data.data[0].fans
    })
  },
  methods: {
    toAuthor () {
      this.$store.commit('toAuthor')
      this.$router.push(`/author/${this.authorData.mid}`)
    }
  }
}

</script>

<style>
  .author-face {
    height: 62px;
    border-radius: 30px;
    margin-right: 20px;
  }
</style>
