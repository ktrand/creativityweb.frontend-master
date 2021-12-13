import router from '../../router'

export default {
    LOGOUT({commit}){
        commit('UNSET_TOKEN')
    },
    LOGIN({commit}, context) {
        const data = {
            email: context.email,
            password: context.password,
            remember_me: context.checkbox_remember_me
        }
        context.$vs.loading({color: 'rgb(228, 222, 37)' })
        context.$http.post('login', data).then(response => {
            commit('SET_TOKEN', [response.data.meta.token, response.data.data]);
            context.$vs.loading.close()

            router.push('/')

            context.$vs.notify({
                position:'top-center',
                title: 'Успешный вход',
                text: 'С возвращением!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
            })

        }).catch((err) => {
            context.$vs.loading.close()
            commit('UNSET_PROCESS')
            commit('SET_ERROR')
            context.loading = false
            context.$vs.notify({
                position:'top-center',
                title: 'Ошибка',
                text: err.response.data.errors,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
        })
    },

    REGISTER({commit}, context){
        const data = {
            name:context.name,
            password:context.password,
            email:context.email
        }
        context.$vs.loading({color: 'rgb(228, 222, 37)' })

        context.$http.post('register', data).then(response => {
            commit('SET_TOKEN', [response.data.meta.token, response.data.data])
            context.$vs.loading.close()
            router.push('/')
            context.$vs.notify({
                position:'top-center',
                title: 'Успешная регистрация',
                text: '',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
            })
        }).catch(err => {
            context.$vs.loading.close()
            context.$vs.notify({
                position:'top-center',
                title: 'Ошибка',
                text: err.response.data.errors,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            })
        })

    },

    GET_AUTH(state) {
        if (state.token) {
            state.isAuthenticated = true
        }
    },

    GET_PERM({commit}, $http) {

        commit('PERMS_LOADED', false);

        $http.then(response => {
            commit('SET_PERMISSIONS', response.data.permissions);
            commit('PERMS_LOADED', true);
        }).catch(() => {
            commit('PERMS_LOADED', false);
            commit('UNSET_PROCESS');
            commit('SET_ERROR');
            router.push('/login');
        });
    }
}
