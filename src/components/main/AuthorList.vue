<template>
  <div class="author-list-main">
    <div style="background-color:#F8F8F8">
      <div>
        <v-search-form slot="search" @getSearchValue="getSearchValue" hint="请输入UP主名称，或者uid"></v-search-form>
        <v-card class="author-cards" ripple :to="'/author/'+eachAuthor.mid" v-for="eachAuthor in authorList.content"
          :key="eachAuthor.mid">
          <div style="padding:5px;display:flex">
            <div>
              <v-responsive :aspect-ratio="16/9">
                <img style="border-radius:40px;width:80px;height:80px" :src="eachAuthor.face.slice(5)" />
              </v-responsive>
            </div>
            <div style="margin-left:10px;width:100%">
              <div class="font-weight-bold author-title">
                {{eachAuthor.name}}
                <sex-icon :sex="eachAuthor.sex"></sex-icon>
              </div>
              <div v-if="eachAuthor.official !== ''" class="caption subtext author-info">
                <v-icon color="#FBC02D" small>mdi-flash</v-icon>{{eachAuthor.official}}
              </div>
            </div>
            <div style="color:green" v-if="eachAuthor.focus === true" class="trace-state caption subtext">
              <v-icon color="green" small>mdi-eye</v-icon> 观测中
            </div>
            <div style="color:#FF5722" v-if="eachAuthor.focus === false" class="trace-state caption subtext">
              <v-icon color="#FF5722" small>mdi-eye-off</v-icon> 不再观测
            </div>
          </div>
        </v-card>
      </div>
      <div class="block">
        <div class="text-xs-center">
          <v-pagination light ripple v-model="currentPage" total-visible="5" :length="authorList.totalPages"></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSearchForm from '../common/VSearchForm.vue'
import SexIcon from '../common/SexIcon.vue'
export default {
  components: {
    VSearchForm, SexIcon
  },
  name: 'authorList',
  data () {
    return {
      'authorList': {},
      'currentApiurl': String,
      'currentPage': 1
    }
  },
  created () {
    this.currentApiurl = '/author'
    this.axios.get(this.currentApiurl).then((response) => {
      this.authorList = response.data
    })
  },
  methods: {
    getSearchValue (value) {
      if (!isNaN(Number(value))) {
        this.currentApiurl = '/author?aid=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.authorList = response.data
        })
      } else {
        this.currentApiurl = '/author?text=' + value
        this.axios.get(this.currentApiurl).then((response) => {
          this.authorList = response.data
        })
      }
    },
    handleChoosed (index, row) {
      console.log(index, row)
      this.$router.push({
        path: '/author/' + row.mid + '/author/' + row.aid
      })
    }
  },
  watch: {
    currentPage: function changePage (page) {
      this.axios.get(this.currentApiurl + '?page=' + (page - 1)).then((response) => {
        this.authorList = response.data
      })
    }
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

  .el-table td {
    padding: 2px 0
  }

  p {
    position: absolute;
    bottom: 0px;
    margin-bottom: 5px
  }

  .author-cards {
    margin: 10px 2px;
    height: 90px;
    border-radius: 5px
  }

  .author-title {
    max-width: 50vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .subtext {
    color: #444444
  }

  .trace-state {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .author-info {
    margin-top: 5px
  }

</style>
