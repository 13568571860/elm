import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchHis: []
  },
  actions: {
    searchCity (ctx, search) {
      ctx.commit('searchCity', search)
    }
  },
  mutations: {
    searchCity (state, search) {
      state.searchHis = search
    }
  }
})
