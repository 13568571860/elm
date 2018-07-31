<template>
  <div class="home">
    <city-header></city-header>
    <div class="content" ref="scroll">
      <div>
        <city-city></city-city>
        <hot-city></hot-city>
        <all-city></all-city>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import CityHeader from './components/header'
import CityCity from './components/city'
import HotCity from './components/hotCity'
import AllCity from './components/allCity'
export default {
  name: 'home',
  components: {
    CityHeader,
    CityCity,
    HotCity,
    AllCity
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
      position  absolute
      top 1.08rem
      bottom 0
      left 0
      right 0
</style>
