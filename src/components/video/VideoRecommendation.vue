<template>
    <div v-if="videos && videos.length > 0">
        <div v-for="video in videos" :key="video.id">
            <router-link :to="{name:'videoPage', params:{videoId:video.id}}">
                <vx-card class="overflow-hidden mb-3 recomendation">
                    <template slot="no-body">
                        <img
                            :src="$apiUrl+video.img" 
                            alt="content-img" 
                            class="responsive rounded-lg">
                    </template>
                </vx-card>
            </router-link>
        </div>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    props:{
        videoId:{
            required:true
        }
    },

    data(){
        return{
            videos:[],
        }
    },

    computed:{
        ...mapGetters({
            video: 'video/getCurrentVideo'
        })
    },

    methods:{
        getVideos(){
            if(this.video){
                this.$http.get(`recommendation-videos/${this.videoId}`).then(response => {
                    this.videos = response.data.videos
                })
            }
        }
    },

    watch:{
        video(){
            this.getVideos()
        }
    },
}
</script>