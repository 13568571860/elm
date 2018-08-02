<template>
  <div class="carItem">
    <transition @enter="enter" @leave="leave">
      <div
        v-show="upTop"
        class="box"
        ref="divBox"
      >
        <div class="head">
          <span>购物车</span>
          <span class="iconfont icon-shanchu" @click="toLocal({})">清空</span>
        </div>
        <div class="content">
          <ul>
            <li v-for="item in buyCar" :key="item.food_id" v-if="buyCar && item">
              <div class="title">
                {{item.name}}
                <span>({{item.specs[0]}})</span>
              </div>
              <div class="right">
                <p class="price">
                  <span class="priceTop">￥</span>
                  <span class="priceMain">{{item.price}}</span>
                </p>
                <span
                  class="iconfont icon-jianshao nopay"
                  @click="delPay(item.id)"
                >
                </span>
                <span
                  class="num"
                >
                  {{item.quantity}}
                </span>
                <span
                  class="iconfont icon-jia pay"
                  @click="pushPay(item.id)"
                >
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'carItem',
  computed: {
    buyCar () {
      return this.$store.state.buyCar
    },
    upTop () {
      return this.$store.state.lock
    }
  },
  methods: {
    delPay (food) {
      let buyCar = Object.assign({}, this.buyCar)
      if (buyCar[food].quantity > 1) {
        buyCar[food].quantity--
      } else {
        delete buyCar[food]
        let len = Object.keys(buyCar).length - 1
        this.$refs.divBox.style.transform = `translate(0, -${2.53 + len * 1.36}rem)`
      }
      this.toLocal(buyCar)
    },
    pushPay (food) {
      let buyCar = Object.assign({}, this.buyCar)
      buyCar[food].quantity++
      this.toLocal(buyCar)
    },
    toLocal (buyCar) {
      let obj = localStorage.buyCar ? JSON.parse(localStorage.buyCar) : {}
      buyCar = Object.assign({}, buyCar)
      obj[this.$route.params.shopId] = buyCar
      localStorage.buyCar = JSON.stringify(obj)
      this.$store.dispatch('changeCar', buyCar)
    },
    enter (el, done) {
      let len = Object.keys(this.buyCar).length - 1
      window.setTimeout(() => {
        el.style.transform = `translate(0, -${2.53 + len * 1.36}rem)`
        done()
      }, 0)
    },
    leave (el) {
      el.style.transform = `translate(0, 0rem)`
    }
  },
  watch: {
    buyCar () {
      let len = Object.keys(this.buyCar).length
      if (len < 1) {
        this.$store.dispatch('upTopCar', false)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .carItem
    position fixed
    top 93%
    width 100%
    background-color #fff
    z-index 900
    .box
      transition: all .5s
      .head
        display flex
        padding .29rem .37rem
        background-color #eceff1
        span
          flex 1
          font-size .43rem
          line-height .61rem
          padding 0 .27rem
          color #333
        .iconfont
          text-align right
          font-size .35rem
        .iconfont:before
          padding-right .13rem
          color #999
      .content
        background #fff
        li
          padding .37rem .31rem
          display flex
          height 1.36rem
          .title
            font-size .44rem
            line-height .61rem
            color #666
            font-weight 500
            flex 2
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            span
              font-size .32rem
              color #999
          .right
            flex 2
            display flex
            .price
              flex 4
              color #f60
              text-align right
              line-height .61rem
              padding-right .54rem
              .priceTop
                font-size .37rem
              .priceMain
                font-weight 400
                font-size .44rem
            .pay,
            .nopay
              text-align center
              font-size 0px
              flex 1
            .pay:before,
            .nopay:before
              font-size .35rem
              text-align center
              color #fff
              background-color #3190e8
              line-height .51rem
              border-radius 50%
              display block
              padding .03rem 0
              width .59rem
              margin 0  auto
            .nopay:before
              color #3190e8
              border 1px solid #3190e8
              background-color #fff
            .num
              flex 1
              text-align center
              line-height .61rem
</style>
