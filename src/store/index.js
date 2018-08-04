import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchHis: [],
    address: {},
    floor: 0,
    floors: 0,
    buyCar: {},
    specs: {},
    lock: false,
    restaurant: {},
    evalLoad: '',
    switchCon: true,
    commodity: {},
    search: [],
    allList: [],
    num: 0,
    sort: [],
    support: {}
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
    },
    upTopCar (ctx, lock) {
      ctx.commit('upTopCar', lock)
    },
    search (ctx, opction) {
      let address = JSON.parse(localStorage.address)
      axios.get(`/shopping/v2/restaurants/search?extras[]=activities&extras[]=coupon&terminal=h5&is_rewrite=1&search_item_type=3&limit=15&keyword=${opction.search_text}&offset=${opction.offset}&latitude=${address.latitude}&longitude=${address.longitude}${opction.order_by ? '&order_by=' + opction.order_by : ''}`).then((xhr) => {
        ctx.commit('search', {
          data: xhr.data,
          reset: opction.offset === 0
        })
      })
    },
    sortSubmit (ctx, query) {
      let address = JSON.parse(localStorage.address)
      axios.get(`/shopping/v2/restaurants/search?extras[]=activities&extras[]=coupon&terminal=h5&is_rewrite=1&search_item_type=3&limit=15&offset=0&latitude=${address.latitude}&longitude=${address.longitude}${query}`).then((xhr) => {
        ctx.commit('search', {
          data: xhr.data,
          reset: true
        })
      })
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
    },
    upTopCar (state, lock) {
      state.lock = lock
    },
    restaurant (state, restaurant) {
      state.restaurant = restaurant
    },
    evalLoad (state, load) {
      state.evalLoad = load
    },
    switchCon (state, switchCon) {
      state.switchCon = switchCon
    },
    commodity (state, commodity) {
      state.commodity = commodity
    },
    search (state, opction) {
      if (opction.reset) {
        state.search = opction.data
        return
      } else if (opction.data.inside && opction.data.inside['0']) {
        Array.prototype.push.apply(state.search.inside['0'].restaurant_with_foods, opction.data.inside['0'].restaurant_with_foods)
      } else {
        Array.prototype.push.apply(state.search.inside['0'].restaurant_with_foods, [])
      }
      console.log(state.search)
      state.search = JSON.parse(JSON.stringify(state.search))
    },
    allList (state, allList) {
      state.allList = allList
    },
    changeState (state, num) {
      state.num = num
    },
    sort (state, sort) {
      state.sort = sort
    },
    support (state, support) {
      state.support = support
    }
  }
})
