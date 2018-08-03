<template>
  <div class="home">
    <home-header class="header"></home-header>
    <div class="content" ref="scroll">
      <div>
        <home-nav></home-nav>
        <home-nearby ref="nearby" @jiazaiLoad="load"></home-nearby>
        <div
          class="iconfont icon-jiazai"
          v-if="show === 'jiazai'"
          ref="jiazai"
        >
        </div>
        <div v-else-if="show === 'no'" class="notMore">没有更多了</div>
      </div>
    </div>
    <home-footer class="footer"></home-footer>
  </div>
</template>

<script>
import HomeHeader from './components/header'
import HomeNav from './components/nav'
import HomeNearby from './components/nearby'
import HomeFooter from '@/components/footer'
export default {
  name: 'home',
  data () {
    return {
      show: ''
    }
  },
  components: {
    HomeHeader,
    HomeNav,
    HomeNearby,
    HomeFooter
  },
  methods: {
    load (isLoad) {
      if (isLoad) {
        this.scroll.refresh()
        this.scroll.finishPullUp()
        this.show = ''
      } else {
        this.show = 'no'
      }
    }
  },
  mounted () {
    this.scroll = new this.Bscroll(this.$refs.scroll, {
      click: true
    })
    this.scroll.openPullUp({
      threshold: 200
    })
    this.scroll.on('pullingUp', (x) => {
      this.show = 'jiazai'
      this.scroll.refresh()
      setTimeout(() => {
        this.scroll.scrollToElement(this.$refs.jiazai)
      }, 10)
      this.$refs.nearby.$emit('jiazai')
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  @keyframes jiazai {
    0% {
      transform rotate(0)
    }
    100% {
      transform rotate(360deg)
    }
  }
  .home
    display flex
    height 100%
    flex-direction column
    justify-content space-between
    .content
      flex 1
      background-color $container
      overflow hidden
      position absolute
      top 1.29rem
      bottom 1.21rem
      left 0
      right 0
      .icon-jiazai
        text-align center
        font-size .8rem
        color #999
        animation jiazai 1s linear infinite
      .notMore
        text-align center
        font-weight 400
</style>
