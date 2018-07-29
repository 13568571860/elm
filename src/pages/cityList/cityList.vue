<template>
  <div class="home">
    <home-header></home-header>
    <div class="content" ref="scroll">
      <div>
        <home-city :axios="axios"></home-city>
        <hot-city :axios="axios"></hot-city>
        <all-city :axios="axios"></all-city>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import HomeHeader from './components/header'
import HomeCity from './components/city'
import HotCity from './components/hotCity'
import AllCity from './components/allCity'
export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeCity,
    HotCity,
    AllCity
  },
  created () {
    this.axios = axios
  },
  mounted () {
    this.scroll = new Bscroll(this.$refs.scroll, {
      click: true
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .home
    background $container
    .content
      overflow hidden
      top 1.08rem
      bottom 0
      left 0
      right 0
</style>
