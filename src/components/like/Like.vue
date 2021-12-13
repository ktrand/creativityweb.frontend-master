<template>
    <div>
        <div class="flex items-center">
            <div class="flex items-center">
                <!-- <span type="flat" @click="toggleLike">
                    <feather-icon class="mr-2" icon="HeartIcon" svgClasses="h-5 w-5"/>    
                </span>  -->
                <vs-button 
                    :disabled="!isUserAuthenticated"
                    color="primary" 
                    type="flat" 
                    icon-pack="feather" 
                    icon="icon-heart" 
                    svgClasses="h-5 w-5"
                    @click="toggleLike"></vs-button>
                <span class="ml-5">{{ countLikes }}</span>
            </div>
        </div>
    </div>
</template>


<script>
import {mapGetters} from 'vuex'
export default {
    props:{
        model:{
            required:true
        },
        modelId:{
            required:true
        }
    },

    data(){
        return {
            countLikes: 0,
        }
    },

    computed:{
        ...mapGetters({
            user: 'auth/getProfile',
            isUserAuthenticated: 'auth/isUserAuthenticated'
        })
    },

    methods:{
        toggleLike(){
            if(this.isUserAuthenticated){
                const payload = {
                    model: this.model,
                    model_id: this.modelId,
                    user_id: JSON.parse(this.user).id,
                }
                this.$http.put('web/like/toggle-like', payload).then(response => {
                    this.countLikes = response.data.countLikes
                })
            }
        },
        
        getCountLikes(){
            const payload = {
                model: this.model,
                model_id: this.modelId
            }
            this.$http.get('/like/count', {
                params: payload
            }).then(response => {
                this.countLikes = response.data
            })
        }
    },

    mounted(){
        this.getCountLikes()
    }
}
</script>