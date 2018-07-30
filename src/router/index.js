import Vue from 'vue'
import Router from 'vue-router'
import CityList from 'pages/cityList/cityList'
import City from 'pages/city/city'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cityList',
      name: 'cityList',
      component: CityList
    },
    {
      path: '/city/:id',
      name: 'city',
      component: City
    },
    {
      path: '/home/:name/:address',
      name: 'home'
      // component: Home
    }
  ]
})
