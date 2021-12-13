<template>
    <div v-if="post">
        <!-- POST HEADER -->
        <div class="post-header flex justify-between mb-4">
            <div class="flex items-center">
                <div>
                    <vs-avatar class="m-0" :src="$apiUrl + post.user.img" size="45px"></vs-avatar>
                </div>
                <div class="ml-4">
                    <h6>{{ post.user.name }}</h6>
                    <small>{{ post.created_at | datetime }}</small>
                </div>
            </div>
            <div class="flex">
                <feather-icon class="ml-4" icon="HeartIcon" :svgClasses="{'text-danger fill-current stroke-current': true}"></feather-icon>
            </div>
        </div>
        <vx-card class="mt-base">
            <div v-for="(content, index) in post.post_contents" :key="index">
                <!-- POST CONTENT -->
                <div v-if="content.text" class="content-content">
                    <p>{{ content.text }}</p>
                </div>
                <div v-if="content.img" class="post-media-container mb-6 mt-4">
                    <img class="responsive rounded" :src="content.imgUrl ? content.imgUrl:($apiUrl+content.img)" alt="user-upload">
                </div>
            </div>
        </vx-card>
        
    </div>
</template>


<script>
export default {
    data(){
        return{
            post:null,
        }
    },

    methods:{
        getPostContents(){
            this.$vs.loading({color: 'rgb(228, 222, 37)' })
            this.$http.get(`post/contents/${this.$route.params.postId}`).then(response => {
                this.post = response.data.post
                this.$vs.loading.close()
            })
        }
    },

    mounted(){
        if(this.$route.params.postId){
            this.getPostContents()
        }
    }
}
</script>