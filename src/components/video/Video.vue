<template>
    <div :loading="loading" v-if="video">
        <vx-card class="overflow-hidden singl-video">
            <template slot="no-body">
                <div :key="video.id">
                    <vue-plyr :key="video.id" v-if="video.uploaded_video">
                        <video :poster="$apiUrl+video.img" :src="$apiUrl+video.video">
                            <!-- <source src="video-720p.mp4" type="video/mp4" size="720">
                            <source src="video-1080p.mp4" type="video/mp4" size="1080">
                            <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
                        </video>
                    </vue-plyr>
                    <vue-plyr :key="video.id" v-else ref="plyr">
                        <div 
                            data-plyr-provider="youtube" 
                            :data-plyr-embed-id="getYoutubeVideoId(video)">
                        </div>
                    </vue-plyr>
                </div>
            </template>
            <vs-collapse>
                <vs-collapse-item>
                <div slot="header">
                    {{video.title}}
                </div>
                    {{video.description}}.
                </vs-collapse-item>
            </vs-collapse>
        </vx-card>
        <div class="vx-col w-full">
            <vx-card class="mt-2 p-4">
                <div>
                    <div>
                        <div class="flex justify-between">
                            <like model="video" :model-id="video.id" />
                            <div class="coursor-pointer flex items-center">
                                <social-share :url="$webUrl + '#' + $route.path" /> 
                                <feather-icon  @click="commentActive = !commentActive" class="ml-8 mr-2" icon="MessageSquareIcon" svgClasses="h-5 w-5"/>
                                <span>{{ video.comments_count }}</span>
                            </div>
                        </div>
                        <div v-if="commentActive" class="comments-container mt-4">
                            <ul class="user-comments-list">
                                <li v-for="(com, commentIndex) in video.comments" :key="commentIndex" class="commented-user items-center mb-1">
                                    <div class="flex" v-if="com.parent_id === null">
                                        <div class="mr-3"><vs-avatar class="m-0" :src="$apiUrl+com.user.img" size="30px" /></div>
                                        <div class="leading-tight">
                                            <p class="text-xs" :class="com.user.status === 'admin'?'bg-danger':''">{{ com.user.name }}</p>
                                            <span class="font-medium">{{ com.body }}</span>
                                        </div>
                                        <div class="ml-auto">
                                            <div class="flex">
                                                <feather-icon @click="setSelectedComment(com)" icon="CornerUpLeftIcon" svgClasses="h-4 w-4" class="mr-2 cursor-pointer" />
                                                <feather-icon 
                                                    v-if="JSON.parse(user).status === 'admin'"
                                                    @click="deleteComment(com.id)" 
                                                    icon="TrashIcon" 
                                                    svgClasses="h-4 w-4" 
                                                    class="mr-2 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    <div v-for="(c, commentIndex) in video.comments" :key="commentIndex" class="flex ml-8">
                                        <div v-if="c.parent_id === com.id" class="flex">
                                            <div class="mr-3"><vs-avatar class="m-0" :src="$apiUrl+c.user.img" size="30px" /></div>
                                            <div class="leading-tight">
                                                <p class="text-xs" :class="com.user.status === 'admin'?'bg-danger':''">{{ c.user.name }}</p>
                                                <span class="font-medium">{{ c.body }}</span>
                                            </div>
                                            <div class="ml-auto">
                                                <div class="flex">
                                                    <feather-icon 
                                                        v-if="JSON.parse(user).status === 'admin'"
                                                        @click="deleteComment(c.id)" 
                                                        icon="TrashIcon" 
                                                        svgClasses="h-4 w-4" 
                                                        class="mr-2 cursor-pointer" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div v-if="isUserAuthenticated" class="post-comment">
                            <span v-if="selectedComment" class="text-warning">{{ 'Выбрана коментария автора '+selectedComment.user.name+`  (${selectedComment.body})` }}</span>
                            <vs-textarea label="Добавить коментарий" class="mb-2" v-model="comment" />
                            <div class="flex">
                                <vs-button :disabled="!comment" @click="addComment" size="small">Добавить</vs-button>
                                <vs-button v-if="selectedComment" @click="resetSelectedComment" class="ml-4" color="warning" type="border" size="small">Отменить</vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SocialShare from '../social-media/SocialNetworkShare'
export default {
    components:{SocialShare,'like': () => import('../like/Like')},
    props:{
        videoId:{
            required:true
        }
    },

    data(){
        return{
            loading:false,
            renderKey:1,
            comment:null,
            selectedComment:null,
            commentActive: false,
        }
    },

    computed:{
        ...mapGetters({
            video: 'video/getCurrentVideo',
            isUserAuthenticated: 'auth/isUserAuthenticated',
            user: 'auth/getProfile'
        })
    },

    methods:{
        getVideo(){
            this.$store.dispatch('video/getCurrentVideo', this)
        },
        getYoutubeVideoId(video){
            if(video){
                return video.video.split('=')[1]
            }
        },
        addComment(){
            const payload = {
                body:this.comment,
                video_id: this.videoId,
                parent_id:this.selectedComment ? this.selectedComment.id:null
            }
            this.$http.post(`comment/${this.videoId}`, payload).then(() => {
                this.comment = null
                this.getVideo()
                this.$vs.notify({
                    position:'right-bottom',
                    title: 'Success',
                    text: 'Коментария успешно добавлено!',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'success'
                })
            })
        },
        setSelectedComment(comment){
            this.selectedComment = comment
        },
        resetSelectedComment(){
            this.selectedComment = null
        },
        deleteComment(id){
            const index = this.video.comments.findIndex(el => el.id === id)
            const childdComments = this.video.comments.filter(el => el.parent_id === id)
            this.$http.delete(`comment/${id}`).then(() => {
                this.video.comments.splice(index,1)
                this.video.comments_count -= (childdComments.length+1)
                this.$vs.notify({
                    position:'right-bottom',
                    title: 'Success',
                    text: 'Коментария успешно удалена!',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'success'
                })
            }).catch(err => {
                this.$vs.notify({
                    position:'right-bottom',
                    title: 'Error',
                    text: err.message,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'danger'
                })
            })
        }
    },

    watch:{
        $route(){
            this.getVideo()
            this.renderKey++
        }
    },

    mounted(){
        this.getVideo()
    }
}
</script>

<style lang="scss">
    .vx-card__body{
        padding: 0 !important;
    }
    .vs-collapse{
        padding: 0 !important;
    }
</style>