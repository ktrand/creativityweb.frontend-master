<template>
    <div class="mt-2">
        <send-icon @click="popupActive = true" size="1.5x" class="custom-class" />
        <vs-popup title="Поделиться" :active.sync="popupActive">
            <div class="social-networks pt-3">
                <facebook :url="url" scale="3" class="mr-6"></facebook>
                <twitter :url="url" scale="3" class="mr-6"></twitter>
                <telegram :url="url" scale="3" class="mr-6"></telegram>
                <whats-app :url="url" scale="3" class="mr-6"></whats-app>
            </div>
        </vs-popup>
    </div>
</template>


<script>
import { SendIcon } from 'vue-feather-icons'
import {
  Facebook,
  Twitter,
  Telegram,
  WhatsApp
} from "vue-socialmedia-share";
export default {
    name:'social-network-share',

    props:{
        url:{
            required:true
        }
    },

    components: {
        Facebook,
        Twitter,
        Telegram,
        WhatsApp,
        SendIcon
    },
    data(){
        return{
            popupActive:false,
        }
    }
}
</script>

<style>
    .social-networks{
        display: flex;
        justify-content: center;
    }
</style>