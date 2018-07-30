<template>
  <div class="city">
    <city-header :axios="axios"></city-header>
    <div class="siteList" ref="scroll">
      <div>
        <city-search :axios="axios"></city-search>
        <city-site-list></city-site-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import CityHeader from './components/header'
import CitySearch from './components/search'
import CitySiteList from './components/siteList'
export default {
  name: 'city',
  components: {
    CityHeader,
    CitySearch,
    CitySiteList
  },
  created () {
    this.axios = axios
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.scroll, {
      click: true
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'home') {
      let obj = {
        name: to.params.name,
        address: to.params.address
      }
      localStorage.address = JSON.stringify(obj)
      let his = localStorage.his
      his = his ? JSON.parse(his) : []
      his.unshift(obj)
      localStorage.his = JSON.stringify(his)
    }
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .siteList
    background $container
    position absolute
    overflow hidden
    top 1.32rem
    left 0
    right 0
    bottom 0
</style>
