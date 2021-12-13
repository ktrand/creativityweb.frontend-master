<template>
    <div>
        <div v-if="videos.length > 0" class="vx-row">
            <div v-for="(video, index) in videos" :key="index" class="vx-col w-full sm:w-1/2 lg:w-1/4 mb-base mr-2">
                <router-link :to="{name:'videoPage', params:{videoId:video.id}}">
                    <vx-card class="video-container">
                        <div slot="no-body" style="height:100x">
                            <img style="height:100%" :src="$apiUrl + video.img" alt="content-img" class="responsive card-img-top">
                        </div>
                        <h5 class="mb-1 pl-1">{{ video.title }}</h5>
                        <p class="text-grey pl-1 pt-1">{{ video.description }}</p>
                    </vx-card>
                </router-link>
            </div>            
        </div>
        <div v-else>
            Пока здесь пусто...
        </div>
    </div>
</template>


<script>
export default {
    props:['videos']
}
</script>