<template>
  <div class="main" ref="scroll">
    <div>
      <ul v-for="list in soper" :key="list.id" v-if="soper" ref="ul" >
        <h5>
          <strong>{{list.name}}</strong>
          <span>{{list.description}}</span>
        </h5>
        <el-row
          tag="li"
          v-for="item in list.foods"
          :key="item._id"
          @click.native="handlePushCar(item, $event)"
        >
          <el-col class="img" :span="5">
            <img src="http://fuss10.elemecdn.com/4/6f/c302c0c8ee37a4de58ef6393e5c7ajpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
          </el-col>
          <el-col class="itemMain" :span="19">
            <p class="title">{{item.name}}</p>
            <p class="alias">{{item.description}}</p>
            <p class="month_sales">月售{{item.month_sales}}份 好评率{{item.satisfy_rate}}%</p>
            <p class="activity" v-if="item.activity">
              <span>{{item.activity.image_text}}</span>
            </p>
            <el-row class="price">
              <el-col class="ict" v-if="item.specfoods" :span="15">
                <i class="ic">￥</i>
                <span class="num">{{item.specfoods[0].price}}</span>
                <i class="gui" v-if="item.specfoods.length > 1">起</i>
              </el-col>
              <el-col
                tag="span"
                class="iconfont icon-jianshao"
                :class="[item.specfoods.length == 1 ? 'nopay' : 'nopays', isMultiple(item.specfoods)]"
                :span="3"
                v-if="totalRes(item.specfoods)"
              >
              </el-col>
              <el-col
                :span="3"
                class="num"
                v-if="totalRes(item.specfoods)"
              >
                {{totalRes(item.specfoods)}}
              </el-col>
              <el-col tag="span" class="iconfont icon-jia" :class="[item.specfoods.length == 1 ? 'pay' : 'pays']" :span="3"></el-col>
            </el-row>
          </el-col>
          <span
            :class="'i' + attributes.icon_color"
            v-for="(attributes, idx) in item.attributes"
            :key="idx"
          >
            {{attributes.icon_name}}
          </span>
        </el-row>
      </ul>
      <transition name="el-fade-in-linear">
        <p class="mulCar" :style="{'margin-top': marTop + 'px'}" v-if="isShownulCar">多规格商品请到购物车删除</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'soperMain',
  props: ['soper'],
  data () {
    return {
      offsetTop: [],
      follr: 0,
      dialogFormVisible: false,
      food: '',
      foodPrice: 0,
      foods_id: 0,
      total: 0,
      isShownulCar: false,
      marTop: 0
    }
  },
  computed: {
    floors () {
      return this.$store.state.floors
    },
    buyCars () {
      return this.$store.state.buyCar
    }
  },
  watch: {
    floors () {
      this.scroll.scrollTo(0, this.offsetTop[this.floors], 500)
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
    },
    toActive () {
      this.$store.dispatch('changeActiveSidebar', this.floor)
    },
    initOffsetTop () {
      this.offsetTop = []
      this.$refs.ul.forEach(item => {
        this.offsetTop.push(-item.offsetTop)
      })
    },
    handlePushCar (item, e) {
      switch (true) {
        case e.target.classList.contains('pays'):
          this.handlePays(item)
          break
        case e.target.classList.contains('pay'):
          this.handlePay(item)
          break
        case e.target.classList.contains('nopay'):
          this.handleNoPays(item)
          break
        case e.target.classList.contains('multiple'):
          this.multiple(item, e)
          break
        case e.target.classList.contains('nopays'):
          this.handleNoPays(item)
          break
      }
    },
    multiple (item) {
      this.marTop = -this.scroll.y
      this.isShownulCar = true
      window.setTimeout(() => {
        this.isShownulCar = false
      }, 2000)
    },
    handleNoPays (item) {
      if (this.buyCar[item.specfoods[0].food_id] && this.buyCar[item.specfoods[0].food_id].quantity > 1) {
        this.buyCar[item.specfoods[0].food_id].quantity--
      } else {
        delete this.buyCar[item.specfoods[0].food_id]
      }
      this.toLocal()
    },
    handlePays (item) {
      item = Object.assign({}, item)
      this.$store.dispatch('showSpecs', item)
    },
    handlePay (item) {
      this.buyCar = this.buyCars
      let nameId = this.$route.params.shopId
      if (this.buyCar && this.buyCar[item.specfoods[0].food_id]) {
        this.buyCar[item.specfoods[0].food_id].quantity++
      } else if (this.buyCar) {
        let fram = this.setFram(item)
        this.$set(this.buyCar, item.specfoods[0].food_id, fram)
      } else {
        let fram = this.setFram(item)
        this.$set(this.buyCar, nameId, {})
        this.$set(this.buyCar, item.specfoods[0].food_id, fram)
      }
      this.toLocal()
    },
    toLocal () {
      let obj = localStorage.buyCar ? JSON.parse(localStorage.buyCar) : {}
      this.buyCar = Object.assign({}, this.buyCar)
      obj[this.$route.params.shopId] = this.buyCar
      localStorage.buyCar = JSON.stringify(obj)
      this.$store.dispatch('changeCar', this.buyCar)
    },
    setFram (item) {
      return {
        attrs: [],
        extra: {},
        id: item.specfoods[0].food_id,
        name: item.specfoods[0].name,
        packing_fee: item.specfoods[0].packing_fee,
        price: item.specfoods[0].price,
        quantity: 1,
        sku_id: item.specfoods[0].sku_id,
        stock: item.specfoods[0].stock,
        specs: [item.specfoods[0].specs_name]
      }
    },
    totalRes (item) {
      let totle = 0
      item.forEach(it => {
        if (this.buyCars && this.buyCars[it.food_id]) {
          totle += this.buyCars[it.food_id].quantity
        }
      })
      return totle
    },
    isMultiple (item) {
      let num = 0
      item.forEach(it => {
        num += this.buyCars[it.food_id] ? 1 : 0
      })
      return num > 1 ? 'multiple' : ''
    }
  },
  created () {
    let buyCar = localStorage.buyCar ? JSON.parse(localStorage.buyCar) : {}
    this.buyCar = buyCar[this.$route.params.shopId] ? buyCar[this.$route.params.shopId] : {}
    this.$store.dispatch('changeCar', this.buyCar)
  },
  mounted () {
    this.scroll = new this.Bscroll(this.$refs.scroll, {
      click: true,
      probeType: 2
    })
    if (this.$refs.ul) {
      this.initOffsetTop()
    }
    this.watchScroll()
  },
  updated () {
    this.initOffsetTop()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .main
    overflow hidden
    position absolute
    top 0
    left 2.37rem
    right 0
    bottom 0
    h5
      background-color #f5f5f5
      padding-left $pad
      margin 0
      strong
        font-size .44rem
        line-height 1.37rem
        margin-right .13rem
      span
        font-size .32rem
        color #999
        font-weight 200
    li
      border-bottom $bottom
      padding .37rem .24rem
      position relative
      overflow hidden
      .img
        img
          width 1.25rem
          height 1.25rem
          border $bottom
      .itemMain
        .title
          font-size .44rem
          line-height .61rem
          margin-bottom .12rem
        .alias
          font-size .32rem
          line-height .37rem
          color #999
        .month_sales
          font-size .32rem
          line-height .49rem
        .activity
          line-height .25rem
          margin .13rem 0
          span
            font-size .23rem
            color rgb(241, 136, 79)
            border 1px solid rgb(240, 115, 115)
            border-radius .09rem
            padding .03rem
            padding-bottom .012rem
        .price
          line-height .36rem
          .ict
            font-size .36rem
            color #ff6600
            .ic
              font-size .26rem
            .num
              font-weight 700
            .gui
              color #666
        .pay:before,
        .pays:before,
        .nopay:before,
        .nopays:before
          font-size .35rem
          text-align center
          color $fff
          background $bgColor
          line-height .48rem
          border-radius 50%
          display inline-block
          padding .03rem .1rem
        .pay,
        .pays
          text-align right
          z-index 1000
          text-align right
          position absolute
          right 0
          top 2px
        .nopay:before,
        .nopays:before
          color $bgColor
          background-color #fff
          border 1px solid $bgColor
          border-radius 50%
        .num
          text-align center
          font-weight 400
          line-height .56rem
          color #f50
        .multiple:before
          color #cccccc
          border-color #ccc
      .if07373
        color #f07373
        position absolute
        right .27rem
        top .4rem
        border 1px solid #f07373
        padding 0.04rem .11rem 0
        border-radius .07rem
        font-size .19rem
        line-height .22rem
      .i5ec452
        color $fff
        background #5ec452
        position absolute
        font-weight 400
        top -0.33rem
        left -0.67rem
        font-size .32rem
        line-height .34rem
        padding .53rem .67rem .1rem
        transform rotate(-45deg)
    .mulCar
        position fixed
        top 5rem
        left .8rem
        color #ffffff
        background-color rgba(0, 0, 0, .6)
        font-size .52rem
        font-weight 400
        line-height .82rem
        padding .13rem
        border-radius .21rem
</style>
