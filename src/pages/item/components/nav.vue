<template>
  <el-row>
    <el-col :span="12">
      <span :class="{active: isActive}" @click="handleclick1">商品</span>
    </el-col>
    <el-col :span="12">
      <span :class="{active: !isActive}" @click="handleclick2">评价</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'itemNav',
  data () {
    return {
      isActive: true
    }
  },
  methods: {
    handleclick1 () {
      this.isActive = true
    },
    handleclick2 () {
      this.isActive = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~css/common.styl'
  .el-row
    border-bottom $bottom
    .el-col
      font-size .41rem
      line-height .45rem
      padding .51rem 0 .37rem
      text-align center
      span
        padding .12rem .07rem
      .active
        color $color
        border-bottom 4px solid $color
</style>
