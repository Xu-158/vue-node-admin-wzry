import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import http from './http'

import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = http
Vue.prototype.$logs = window.console.log

Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
