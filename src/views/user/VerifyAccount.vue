<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
                <vx-card>
                    <div slot="no-body" class="full-page-bg-color">
                        <div class="vx-row">
                            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                                <img src="@/assets/images/pages/reset-password.png" alt="login" class="mx-auto">
                            </div>
                        </div>
                    </div>
                </vx-card>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            email:null,
            verifyToken: null,
        }
    },

    methods:{
        ...mapMutations({
            updateUserData: 'auth/UPDATE_USER_DATA'
        }),
        verify(){
            this.$vs.loading({color: 'rgb(228, 222, 37)' })
            this.$http.post('user/verify-account', {email:this.email, verify_token:this.verifyToken}).then((response) => {
                this.updateUserData(JSON.stringify(response.data.data))
                this.$vs.loading.close()
                this.$vs.notify({
                    position:'top-center',
                    title: 'Ураа',
                    text: 'Ваш аккаунт успешно активирован!',
                    iconPack: 'feather', 
                    icon: 'icon-alert-circle',
                    color: 'success'
                })
                this.$router.push('/')
            }).catch(err => {
                this.$vs.loading.close()
                this.$vs.notify({
                    position:'top-center',
                    title: 'Упсс...',
                    text: err.response.data,
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'warning'
                })
            })
        }
    },

    mounted(){
        this.email = this.$route.query.email
        this.verifyToken = this.$route.query.token
        this.verify()
    }
}
</script>