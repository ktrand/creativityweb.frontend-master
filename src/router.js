import Vue from 'vue'
import Router from 'vue-router'
// import store from './store/store'

Vue.use(Router)
// function LogOut(from, to, next) {
//   store.commit('auth/UNSET_TOKEN');
//   next('/login');
// }

const router = new Router({
    base: process.env.BASE_URL,
    routes: [

        {
            path: '',
            // component: () => import('./layouts/main/Main.vue'),
            component: () => import('@/views/pages/Error404.vue'),
            children: [
              // {
              //   path: '/',
              //   name: 'home',
              //   component: () => import('./views/Home.vue')
              // },
              // {
              //   path: '/video/:videoId',
              //   name: 'videoPage',
              //   component: () => import('./views/video/VideoPage')
              // },
              // {
              //   path: '/posts',
              //   name: 'blogPage',
              //   component: () => import('./views/blog/BlogPage')
              // },
              // {
              //   path: '/post/:postId',
              //   name: 'post',
              //   component: () => import('./components/posts/Post')
              // },
              // {
              //   path: '/videos/:slug',
              //   name: 'category', 
              //   component: () => import('./views/category/VideoByCategory.vue')
              // },
              // {
              //   path: '/user/profile',
              //   name: 'userEdit', 
              //   component: () => import('./views/user/UserEdit.vue')
              // },
              // {
              //   path: '/liked-videos',
              //   name: 'likeds', 
              //   component: () => import('./views/liked/LikedVideos.vue')
              // },
              // {
              //   path: '/populars',
              //   name: 'populars', 
              //   component: () => import('./views/user/UserEdit.vue')
              // },
            ]
        },
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/user/verify-account',
                name: 'verifyAccount',
                component: () => import('@/views/user/VerifyAccount.vue')
              },
              {
                path: '/projects/instagram',
                name: 'instagram',
                component: () => import('@/views/projects/Instagram.vue')
              },
              {
                path: '/register',
                name: 'register',
                component: () => import('@/views/pages/Register.vue')
              },
              {
                path: '/forgot-password',
                name: 'pageForgotPassword',
                component: () => import('@/views/pages/ForgetPassword.vue'),
                meta:{
                  auth: false,
                },
              },
              {
                path: '/reset-password/:email/:token',
                name: 'pageResetPassword',
                component: () => import('@/views/pages/ResetPassword.vue'),
                meta:{
                  auth: false,
                },
              },
              {
                path: '/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !store.getters['auth/getToken']) next({ name: 'login' })
//   else next()
// })

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

export default router
