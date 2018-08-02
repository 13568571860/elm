<template>
  <el-row>
    <el-col :span="12">
      <span :class="{active: switchCon}" @click="handleclick1">商品</span>
    </el-col>
    <el-col :span="12">
      <span :class="{active: !switchCon}" @click="handleclick2">评价</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'itemNav',
  computed: {
    switchCon () {
      return this.$store.state.switchCon
    }
  },
  methods: {
    handleclick1 () {
      this.$store.commit('switchCon', true)
    },
    handleclick2 () {
      this.$store.commit('switchCon', false)
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
