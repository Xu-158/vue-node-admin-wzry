import Vue from 'vue'
import App from './App.vue'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import router from './router'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
 
import 'swiper/css/swiper.css'
 
Vue.use(VueAwesomeSwiper)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
