<template>
  <div class="content" ref="contentScroll">
    <div>
      <ul v-if="list">
        <li
          v-for="(item, idx) in lists"
          :key="idx"
          class="clearfix"
        >
          <router-link :to="'/item/' + item.restaurant.id">
            <el-col :span="5">
              <img :src="item.restaurant.image_path | img_home" alt="">
            </el-col>
            <el-col :span="19">
              <h5>{{item.restaurant.name}}</h5>
              <p class="eval">
                <el-rate
                  v-model="item.restaurant.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
                <span class="rade">月售{{item.restaurant.recent_order_num}}</span>
                <span v-if="item.restaurant.delivery_mode">蜂鸟专送</span>
              </p>
              <p class="line">
                <span>￥{{item.restaurant.float_minimum_order_amount}}起送</span>
                <span>| 配送费{{item.restaurant.float_delivery_fee}}</span>
              </p>
              <p class="flavors">
                <span>{{item.restaurant.flavors[0].name}}</span>
              </p>
              <p
                v-for="(activities, idx) in item.restaurant.activities"
                :key="activities.id"
                v-if="idx < 3"
                class="activities"
              >
                <i :style="{backgroundColor: '#' + activities.icon_color}">
                  {{activities.icon_name}}
                </i>
                <span>{{activities.tips}}</span>
              </p>
              <div class="sign">
                <swiper :options="swiperOption">
                  <swiper-slide
                    class="box"
                    v-for="commodity in item.foods"
                    :key="commodity.food_id"
                  >
                    <img :src="commodity.image_path | img_home" alt="">
                    <p>{{commodity.name}}</p>
                    <span>￥{{commodity.price}}</span>
                  </swiper-slide>
                </swiper>
              </div>
            </el-col>
          </router-link>
        </li>
      </ul>
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
export default {
  name: 'lists',
  props: ['list'],
  data () {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: 'auto'
      },
      show: '',
      lists: []
    }
  },
  watch: {
    list () {
      if (this.show === 'jiazai') {
        this.contentScroll.finishPullUp()
      }
      this.show = this.list.length > this.lists.length ? '' : 'no'
      this.lists = JSON.parse(JSON.stringify(this.list))
      this.contentScroll.refresh()
    }
  },
  methods: {
    onScroll () {
      this.contentScroll.on('pullingUp', (x) => {
        this.show = 'jiazai'
        this.contentScroll.refresh()
        setTimeout(() => {
          this.contentScroll.scrollToElement(this.$refs.jiazai)
        }, 10)
        this.$emit('jiazai')
      })
    }
  },
  mounted () {
    this.contentScroll = new this.Bscroll(this.$refs.contentScroll, {
      click: true
    })
    this.contentScroll.openPullUp({
      threshold: -50
    })
    this.onScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .content >>> span
    i
      font-size .28rem
  .content >>> .el-rate__text
    font-size .28rem
    color #666 !important
  .content
    background #f5f5f5
    overflow hidden
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    ul
      li
        padding .4rem .27rem
        background #fff
        border-bottom 1px solid #ccc
        h5
          font-size .4rem
          line-height .56rem
          font-weight 400
          margin 0
        .eval
          font-size .29rem
          line-height .6rem
          color #666
          .el-rate
            display inline-block
        .line
          font-size .29rem
          line-height .6rem
        .flavors
          line-height .37rem
          margin .14rem 0
          border-bottom 1px solid #ccc
          padding-bottom .13rem
          margin-bottom .24rem
          span
            font-size .32rem
            border 1px solid #eee
            border-radius .05rem
            color #999
        .activities
          font-size .24rem
          line-height .37rem
          margin .11rem 0
          i
            margin-right .11rem
            padding .02rem
            padding-left .03rem
            border-radius .05rem
            color #fff
            text-align center
        .sign
          .box
            width 1.87rem !important
            display inline-block
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            margin 0 .11rem
            p
              color #999;
              font-size .32rem;
              line-height .38rem
              margin-top .11rem
              overflow hidden
              white-space nowrap
              text-overflow ellipsis
            span
              font-size .4rem
              line-height .57rem
              color #ff5339
              display block
    .notMore
        text-align center
        font-weight 400
</style>
