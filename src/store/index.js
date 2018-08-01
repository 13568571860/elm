import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchHis: [],
    address: {},
    floor: 0,
    floors: 0,
    buyCar: {},
    specs: {}
  },
  actions: {
    searchCity (ctx, search) {
      ctx.commit('searchCity', search)
    },
    changeAddress (ctx, data) {
      ctx.commit('changeAddress', data)
    },
    changeActiveSidebar (ctx, floor) {
      ctx.commit('changeActiveSidebar', floor)
    },
    changeSidebar (ctx, floors) {
      ctx.commit('changeSidebar', floors)
    },
    changeCar (ctx, buyCar) {
      ctx.commit('changeCar', buyCar)
    },
    showSpecs (ctx, specs) {
      ctx.commit('showSpecs', specs)
    }
  },
  mutations: {
    searchCity (state, search) {
      state.searchHis = search
    },
    changeAddress (state, data) {
      state.address = data
    },
    changeActiveSidebar (state, floor) {
      state.floor = floor
    },
    changeSidebar (state, floors) {
      state.floors = floors
    },
    changeCar (state, buyCar) {
      state.buyCar = buyCar
    },
    showSpecs (state, specs) {
      state.specs = specs
    }
  }
})
