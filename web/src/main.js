import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
import ListCard from '@/components/ListCard.vue'
 
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper)

Vue.component('m-list-card',ListCard)

Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000/web/api'
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
