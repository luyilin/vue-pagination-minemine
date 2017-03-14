import Vue from 'vue'
import router from './router/router'
import App from './App'
import vueTap from 'v-tap';
import store from './store/index'
import iconfont from './assets/iconfont/iconfont.js'
import 'filter'

Vue.use(vueTap);

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')
