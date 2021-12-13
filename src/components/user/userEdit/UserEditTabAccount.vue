<template>
  <div id="user-edit-tab-info" v-if="data_local">

    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img v-if="!update_avatar" :src="$apiUrl+data_local.img" class="mr-8 rounded h-24 w-24" />
          <img v-if="update_avatar" :src="update_avatar" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ data_local.name  }}</p>
            <input type="file" class="hidden" ref="update_avatar_input" @change="updateAvatar" accept="image/*">

            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button class="mr-4 mb-4 profile-button" @click="$refs.update_avatar_input.click()">Изменить аватарку</vs-button>
            <!-- <vs-button class="mr-4 mb-4 profile-button" @click="subscribe">Подписаться на уведомления</vs-button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input @focus="onChangeName" class="mt-4 profile-button w-full" label="Имя" v-model="data_local.name" v-validate="'required'" name="name" />
        <!-- <vs-input class="w-full mt-4" label="Name" v-model="data_local.name" v-validate="'required|alpha_spaces'" name="name" /> -->
        <span class="text-danger text-sm"  v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <!-- <vs-input class="w-full mt-4" label="Email" v-model="data_local.email" type="email" v-validate="'required|email'" name="email" />
        <span class="text-danger text-sm"  v-show="errors.has('email')">{{ errors.first('email') }}</span> -->
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full mt-8">
        <!-- <div class="mt-8 flex flex-wrap items-center justify-start"> -->
          <vs-button class="ml-auto mt-2 mr-4 profile-button" @click="save_changes" :disabled="disabled">Сохранить изменения</vs-button>
          <!-- <vs-button class="mt-2" type="border" color="warning" @click="reset_data">Сбросить</vs-button> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    vSelect
  },
  data () {
    return {
      data_local: null,
      update_avatar:null,
      avatar:null,
      disabled:true,
    }
  },
  computed: {
    ...mapGetters({
      userData: 'auth/getProfile'
    }),
    validateForm () {
      return !this.errors.any()
    }
  },

  watch:{
    avatar(){
      this.disabled = false
    }
  },

  methods: {
    ...mapMutations({
      updateUserData: 'auth/UPDATE_USER_DATA'
    }),
    save_changes () {
      // if (!this.validateForm) return, 
      this.$vs.loading({color: 'rgb(228, 222, 37)' })
      let formData = new FormData()
      formData.append('name', this.data_local.name)
      formData.append('img', this.avatar)
      this.$http.post('user/edit-account-data', formData).then(response => {
        this.updateUserData(JSON.stringify(response.data.user))
        this.$vs.loading.close()
        this.$vs.notify({
            position:'top-center',
            title: 'Success',
            text: 'Данные успешно изменены!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
        })
        }).catch(err => {
        this.$vs.loading.close()
          let text = "Возникла ошибка!";
          if(err.response.data){
            text = err.response.data
          }else{
            text = err.message;
          }

          this.$vs.notify({
            position:'top-center',
            title: 'Ошибка',
            text: text,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
        })
      })
    },
    reset_data () {
      this.data_local = JSON.parse(this.userData)
    },
    updateAvatar (input) {
      if (input.target.files && input.target.files[0]) {
        this.avatar =input.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          this.update_avatar = e.target.result
        }
        reader.readAsDataURL(input.target.files[0])
      }
    },
    onChangeName(){
      this.disabled = false
    },
    // subscribe(){
    //   var firebaseConfig = {
    //       apiKey: "AIzaSyA_Y-KsJjCzzJcB6qIOAXkRpXt8v6TJU3Y",
    //       authDomain: "creativity-ee643.firebaseapp.com",
    //       databaseURL: "https://creativity-ee643.firebaseio.com",
    //       projectId: "creativity-ee643",
    //       storageBucket: "creativity-ee643.appspot.com",
    //       messagingSenderId: "603803984613",
    //       appId: "1:603803984613:web:847f34a701b28a1dcaea0c",
    //       measurementId: "G-K649YQH3X8"
    //     };
      
    // firebase.initializeApp(firebaseConfig);
    // const messaging = firebase.messaging();
    //   messaging.requestPermission()
    //         .then(function () {
    //             return messaging.getToken()
    //         })
    //         .then(function(token) {
    //             console.log(token)  
    //             $.ajax({
    //                 url: '{{ route("save-token") }}',
    //                 type: 'POST',
    //                 data: {
    //                     token: token
    //                 },
    //                 dataType: 'JSON',
    //                 success: function (response) {
    //                     alert('Token saved successfully.');
    //                 },
    //                 error: function (err) {
    //                     console.log('User Chat Token Error'+ err);
    //                 },
    //             });
  
    //         }).catch(function (err) {
    //             console.log('User Chat Token Error'+ err);
    //         });
    // }
  },
  mounted(){
    this.data_local = JSON.parse(this.userData)
    this.disabled = true
  }
}
</script>

<style lang="scss">
  @media (max-width:700px) {
    .profile-button{
      width: 200px !important;
    }
  }
</style>