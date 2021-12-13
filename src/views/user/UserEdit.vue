<template>
  <div id="page-user-edit">

    <vx-card>

      <div slot="no-body" class="tabs-container px-6 pt-6">
        
        <div class="mb-6">
          <vs-alert color="warning" v-if="!JSON.parse(user).verified">
            <span>Ваш аккаунт не активирован. </span>
            <span>
              <span>Получить ссылку </span>
              <vs-button type="border" @click="getVerificationLink" class="text-inherit underline">Активации на почту</vs-button>
            </span>
          </vs-alert>
        </div>

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Профиль" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <user-edit-tab-account class="mt-4" />
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>
import UserEditTabAccount     from '../../components/user/userEdit/UserEditTabAccount'
import {mapGetters} from 'vuex'
export default {
  components: {
    UserEditTabAccount,
  },
  data () {
    return {
      user_data: null,
      user_not_found: false,
      activeTab: 0
    }
  },

  computed:{
    ...mapGetters({
      user: 'auth/getProfile'
    })
  },

  methods: {
    getVerificationLink(){
      this.$vs.loading({color: 'rgb(228, 222, 37)' })
      this.$http.get('user/verify-link').then(response => {
        this.$vs.loading.close()
        this.$vs.notify({
            position:'top-center',
            title: 'Ураа',
            text: response.data,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
        })
      })
    }
  },
}

</script>
