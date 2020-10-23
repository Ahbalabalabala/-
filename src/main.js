import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios;
// axios.defaults.baseURL = '/api' 
// Vue.use(VueAxios, axios)
// import AMapLoader from "@amap/amap-jsapi-loader";

import vantConfig from './vant.config.js'
// 使用Vue 插件语法将按需引入的Vant组件全局注册到Vue中
Vue.use(vantConfig)
// Vue.use(AMapLoader)




Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


