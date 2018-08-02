<template>
  <div class="nearby">
    <p class="title">
      <i class="iconfont icon-shangjia"></i>
      <span>附近商家</span>
    </p>
    <ul v-if="shopping.length">
      <el-row tag="li" v-for="item in shopping" :key="item.id + Math.random()">
        <router-link :to="'/item/' + item.id">
          <el-col :span="5" class="img">
            <img :src="item.image_path | img_home">
          </el-col>
          <el-col :span="19" class="main">
            <el-row class="top">
              <el-col class="title" :span="16">
                <i>品牌</i>
                <span>{{item.name}}</span>
              </el-col>
              <el-col :span="8" class="serve">
                <span v-for="supports in item.supports" :key="supports._id">{{supports.icon_name}}</span>
              </el-col>
            </el-row>
            <el-row class="cen">
              <el-col class="salesVolume clearfix" :span="18">
                <el-rate
                  v-model="item.rating"
                  disabled
                  show-score
                  :span="10"
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
                <el-col class="num" :span="14">月售{{item.recent_order_num}}单</el-col>
              </el-col>
              <el-col :span="6">
                <span
                  v-if="item.delivery_mode"
                  class="feng"
                  :style="{
                    backgroundColor: '#' + item.delivery_mode.color,
                    color: '#fff'
                  }"
                >
                  {{item.delivery_mode.text}}
                </span>
                <span class="zs">准时送</span>
              </el-col>
            </el-row>
            <el-row class="bot">
              <el-col :span="12">￥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}</el-col>
              <el-col :span="12" class="time">{{item.distance}}米 /
                <span> {{item.order_lead_time}}分钟</span>
              </el-col>
            </el-row>
          </el-col>
        </router-link>
      </el-row>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nearby',
  data () {
    return {
      page: 0,
      shopping: [],
      initAddress: JSON.parse(localStorage.address)
    }
  },
  methods: {
    getShopping (xhr) {
      this.shopping = xhr.data
      this.page = Math.ceil(this.shopping.length / 20)
    },
    getProduct (callback) {
      this.axios.get(`/shopping/restaurants?extras[]=activities&geohash=ws10hpfzgd65&latitude=${this.address.latitude}&longitude=${this.address.longitude}&offset=${this.page * 20}&limit=20&terminal=web`).then(callback)
    },
    handleJiazai () {
      this.getProduct(this.pushProduct)
    },
    pushProduct (xhr) {
      if (xhr.data.length > 0) {
        Array.prototype.push.apply(this.shopping, xhr.data)
        this.shopping = this.shopping.slice(0)
        this.page = Math.ceil(this.shopping.length / 20)
        this.$emit('jiazaiLoad', true)
      } else {
        this.$emit('jiazaiLoad', false)
      }
    }
  },
  computed: {
    address () {
      return this.$store.state.address
    }
  },
  watch: {
    address () {
      this.getProduct()
    }
  },
  created () {
    this.$on('jiazai', () => {
      this.handleJiazai()
    })
    this.axios.get(`/shopping/restaurants?extras[]=activities&geohash=ws10hpfzgd65&latitude=${this.initAddress.latitude}&longitude=${this.initAddress.longitude}&offset=${this.page * 20}&limit=20&terminal=web`).then(this.getShopping)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .nearby >>> .cen
    .el-rate
      float left
      margin-right .19rem
    .el-rate__icon
      font-size .27rem
    .el-rate__text
      font-size .27rem
  .nearby
    background-color $fff
    .title
      padding-left $pad
      line-height 1.04rem
      .iconfont
        font-size .37rem
        padding-right .13rem
    ul
      li
        padding .44rem .25rem
        height 2.85rem
        border-bottom $bottom
        .img
          padding 0 .25rem .25rem 0
          height 100%
          div
            width 100%
            height 100%
            background-position center
            background-size cover
        .main
          display flex
          flex-direction column
          height 100%
          .el-row
            flex 1
            margin-top .32rem
          .el-row:first-child
            margin 0
          .top
            height .48rem
            .title
              color #000
              font-weight 400
              line-height .43rem
              nowrap()
              i
                display inline-block
                font-size .37rem
                line-height .4rem
                padding 0 .13rem
                border-radius .07rem
                background-color #ffd930
                margin-right .13rem
              span
                font-size .43rem
                line-height .43rem
            .serve
              text-align right
              line-height .43rem
              span
                font-size .27rem
                line-height .32rem
                margin 0 .07rem
                padding 0 .03rem
                color #999
                border $bottom
                border-radius .07rem
                vertical-align middle
          .cen
            .el-col
              line-height .37rem
              .num
                font-size .27rem
                float left
              .feng
                font-size .24rem
                ling-height .36rem
                margin-right .11rem
              .zs
                font-size .24rem
                line-height .36rem
                color $bgColor
                border 1px solid $bgColor
                border-radius .07rem
          .bot
            .el-col
              font-size .27rem
              line-height .37rem
            .time
              text-align right
              span
                color $bgColor
</style>
