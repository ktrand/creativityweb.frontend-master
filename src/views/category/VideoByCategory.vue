<template>
  <div v-if="videos.length > 0">
    <videos :videos="videos" />
  </div>
</template>

<script>
import Videos from '../../components/video/Videos'
export default {
  data(){
    return {
      videos:[],
    }
  },

  components:{Videos},

  watch:{
    $route(){
      this.getVideos()
    }
  },

  methods:{
    getVideos(){
      this.$vs.loading({color: 'rgb(228, 222, 37)' })
      this.$http.get(`videos/by-category/${this.$route.params.slug}`).then(response => {
        this.videos = response.data.videos
      }).finally(() => {
        this.$vs.loading.close()
      })
    }
  },

  mounted(){
    this.getVideos()
  }
}
</script>