<template>
    <div>
        <vs-popup :fullscreen="false"  class="holamundo" title="Установите наше приложение, будем рады!" :active.sync="popupActive">
            <vs-button>
                Install please
            </vs-button>
        </vs-popup>
    </div>
</template>



<script>
export default {
    data(){
        return{
            popupActive: true,
            deferredPrompt: null,
        }
    },

    methods:{
        showAddToHomeScreen() { 
            this.popupActive = true 
        },
        addToHomeScreen(){
            this.popupActive = false
        } 
    },

    created(){
        window.addEventListener('beforeinstallprompt', function (e) { 
            this.deferredPrompt = e; 
            this.showAddToHomeScreen(); 
        }); 
    }
}
</script>