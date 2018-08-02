<template>
  <div class="car">
    <el-col :span="6" class="icon_car">
      <p>
        <span
          class="iconfont icon-gouwucheman"
          :class="{icon_color: icon_color}"
          @click="click(icon_color)"
        >
          <i v-show="totleNum">{{totleNum}}</i>
        </span>
      </p>
    </el-col>
    <el-col :span="10" class="price_car">
      <el-row class="price">￥ {{totle.toFixed(2)}}</el-row>
      <el-row class="distribution">{{distribution}}</el-row>
    </el-col>
    <el-col :span="8" class="spread" :class="{res: spread == '去结算'}">{{spread}}</el-col>
  </div>
</template>

<script>
export default {
  name: 'car',
  data () {
    return {
      icon_color: false,
      totle: 0,
      spread: '还差20元起送',
      totleNum: 0
    }
  },
  computed: {
    restaurant () {
      return this.$store.state.restaurant
    },
    distribution () {
      return this.restaurant.piecewise_agent_fee && this.restaurant.piecewise_agent_fee.description
    },
    resu () {
      return this.restaurant && this.restaurant.float_minimum_order_amount
    },
    buyCar () {
      return this.$store.state.buyCar
    }
  },
  methods: {
    initBuyCar (buyCar) {
      let resu = this.resu
      this.icon_color = false
      this.totle = 0
      this.totleNum = 0
      for (let key in buyCar) {
        this.icon_color = true
        this.totle += buyCar[key].price * buyCar[key].quantity
        this.totleNum += buyCar[key].quantity
        resu -= buyCar[key].price * buyCar[key].quantity
      }
      if (resu > 0) {
        this.spread = `还差${resu}元起送`
      } else if (this.totleNum > 0 && resu <= 0) {
        this.spread = '去结算'
      } else {
        this.spread = `还差0元起送`
      }
    },
    click (lock) {
      if (lock) {
        this.$store.dispatch('upTopCar', !this.$store.state.lock)
      }
    }
  },
  watch: {
    buyCar () {
      this.initBuyCar(this.buyCar)
    },
    restaurant () {
      this.initBuyCar(this.buyCar)
    }
  },
  created () {
    let buyCar = this.$store.state.buyCar
    this.initBuyCar(buyCar)
  }
}
</script>

<style lang="stylus" scoped>
  .car
    position fixed
    bottom 0
    left 0
    height 1.27rem
    background-color #3d3d3f
    width 100%
    z-index 1000
    .icon_car
      text-align center
      p
        display inline-block
        width 1.27rem
        height 1.27rem
        border-radius 50%
        border .11rem solid #444
        transform translate(0, -30%)
        background-color #3d3d3f
        .iconfont
          font-size .8rem
          line-height 1.27rem
          color #fff
          display inline-block
          position relative
          i
            background-color #ff461d
            position absolute
            top -0.2rem
            right -0.2rem
            border-radius 50%
            display inline-block
            font-size .32rem
            line-height .44rem
            font-weight 400
            width .44rem
            height .44rem
        .icon_color
          background-color #3190e8
          width .93rem
          height .93rem
          border-radius 50%
    .price_car
      color #fff
      padding-top .13rem
      .price
        font-size .49rem
        line-height .69rem
        font-weight 400
      .distribution
        font-size .32rem
        line-height .45rem
    .spread
      height 100%
      background #535356
      font-size .44rem
      line-height 1.27rem
      font-weight 400
      color #ffffff
      text-align center
    .res
      background-color #4cd964
</style>
