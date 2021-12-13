export default{
    getCurrentVideo({commit}, context){
        context.loading = true
        let url = `freevideo/${context.videoId}`;
        context.$http.get(url).then(response => {
            commit('setCurrentVideo', response.data.video)
            context.$vs.loading.close()
        })
    },
    getRecommendationVideos({commit}, context){
        let url = `recommendation-videos/${context.videoId}`;
        context.$http.get(url).then(response => {
            commit('setRecomendationVideos', response.data.videos)
            context.$vs.loading.close();
        }).catch(err => {
            context.$vs.loading.close()
            console.log('error', err);
        })
    }
}