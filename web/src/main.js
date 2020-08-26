import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import ListCard from '@/components/ListCard.vue'
 
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
 
Vue.use(VueAwesomeSwiper)

Vue.component('m-list-card',ListCard)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
