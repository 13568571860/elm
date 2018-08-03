<template>
  <transition>
    <div class="commodity" v-show="show">
      <commodity-header :opction="opction"></commodity-header>
      <div class="main">
        <div class="img">
          <img :src="commodity.image_path | img_strong" alt="">
        </div>
        <p class="introduce">{{commodity.description}}</p>
        <p class="title">{{commodity.name}}</p>
        <p class="score clearfix">
          <span>评分</span>
          <el-rate
            v-model="commodity.rating"
            disabled
            show-score
            text-color="#ff9a0d"
            score-template="{value}">
          </el-rate>
        </p>
        <p class="shop">
          <span class="left">月售{{commodity.month_sales}}单</span>
          <span class="right">售价￥{{commodity.specfoods && commodity.specfoods[0].price}}
            <i v-if="commodity.specfoods && commodity.specfoods.length > 1">起</i>
          </span>
        </p>
        <p class="bot">
          <span>评论数{{commodity.satisfy_count}}</span>
          <span>好评率{{commodity.satisfy_rate}}%</span>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import CommodityHeader from '@/components/header'
export default {
  name: 'commodityDetails',
  components: {
    CommodityHeader
  },
  data () {
    return {
      opction: {
        left: {
          icon: 'icon-jiantou4',
          handleClick: () => {
            this.show = false
          }
        },
        center: {
          text: this.commodity ? this.commodity.name : '数据获取中'
        }
      },
      show: false
    }
  },
  computed: {
    commodity () {
      return this.$store.state.commodity
    }
  },
  watch: {
    commodity () {
      if (this.commodity.specfoods) {
        this.opction.center.text = this.commodity.name
        this.show = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .score >>> span
    font-size .33rem
    i
      font-size .33rem
  .v-enter-active, .v-leave-active
    transform translate(0, 0)
    transition all .5s
  .v-enter, .v-leave-to
    transform translate(100%, 0)
    opacity 0
  .commodity
    z-index 998
    position absolute
    overflow hidden
    background #fff
    top 0
    left 0
    right 0
    bottom 1.27rem
    .main
      p
        margin .21rem 0
        padding-left .4rem
      .img
        height 0
        padding-bottom 10rem
        width 10rem
        img
          margin 0 auto
          width 100%
      .introduce
        font-size .37rem
        line-height .49rem
        color #666
      .title
        font-size .44rem
        line-height .61rem
        font-weight 400
      .score
        span,
        div
          float left
        span
          font-size .37rem
          line-height .53rem
          margin-right .12rem
          color #666
      .shop
        font-size .37rem
        line-height .43rem
        .left
          margin-right .19rem
        .right
          color #f60
      .bot
        font-size .37rem
        line-height .43rem
        span
          margin-right .19rem
</style>
