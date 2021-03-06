/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


import VuePlyr from 'vue-plyr';
// import 'vue-plyr/dist/vue-plyr.css';
Vue.use(VuePlyr)

Vue.prototype.$apiUrl = process.env.VUE_APP_API_URL;
Vue.prototype.$webUrl = process.env.VUE_APP_WEB_URL;

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'

// axios
import axios from "./axios.js"
Vue.use(axios)

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import ru from 'vee-validate/dist/locale/ru';
import VeeValidate, { Validator } from 'vee-validate'
Vue.use(VeeValidate);
Validator.localize('ru', ru);

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
// import './registerServiceWorker'

//filters
import './filters.js'

// Feather font icon
require('./assets/css/iconfont.css')

//moment
window.moment = require('moment');
window.moment.locale('ru');

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
