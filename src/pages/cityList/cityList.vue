<template>
  <div class="home">
    <city-header :opction="headerOpc"></city-header>
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
import CityHeader from '@/components/header'
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
  data () {
    return {
      headerOpc: {
        left: {
          text: '饿了么',
          handleClick: () => {
            this.$router.push('/')
          },
          css: {
            'font-size': '.4rem'
          }
        },
        right: {
          text: '',
          handleClick: () => {
            this.$router.push('/login')
          },
          css: {
            'font-size': '.4rem',
            'font-weight': '200'
          }
        }
      }
    }
  },
  created () {
    this.headerOpc.right.text = localStorage.usemd5_id ? JSON.parse(localStorage.usemd5_id).username : '登录 | 注册'
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
