import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  offset: 0
}

export default new Vuex.Store({
  state,
  mutations
})
