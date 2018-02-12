import Vue from 'vue'
import App from './App'
import vueTap from 'v-tap'
import store from './store/index'

Vue.use(vueTap)

const app = new Vue({
  store,
  ...App
})

app.$mount('#app')
