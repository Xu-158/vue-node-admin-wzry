import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'nprogress/nprogress.css' 
import './assets/css/style.css'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$logs = window.console.log
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
