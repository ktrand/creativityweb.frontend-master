<template>
    <div>
        <div v-if="posts.length > 0" class="vx-row">
            <div v-for="post in posts" :key="post.id" class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
                <router-link :to="`post/${post.id}`">
                    <vx-card class="overlay-card overflow-hidden category-container">
                        <template slot="no-body">
                            <img :src="$apiUrl+ post.img" alt="user-profile-cover" class="responsive image">
                            <div class="card-overlay text-white flex flex-col justify-between">
                                <h4 class="text-white mb-4">{{ post.title }}</h4>
                                <!-- <p>{{ "card_7.text" }}</p> -->
                            </div>
                        </template>
                    </vx-card>
                </router-link>
            </div>
        </div>
        
    </div>
</template>


<script>
export default {
    data(){
        return{
            posts:[]
        }
    },

    methods:{
        getPosts(){
            this.$vs.loading({color: 'rgb(228, 222, 37)' })
            this.$http.get('posts').then(response => {
                this.posts = response.data.posts
                this.$vs.loading.close()
            })
        }
    },

    mounted(){
        this.getPosts()
    }
}
</script>