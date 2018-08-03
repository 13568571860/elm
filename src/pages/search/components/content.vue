<template>
  <div class="content" ref="contentScroll">
    <div>
      <ul v-if="search.inside && search.inside['0']">
        <li
          v-for="(item, idx) in search.inside['0'].restaurant_with_foods"
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
                <i
                  :style="{backgroundColor: '#' + activities.icon_color}"
                >
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
  name: 'searchContent',
  data () {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: 'auto'
      },
      show: ''
    }
  },
  computed: {
    search () {
      return this.$store.state.search
    }
  },
  watch: {
    search () {
      if (!this.contentScroll) {
        this.contentScroll = new this.Bscroll(this.$refs.contentScroll, {
          click: true
        })
        this.contentScroll.openPullUp({
          threshold: 200
        })
        this.contentScroll.on('pullingUp', (x) => {
          this.show = 'jiazai'
          this.contentScroll.refresh()
          setTimeout(() => {
            this.contentScroll.scrollToElement(this.$refs.jiazai)
          }, 10)
          this.jiazai()
        })
      } else {
        window.setTimeout(() => {
          this.contentScroll.finishPullUp()
          this.contentScroll.refresh()
          this.show = ''
        }, 10)
      }
    }
  },
  methods: {
    jiazai () {
      this.$store.dispatch('search', {
        'search_text': this.search.inside['0'].highlights[0],
        offset: this.search.inside['0'].restaurant_with_foods.length
      })
    }
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
</style>
