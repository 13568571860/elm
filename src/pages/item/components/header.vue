<template>
  <div class="header" :style="{'background-image': `url(https://elm.cangdu.org/img/${item.image_path})`}">
    <div class="clearfix">
      <el-col :span="6" class="top">
        <img :src="item.image_path | img_filter" alt="" ref="img">
      </el-col>
      <el-col :span="17" class="bot" v-if="item">
        <h4>{{item.name}}</h4>
        <p>{{item.delivery_mode && item.delivery_mode.text || '商家配送'}} / 分钟送达 / {{item.piecewise_agent_fee && item.piecewise_agent_fee.tips}}</p>
        <p>{{item.promotion_info}}</p>
      </el-col>
      <el-col class="iconfont icon-jiantou" :span="1"></el-col>
    </div>
    <div class="iconfont icon-jiantou4 back" @click="handleClick"></div>
  </div>
</template>

<script>
export default {
  name: 'itemHeader',
  props: {
    item: Object
  },
  methods: {
    handleClick () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .header
    background-size 30rem 10rem
    background-color #f5f5f5
    position relative
    .clearfix
      background rgba(0, 0, 0, .2)
      padding .25rem .25rem 0
      .top
        img
          width 1.81rem
          margin-right .14rem
      .bot
        p,
        h4
          color $fff
          margin-bottom .20rem
          nowrap()
        h4
          font-size .49rem
          line-height .69rem
        p
          font-size .29rem
          line-height .45rem
      .iconfont
        color $fff
        font-size .4rem
        line-height 1.8rem
    .back
      position absolute
      font-size .59rem
      top 0
      left 0
      color $fff
</style>
