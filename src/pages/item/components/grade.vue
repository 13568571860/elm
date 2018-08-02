<template>
  <div class="grade clearfix">
    <el-col :span="12" class="left">
      <p class="tag">{{restaurant.rating}}</p>
      <p class="all">综合评价</p>
      <p class="top">高于周边商家76.9%</p>
    </el-col>
    <el-col class="right" :span="12">
      <p class="clearfix">
        <el-col :span="10" class="marleft">服务态度</el-col>
        <el-rate
          v-model="restaurant.rating"
          :span="12"
          disabled
          show-score
          text-color="#f50"
          class="num"
        >
        </el-rate>
      </p>
      <p class="clearfix">
        <el-col class="marleft" :span="10">菜品评价</el-col>
        <el-rate
          v-model="restaurant.rating"
          :span="12"
          disabled
          show-score
          text-color="#f50"
          class="num"
        >
        </el-rate>
      </p>
      <p class="clearfix">
        <el-col :span="10" class="marleft">送达时间</el-col>
        <el-col :span="12" class="time">{{restaurant.order_lead_time}}分钟</el-col>
      </p>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'grade',
  computed: {
    restaurant () {
      return this.$store.state.restaurant
    }
  }
}
</script>

<style lang="stylus" scoped>
  .num >>> span
    font-size .33rem
    i
      font-size .33rem
  .grade
    padding .59rem .31rem .49rem
    .left
      text-align center
      .tag
        font-size .75rem
        line-height .75rem
        font-weight 400
        color #f60
      .all
        font-size .4rem
        line-height .56rem
        margin .17rem 0
      .top
        font-size .32rem
        line-height .45rem
        color #999
    .right
      p
        height 100%
        .el-col
          font-size .4rem
          line-height .61rem
          color #666
          margin .06rem 0
        .marleft
          margin-right .15rem
        .time
          font-size .32rem
          color #999
        .num
          float left
          padding-top .08rem
</style>
