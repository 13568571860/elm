import Vue from 'vue'
import Router from 'vue-router'
import CityList from 'pages/cityList/cityList'
import City from 'pages/city/city'
import Home from 'pages/home/home'
import Login from 'pages/login/login'
import Item from 'pages/item/item'
import Search from 'pages/search/search'

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
      path: '/',
      alias: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/item/:shopId',
      name: 'item',
      component: Item
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
