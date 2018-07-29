import Vue from 'vue'
import Router from 'vue-router'
import CityList from 'pages/cityList/cityList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cityList',
      name: 'cityList',
      component: CityList
    }
  ]
})
