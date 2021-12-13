export default{
    setCurrentVideo(state, video){
        state.currentVideo = video
    },
    setRecomendationVideos(state, videos){
        state.recommendationVideos = videos
    },
    clearRecomendationVideos(state){
        state.recommendationVideos = null
    }
}