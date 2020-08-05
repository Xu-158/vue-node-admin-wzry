import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import http from './http'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = http

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
