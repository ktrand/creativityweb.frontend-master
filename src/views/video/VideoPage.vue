<template>
    <div class="vx-row">
        <div class="vx-col w-full lg:w-3/4 mb-base">
            <video-item :video-id="$route.params.videoId"/>
        </div>
        <div class="vx-col w-full lg:w-1/4 mb-base">
            <video-recommendation :video-id="$route.params.videoId"/>
        </div>
    </div>
</template>



<script>
export default {

  data(){
      return{
          playerOptions: {},
      }
  },

    components:{
        'video-item': () => import('../../components/video/Video'),
        'video-recommendation': () => import('../../components/video/VideoRecommendation')
    },

   methods: {
    playVideo() {
      this.player.playVideo()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>