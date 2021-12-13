<template>
    <div>
        <videos :videos="likedVideos" />
    </div>
</template>


<script>
import Videos from '../../components/video/Videos'
export default {
    data(){
        return{
            likedVideos:[]
        }
    },

    components:{Videos},

    methods:{
        getLikedVideos(){
            this.$vs.loading({color: 'rgb(228, 222, 37)' })
            this.$http.get('web/video/liked').then(response => {
                this.likedVideos = response.data.videos
            }).finally(() => {
            this.$vs.loading.close()
      })
        }
    },

    mounted(){
        this.getLikedVideos()
    }
}
</script>