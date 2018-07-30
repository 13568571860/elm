import Vue from 'vue'
import Router from 'vue-router'
import CityList from 'pages/cityList/cityList'
import City from 'pages/city/city'
import Home from 'pages/home/home'

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
      path: '/home/:name/:address/:latitude/:longitude',
      name: 'home',
      component: Home
    }
  ]
})
