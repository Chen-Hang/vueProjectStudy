import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from "./api";   // 引用配置xios全局配
Vue.config.productionTip = false

Vue.prototype.$axios = http;   // 添加原型方法，这样创建的对象就自带该方法了。


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
