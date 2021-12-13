<template>
    <div>
        <videos :videos="videos" />

        <!-- <div v-if="videos.length > 0" class="vx-row">
            <div class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
                <vx-card class="overlay-card overflow-hidden category-container">
                    <template slot="no-body">
                        <img :src="$apiUrl+'images/card-img.jpg'" alt="user-profile-cover" class="responsive">
                        <div class="card-overlay text-white flex flex-col justify-between">
                            <h4 class="text-white mb-4">{{ "card_7.title" }}</h4>
                            <p>{{ "card_7.text" }}</p>
                        </div>
                    </template>
                </vx-card>
            </div>
        </div> -->

    </div>
</template>


<script>
import {mapGetters} from 'vuex'
import Videos from '../video/Videos'
export default {
    components:{
        Videos,
    },
    data(){
        return{
            videos:[],
            popupActive: false,
            deferredPrompt: null,
        }
    },

    computed:{
        ...mapGetters({
            isUserAuthenticated: 'auth/isUserAuthenticated'
        })
    },

    methods:{
        getFreeVideos(){
            this.$http.get('/guest/videos').then(response => {
                this.videos = response.data.videos
            })
        },
        getVideos(){
            this.$http.get('web/video').then(response => {
                this.videos = response.data.videos
            })
        },
        showAddToHomeScreen() { 
            this.popupActive = true 
        },
        addToHomeScreen(){
            this.popupActive = false
        },
        installer(){
            this.deferredPrompt.prompt()

            this.deferredPrompt.userChoise.then(result => {
                if(result.outcome === "accepted"){
                    console.log("accepted");
                }
                this.deferredPrompt = null
            })
        }
    },

    mounted(){
        if(this.isUserAuthenticated){
            this.getVideos()
        }else {
            this.getFreeVideos()
        }

        window.addEventListener('beforeinstallprompt', function (e) { 
            e.preventDefault();
            this.deferredPrompt = e; 
            this.showAddToHomeScreen(); 
        }); 
    }
}
</script>
