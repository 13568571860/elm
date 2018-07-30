import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchHis: [],
    address: {}
  },
  actions: {
    searchCity (ctx, search) {
      ctx.commit('searchCity', search)
    },
    changeAddress (ctx, data) {
      ctx.commit('changeAddress', data)
    }
  },
  mutations: {
    searchCity (state, search) {
      state.searchHis = search
    },
    changeAddress (state, data) {
      state.address = data
    }
  }
})
