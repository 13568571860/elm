<template>
  <div>
    <div class="top" v-if="btns">
      <el-radio-group
        v-model="defa"
        size="medium"
        @change="handleValue"
      >
        <el-radio-button
          :label="item.name"
          v-for="(item, idx) in btns"
          :key="idx"
        >
          {{item.name}}({{item.amount}})
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="bot">
      <ul v-if="detail.length > 0">
        <li v-for="(item, idx) in detail" :key="idx" class="clearfix">
          <el-col class="user" :span="4">
            <img :src="item.avatar | img_home | img_filter" alt="">
          </el-col>
          <el-col :span="20" class="main">
            <p class="head">
              <span class="userPhone">{{item.username}}</span>
              <span class="date">{{item.rated_at}}</span>
            </p>
            <p class="number clearfix">
              <el-rate
                v-model="item.rating"
                disabled
                text-color="#ff9a0d"
                class="num"
              >
              </el-rate>
              <span>{{item.rating_text}}</span>
            </p>
            <p class="deta_text">
              <span v-for="order_images in item.order_images" :key="order_images.order_id" class="box">
                <img :src="order_images.image_hash | img_home" alt="">
                <span>{{order_images.food_names[0]}}</span>
              </span>
            </p>
          </el-col>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      defa: '全部',
      btns: {},
      detail: []
    }
  },
  computed: {
    evalLoad () {
      return this.$store.state.evalLoad
    },
    offset () {
      return Object.keys(this.detail).length
    }
  },
  watch: {
    evalLoad () {
      if (this.evalLoad === 'jiazai') {
        this.getData(this.offset, this.defa).then(this.getPushDetail)
      }
    }
  },
  methods: {
    initEval (xhr, all) {
      this.btns = all.data
      this.detail = xhr.data
    },
    getData (offset = 0, tag = '全部') {
      return this.axios.get(`/v3/restaurants/${this.$route.params.shopId}/ratings?has_content=true&tag_name=${tag}&offset=${offset}&limit=20`)
    },
    getAll () {
      return this.axios.get(`/dist/restaurant/${this.$route.params.shopId}/rating_categories`)
    },
    getPushDetail (xhr) {
      if (xhr.data.length > 0) {
        Array.prototype.push.apply(this.detail, xhr.data)
        this.detail = JSON.parse(JSON.stringify(this.detail))
        this.$store.commit('evalLoad', '')
      } else {
        this.$store.commit('evalLoad', 'no')
      }
    },
    handleValue (value) {
      this.detail = []
      this.defa = value
      this.$store.commit('evalLoad', 'jiazai')
    }
  },
  created () {
    this.axios.all([this.getData(), this.getAll()]).then(this.axios.spread(this.initEval))
  }
}
</script>

<style lang="stylus" scoped>
  div >>> .top
    .el-radio-button__inner
      color #6d7885
      background-color #ebf5ff
      font-weight 300
    .is-active
      .el-radio-button__inner
        color #ffffff
        background #3190e8
  .top
    padding .31rem
    .el-radio-button
      margin .19rem
  .bot
    ul
      li
        padding .37rem .31rem
        border-top 1px solid #eee
        .user
          img
            width .93rem
            height .93rem
            border-radius 50%
        .main
          .head
            height .4rem
            display flex
            justify-content space-between
            span
              font-size .35rem
              line-height .4rem
            .userPhone
              color #666
            .date
              color #999
          .number
            margin .13rem 0
            height .48rem
            .num
              padding-top .01rem
              float left
            span
              float left
              display inline-block
              width 60%
              font-size .35rem
              line-height .48rem
              margin-left .11rem
              white-space nowrap
              text-overflow ellipsis
              overflow hidden
              float left
          .deta_text
            .box
              width 1.87rem
              display inline-block
              margin-right .27rem
              span
                display block
                border 1px solid #eee
                border-radius .11rem
                font-size .33rem
                line-height .75rem
                padding 0 .12rem
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                margin .19rem 0
                width 90%
</style>
