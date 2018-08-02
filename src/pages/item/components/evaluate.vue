<template>
  <div class="content" ref="box">
    <div>
      <eval-grade></eval-grade>
      <div class="mar"></div>
      <eval-detail ref="jiazai"></eval-detail>
      <div
        class="iconfont icon-jiazai"
        v-if="show === 'jiazai'"
        ref="jiazai"
      >
      </div>
      <div v-else-if="show === 'no'" class="notMore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import EvalGrade from './grade'
import EvalDetail from './detail'
export default {
  name: 'evaluate',
  components: {
    EvalGrade,
    EvalDetail
  },
  computed: {
    show () {
      return this.$store.state.evalLoad
    }
  },
  watch: {
    show () {
      this.scroll.refresh()
      this.scroll.finishPullUp()
    }
  },
  methods: {
    watchScroll () {
      this.scroll.on('scroll', scroll => {
        this.offsetTop.some((item, idx) => {
          if (scroll.y > item) {
            if (this.floor !== idx - 1) {
              this.floor = idx - 1
              this.toActive()
            }
            return true
          }
        })
      })
    }
  },
  mounted () {
    this.scroll = new this.Bscroll(this.$refs.box, {
      click: true
    })
    this.scroll.openPullUp({
      threshold: 200
    })
    this.scroll.on('pullingUp', x => {
      this.scroll.refresh()
      setTimeout(() => {
        this.scroll.scrollToElement(this.$refs.jiazai)
      }, 10)
      this.$store.commit('evalLoad', 'jiazai')
    })
  }
}
</script>

<style lang="stylus" scoped>
  .content
    position absolute
    overflow hidden
    top 0
    left 0
    right 0
    bottom 0
    .mar
      height .49rem
      background #f5f5f5
    .notMore
      border-top 1px solid #ccc
      text-align center
      font-weight 400
</style>
