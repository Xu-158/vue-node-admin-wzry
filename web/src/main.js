import Vue from 'vue'
import App from './App.vue'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import router from './router'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
import ListCard from '@/components/ListCard.vue'
 
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper)

Vue.component('m-list-card',ListCard)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
